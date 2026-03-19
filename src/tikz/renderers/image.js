import { svgToTikz } from 'svg2tikz'
import { installNodeSvgEnvironment } from 'svg2tikz/node-env'
import { pt2cm } from '../utils/transform.js'

let svgEnvInstalled = false

function ensureSvgEnv() {
  if (!svgEnvInstalled) {
    installNodeSvgEnvironment()
    svgEnvInstalled = true
  }
}

function extractViewBox(svgString) {
  const m = svgString.match(/viewBox\s*=\s*["']\s*([\d.+-]+)\s+([\d.+-]+)\s+([\d.+-]+)\s+([\d.+-]+)\s*["']/)
  if (m) return { w: parseFloat(m[3]), h: parseFloat(m[4]) }
  const wm = svgString.match(/\bwidth\s*=\s*["']?([\d.]+)/)
  const hm = svgString.match(/\bheight\s*=\s*["']?([\d.]+)/)
  if (wm && hm) return { w: parseFloat(wm[1]), h: parseFloat(hm[1]) }
  return null
}

function renderSvgAsTikz(element, imageCollector, options) {
  const dataUrlMatch = element.svgSrc.match(/^data:image\/svg\+xml;base64,(.+)$/)
  if (!dataUrlMatch) return null

  let svgString
  try {
    svgString = Buffer.from(dataUrlMatch[1], 'base64').toString('utf8')
  } catch (e) {
    return null
  }

  const vb = extractViewBox(svgString)
  if (!vb || vb.w === 0 || vb.h === 0) return null

  ensureSvgEnv()

  let tikzFull
  try {
    tikzFull = svgToTikz(svgString, { standalone: false })
  } catch (e) {
    return null
  }

  const bodyMatch = tikzFull.match(/\\begin\{tikzpicture\}(?:\[[\s\S]*?\])?([\s\S]*?)\\end\{tikzpicture\}/)
  if (!bodyMatch) return null

  // svg2tikz maps the viewBox to x ∈ [0,10], y ∈ [0, 10*svgH/svgW] (in cm).
  // Force the inner tikzpicture's TeX bounding box to exactly this extent so that
  // \resizebox scales relative to the full viewBox, not the tight drawn-content box.
  const tikzH = (10 * vb.h / vb.w).toFixed(4)
  const bbLine = `  \\path[use as bounding box] (0,0) rectangle (10,${tikzH});`
  const body = bbLine + '\n' + bodyMatch[1].trim()

  imageCollector.hasSvgTikz = true

  const x = element.left
  const y = options.slideHeight - element.top   // TikZ top of element (max y)
  const w = element.width
  const h = element.height
  const cx = x + w / 2
  const cy = y - h / 2

  const needsScope = element.rotate
  const lines = []

  if (needsScope) {
    const scopeOpts = []
    if (element.rotate) scopeOpts.push(`rotate around={${-element.rotate}:(${pt2cm(cx)},${pt2cm(cy)})}`)
    lines.push(`  \\begin{scope}[${scopeOpts.join(', ')}]`)
  }

  const indent = needsScope ? '    ' : '  '
  // anchor=north west places the top-left corner at (x, y) in y-up coordinates
  lines.push(`${indent}\\node[inner sep=0pt, anchor=north west] at (${pt2cm(x)},${pt2cm(y)}) {%`)
  lines.push(`${indent}  \\resizebox{${pt2cm(w)}cm}{${pt2cm(h)}cm}{%`)
  lines.push(`${indent}  \\begin{tikzpicture}[x=1cm, y=1cm]`)
  lines.push(body)
  lines.push(`${indent}  \\end{tikzpicture}%`)
  lines.push(`${indent}  }%`)
  lines.push(`${indent}};`)

  if (needsScope) {
    lines.push(`  \\end{scope}`)
  }

  return lines.join('\n')
}

export function renderImage(element, imageCollector, options = {}) {
  const x = element.left
  const y = options.slideHeight - element.top   // TikZ top of element (max y)
  const w = element.width
  const h = element.height
  const cx = x + w / 2
  const cy = y - h / 2

  if (options.noImages) {
    return `  \\draw[dashed, gray] (${pt2cm(x)},${pt2cm(y - h)}) rectangle (${pt2cm(x + w)},${pt2cm(y)});\n  \\node at (${pt2cm(cx)},${pt2cm(cy)}) {\\small [Image]};`
  }

  // Use SVG source if available (renders as native TikZ, no external file needed)
  if (element.svgSrc) {
    const result = renderSvgAsTikz(element, imageCollector, options)
    if (result) {
      console.log(`  [svg2tikz] converted SVG at (${element.left},${element.top})`)
      return result
    }
    console.warn(`  [svg2tikz] SVG conversion failed at (${element.left},${element.top}), falling back to PNG`)
  }

  if (!element.src) {
    return `  % Image element with no source at (${pt2cm(x)},${element.top})`
  }

  // Extract base64 data
  const dataUrlMatch = element.src.match(/^data:image\/(\w+);base64,(.+)$/)
  if (!dataUrlMatch) {
    return `  % Image with unsupported source format at (${pt2cm(x)},${element.top})`
  }

  const ext = dataUrlMatch[1] === 'jpeg' ? 'jpg' : dataUrlMatch[1]
  const base64data = dataUrlMatch[2]
  const imageDir = options.imageDir || 'images'
  const index = imageCollector.length
  const filename = `image_${index}.${ext}`

  imageCollector.push({ filename, base64data, ext })

  const lines = []
  const needsScope = element.rotate || element.isFlipH || element.isFlipV
  const needsClip = element.rect || (element.geom && element.geom !== 'rect')

  if (needsScope || needsClip) {
    const scopeOpts = []
    if (element.rotate) scopeOpts.push(`rotate around={${-element.rotate}:(${pt2cm(cx)},${pt2cm(cy)})}`)
    if (element.isFlipH) scopeOpts.push('xscale=-1')
    if (element.isFlipV) scopeOpts.push('yscale=-1')
    lines.push(`  \\begin{scope}${scopeOpts.length ? `[${scopeOpts.join(', ')}]` : ''}`)

    if (needsClip) {
      if (element.geom === 'ellipse') {
        lines.push(`    \\clip (${pt2cm(cx)},${pt2cm(cy)}) ellipse (${pt2cm(w / 2)}cm and ${pt2cm(h / 2)}cm);`)
      } else if (element.rect) {
        const cl = (element.rect.l || 0) * w
        const ct = (element.rect.t || 0) * h
        const cr = (element.rect.r || 0) * w
        const cb = (element.rect.b || 0) * h
        lines.push(`    \\clip (${pt2cm(x + cl)},${pt2cm(y - ct)}) rectangle (${pt2cm(x + w - cr)},${pt2cm(y - h + cb)});`)
      }
    }
  }

  const indent = (needsScope || needsClip) ? '    ' : '  '
  lines.push(`${indent}\\node[anchor=north west, inner sep=0pt] at (${pt2cm(x)},${pt2cm(y)}) {\\includegraphics[width=${pt2cm(w)}cm, height=${pt2cm(h)}cm]{${imageDir}/${filename}}};`)

  if (needsScope || needsClip) {
    lines.push('  \\end{scope}')
  }

  return lines.join('\n')
}
