#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, mkdtempSync, rmSync, copyFileSync } from 'fs'
import { dirname, resolve, join } from 'path'
import { tmpdir } from 'os'
import { execSync } from 'child_process'
import JSZip from 'jszip'
import { installNodeSvgEnvironment } from 'svg2tikz/node-env'
import { parse, parseClipboardGVML } from '../pptxtojson/src/pptxtojson.js'
import { convertSlideToTikZ, convertSlidesToTikZ } from '../src/tikz/index.js'

installNodeSvgEnvironment()

function parseSlideSelection(str, total) {
  const indices = new Set()
  for (const part of str.split(',')) {
    const range = part.trim().match(/^(\d+)(?:-(\d+))?$/)
    if (!range) {
      console.error(`Error: invalid slide selection "${part}"`)
      process.exit(1)
    }
    const from = parseInt(range[1])
    const to = range[2] ? parseInt(range[2]) : from
    if (from < 1 || to > total || from > to) {
      console.error(`Error: slide range "${part}" is out of bounds (file has ${total} slide(s))`)
      process.exit(1)
    }
    for (let i = from; i <= to; i++) indices.add(i)
  }
  return [...indices].sort((a, b) => a - b)
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`Usage: pptx2tikz <input.pptx> [options]

Options:
  --slides <spec>      Slide selection: single (3), list (1,3,5), ranges (1,3,5-9)
                       Defaults to all slides
  --output <file>      Output file: .tex writes a container document to file,
                       .pdf compiles and writes a PDF (requires pdflatex)
  --out-dir <dir>      Write one standalone .tex per slide into <dir>/slide_NN/ subfolders
                       (mutually exclusive with --output)
                       If neither --output nor --out-dir is given, the .tex is written
                       to stdout; images are replaced with placeholders and a warning
                       is printed to stderr
  --no-images          Replace images with placeholder boxes
  --image-dir <dir>    Image directory prefix in \\includegraphics (default: images)
  --include-layout     Include layout/master slide elements
  --xcolor-rgb-convert Convert colors to xcolor expressions
  --save-svgs <dir>    Save extracted SVG files to <dir> for inspection
  -h, --help           Show this help`)
    process.exit(0)
  }

  const inputFile = args[0]
  let slidesSpec = null
  let outputFile = null
  let outDir = null
  let noImages = false
  let imageDir = 'images'
  let includeLayout = false
  let saveSvgsDir = null
  let xcolorRgbConvert = false

  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case '--slides':
        slidesSpec = args[++i]
        break
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
      case '--include-layout':
        includeLayout = true
        break
      case '--save-svgs':
        saveSvgsDir = args[++i]
        break
      case '--xcolor-rgb-convert':
        xcolorRgbConvert = true
        break
      default:
        console.error(`Error: unknown option "${args[i]}"`)
        process.exit(1)
    }
  }

  if (outputFile && outDir) {
    console.error('Error: --output and --out-dir are mutually exclusive')
    process.exit(1)
  }

  const buffer = readFileSync(inputFile)
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)

  const zip = await JSZip.loadAsync(arrayBuffer)
  const isGVMLClipboard = !!zip.file('clipboard/drawings/drawing1.xml')

  const result = isGVMLClipboard
    ? await parseClipboardGVML(arrayBuffer)
    : await parse(arrayBuffer)

  if (result.warnings && result.warnings.length > 0) {
    console.warn(`Parser warnings (${result.warnings.length}):`)
    for (const warning of result.warnings) console.warn(`  - ${warning}`)
  }

  if (saveSvgsDir) {
    saveSvgFiles(result, resolve(saveSvgsDir))
  }

  const slideIndices = slidesSpec
    ? parseSlideSelection(slidesSpec, result.slides.length)
    : Array.from({ length: result.slides.length }, (_, i) => i + 1)

  const selectedSlides = slideIndices.map(n => result.slides[n - 1])
  const convertOpts = { noImages, imageDir, includeLayoutElements: includeLayout, xcolorRgbConvert }

  if (outDir) {
    // Per-slide standalone files
    const baseDir = resolve(outDir)
    console.log(`Converting ${selectedSlides.length} slide(s) into ${outDir}/...\n`)
    for (let i = 0; i < selectedSlides.length; i++) {
      const slideNum = slideIndices[i]
      const label = `slide_${String(slideNum).padStart(2, '0')}`
      const slideDir = join(baseDir, label)
      const { tex, images } = convertSlidesToTikZ([selectedSlides[i]], result.size, convertOpts)
      if (!existsSync(slideDir)) mkdirSync(slideDir, { recursive: true })
      writeFileSync(join(slideDir, `${label}.tex`), tex, 'utf8')
      console.log(`Written: ${join(slideDir, `${label}.tex`)}`)
      if (images.length > 0 && !noImages) {
        writeImages(images, join(slideDir, imageDir))
      }
    }
    console.log(`\nDone! Compile all with:`)
    console.log(`  for f in ${outDir}/slide_*/slide_*.tex; do (cd "$(dirname "$f")" && pdflatex "$(basename "$f")"); done`)
  } else if (outputFile && outputFile.endsWith('.pdf')) {
    // Container tex -> compile -> pdf
    await convertToPdf(selectedSlides, result.size, convertOpts, resolve(outputFile))
  } else if (outputFile) {
    // Container tex file
    const { tex, images } = convertSlidesToTikZ(selectedSlides, result.size, convertOpts)
    const outPath = resolve(outputFile)
    writeFileSync(outPath, tex, 'utf8')
    console.log(`Written: ${outPath}`)
    if (images.length > 0 && !noImages) {
      const imgDir = join(dirname(outPath), imageDir)
      writeImages(images, imgDir)
    }
    console.log(`\nDone! Compile with: pdflatex ${outputFile}`)
  } else {
    // Stdout
    const hasImages = selectedSlides.some(s => (s.elements || []).some(el => el.type === 'image'))
    if (hasImages && !noImages) {
      console.warn('Warning: presentation contains images which cannot be written to stdout; substituting placeholders')
      convertOpts.noImages = true
    }
    const { tex } = convertSlidesToTikZ(selectedSlides, result.size, convertOpts)
    process.stdout.write(tex)
  }
}

async function convertToPdf(slides, size, opts, outputPdf) {
  console.log(`Converting ${slides.length} slide(s) and compiling to ${outputPdf}...\n`)
  const tmpDir = mkdtempSync(join(tmpdir(), 'pptx2tikz-'))
  try {
    const { tex, images } = convertSlidesToTikZ(slides, size, opts)
    const texPath = join(tmpDir, 'container.tex')
    writeFileSync(texPath, tex, 'utf8')
    if (images.length > 0 && !opts.noImages) {
      writeImages(images, join(tmpDir, opts.imageDir || 'images'))
    }
    try {
      execSync('pdflatex -interaction=nonstopmode container.tex', {
        cwd: tmpDir,
        stdio: ['pipe', 'pipe', 'pipe'],
      })
    } catch (err) {
      console.error('pdflatex failed. Run with --output container.tex to inspect the source.')
      process.exit(1)
    }
    copyFileSync(join(tmpDir, 'container.pdf'), outputPdf)
    console.log(`Done! Written: ${outputPdf}`)
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
}

function writeImages(images, imgDir) {
  if (!existsSync(imgDir)) mkdirSync(imgDir, { recursive: true })
  for (const img of images) {
    writeFileSync(join(imgDir, img.filename), Buffer.from(img.base64data, 'base64'))
  }
  console.log(`  + ${images.length} image(s) written to ${imgDir}`)
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
