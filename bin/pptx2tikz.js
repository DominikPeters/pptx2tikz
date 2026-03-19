#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, mkdtempSync, rmSync, copyFileSync } from 'fs'
import { dirname, resolve, join, basename } from 'path'
import { tmpdir } from 'os'
import { execSync } from 'child_process'
import JSZip from 'jszip'
import { installNodeSvgEnvironment } from 'svg2tikz/node-env'
import { parse, parseClipboardGVML } from '../pptxtojson/src/pptxtojson.js'
import { convertSlideToTikZ } from '../src/tikz/index.js'

installNodeSvgEnvironment()

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`Usage: node pptx2tikz.js <input.pptx> [options]

Options:
  -s, --slide <n>      Slide number (default: 1)
  -a, --all            Convert all slides, each into its own subfolder
  --pdf <file>         Convert all slides, compile, and stitch into one PDF
  -o, --output <file>  Output .tex file (default: output.tex)
  --out-dir <dir>      Output directory for --all mode (default: slides/)
  --no-images          Replace images with placeholders
  --image-dir <dir>    Image output directory (default: images/)
  --compile            Run pdflatex after converting
  --include-layout     Include layout/master slide elements
  --xcolor-rgb-convert Convert colors to xcolor expressions (release mode)
  --save-svgs <dir>    Save extracted SVG files to <dir> for inspection
  -h, --help           Show this help`)
    process.exit(0)
  }

  const inputFile = args[0]
  let slideNum = 1
  let outputFile = 'output.tex'
  let noImages = false
  let imageDir = 'images'
  let includeLayout = false
  let allSlides = false
  let outDir = 'slides'
  let compile = false
  let pdfOutput = null
  let saveSvgsDir = null
  let xcolorRgbConvert = false

  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case '-s':
      case '--slide':
        slideNum = parseInt(args[++i])
        break
      case '-a':
      case '--all':
        allSlides = true
        break
      case '--pdf':
        pdfOutput = args[++i]
        break
      case '-o':
      case '--output':
        outputFile = args[++i]
        break
      case '--out-dir':
        outDir = args[++i]
        break
      case '--no-images':
        noImages = true
        break
      case '--image-dir':
        imageDir = args[++i]
        break
      case '--compile':
        compile = true
        break
      case '--include-layout':
        includeLayout = true
        break
      case '--save-svgs':
        saveSvgsDir = args[++i]
        break
      case '--xcolor-rgb-convert':
        xcolorRgbConvert = true
        break
    }
  }

  // Read PPTX file
  const buffer = readFileSync(inputFile)
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)

  const zip = await JSZip.loadAsync(arrayBuffer)
  const isGVMLClipboard = !!zip.file('clipboard/drawings/drawing1.xml')

  // Parse PPTX or GVML clipboard ZIP
  const result = isGVMLClipboard
    ? await parseClipboardGVML(arrayBuffer)
    : await parse(arrayBuffer)
  if (result.warnings && result.warnings.length > 0) {
    console.warn(`Parser warnings (${result.warnings.length}):`)
    for (const warning of result.warnings) console.warn(`  - ${warning}`)
  }

  const convertOpts = { noImages, imageDir, includeLayoutElements: includeLayout, xcolorRgbConvert }

  if (saveSvgsDir) {
    saveSvgFiles(result, resolve(saveSvgsDir))
  }

  if (pdfOutput) {
    await convertAllToPdf(result, resolve(pdfOutput), convertOpts)
  } else if (allSlides) {
    const baseDir = resolve(outDir)
    console.log(`Converting ${result.slides.length} slides into ${outDir}/...\n`)

    const texFiles = []
    for (let i = 0; i < result.slides.length; i++) {
      const slideDir = join(baseDir, `slide_${String(i + 1).padStart(2, '0')}`)
      const texPath = writeSlide(result.slides[i], result.size, convertOpts, slideDir, `slide_${String(i + 1).padStart(2, '0')}.tex`)
      texFiles.push(texPath)
    }

    if (compile) {
      compileAll(texFiles)
    } else {
      console.log(`\nDone! Compile all with:`)
      console.log(`  for f in ${outDir}/slide_*/slide_*.tex; do (cd "$(dirname "$f")" && pdflatex "$(basename "$f")"); done`)
    }
  } else {
    if (slideNum < 1 || slideNum > result.slides.length) {
      console.error(`Error: Slide ${slideNum} not found. File has ${result.slides.length} slide(s).`)
      process.exit(1)
    }

    const texPath = writeSlide(result.slides[slideNum - 1], result.size, convertOpts, dirname(resolve(outputFile)), outputFile)

    if (compile) {
      compileAll([texPath])
    } else {
      console.log(`\nDone! Compile with: pdflatex ${outputFile}`)
    }
  }
}

async function convertAllToPdf(result, outputPdf, opts) {
  const n = result.slides.length
  console.log(`Converting ${n} slide(s) and compiling to ${outputPdf}...\n`)

  const tmpDir = mkdtempSync(join(tmpdir(), 'pptx2tikz-'))
  try {
    // Convert and compile each slide
    const pdfPaths = []
    let failed = 0
    for (let i = 0; i < n; i++) {
      const label = `slide_${String(i + 1).padStart(2, '0')}`
      const slideDir = join(tmpDir, label)
      const texFile = `${label}.tex`
      writeSlide(result.slides[i], result.size, opts, slideDir, texFile)

      try {
        execSync(`pdflatex -interaction=nonstopmode "${texFile}"`, {
          cwd: slideDir,
          stdio: ['pipe', 'pipe', 'pipe'],
        })
        const pdfPath = join(slideDir, `${label}.pdf`)
        pdfPaths.push(pdfPath)
        console.log(`  Compiled: slide ${i + 1}/${n}`)
      } catch (err) {
        console.error(`  FAILED:   slide ${i + 1} (skipped)`)
        failed++
      }
    }

    if (pdfPaths.length === 0) {
      console.error('\nAll slides failed to compile. No PDF produced.')
      process.exit(1)
    }

    if (failed > 0) {
      console.warn(`\nWarning: ${failed} slide(s) failed and will be missing from the output.`)
    }

    // Stitch PDFs together using a pdfpages document
    const includeCmds = pdfPaths.map(p => `\\includepdf[pages=-, fitpaper=true]{${p}}`).join('\n')
    const stitchTex = [
      '\\documentclass{article}',
      '\\usepackage{pdfpages}',
      '\\begin{document}',
      includeCmds,
      '\\end{document}',
      '',
    ].join('\n')

    const stitchTexPath = join(tmpDir, 'combined.tex')
    writeFileSync(stitchTexPath, stitchTex, 'utf8')

    console.log(`\nStitching ${pdfPaths.length} PDF(s)...`)
    try {
      execSync('pdflatex -interaction=nonstopmode combined.tex', {
        cwd: tmpDir,
        stdio: ['pipe', 'pipe', 'pipe'],
      })
    } catch (err) {
      console.error('Failed to stitch PDFs together.')
      process.exit(1)
    }

    copyFileSync(join(tmpDir, 'combined.pdf'), outputPdf)
    console.log(`\nDone! Written: ${outputPdf}`)
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
}

function writeSlide(slide, size, opts, outputDir, texFilename) {
  const { tex, images } = convertSlideToTikZ(slide, size, opts)

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  const texPath = join(outputDir, texFilename.includes('/') ? texFilename.split('/').pop() : texFilename)
  writeFileSync(texPath, tex, 'utf8')
  console.log(`Written: ${texPath}`)

  if (images.length > 0 && !opts.noImages) {
    const imgDir = join(outputDir, opts.imageDir || 'images')
    if (!existsSync(imgDir)) {
      mkdirSync(imgDir, { recursive: true })
    }
    for (const img of images) {
      const imgPath = join(imgDir, img.filename)
      writeFileSync(imgPath, Buffer.from(img.base64data, 'base64'))
    }
    console.log(`  + ${images.length} image(s)`)
  }

  return texPath
}

function compileAll(texFiles) {
  console.log(`\nCompiling ${texFiles.length} file(s)...\n`)
  let success = 0
  let failed = 0

  for (const texPath of texFiles) {
    const dir = dirname(texPath)
    const file = basename(texPath)
    try {
      execSync(`pdflatex -interaction=nonstopmode "${file}"`, {
        cwd: dir,
        stdio: ['pipe', 'pipe', 'pipe'],
      })
      const pdfName = file.replace(/\.tex$/, '.pdf')
      console.log(`  Compiled: ${join(dir, pdfName)}`)
      success++
    } catch (err) {
      console.error(`  FAILED:   ${texPath}`)
      failed++
    }
  }

  console.log(`\n${success} compiled, ${failed} failed.`)
}

function saveSvgFiles(result, svgDir) {
  if (!existsSync(svgDir)) mkdirSync(svgDir, { recursive: true })
  let count = 0
  for (let i = 0; i < result.slides.length; i++) {
    const elements = result.slides[i].elements || []
    for (const el of elements) {
      if (el.svgSrc) {
        const match = el.svgSrc.match(/^data:image\/svg\+xml;base64,(.+)$/)
        if (match) {
          const filename = join(svgDir, `slide${String(i + 1).padStart(2, '0')}_${count++}.svg`)
          writeFileSync(filename, Buffer.from(match[1], 'base64').toString('utf8'), 'utf8')
        }
      }
    }
  }
  console.log(`Saved ${count} SVG file(s) to ${svgDir}`)
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
