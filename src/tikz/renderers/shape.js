import { htmlToLatex } from '../htmlToLatex.js'
import { borderToTikzOptions } from '../utils/border.js'
import { fillToTikz } from '../utils/fill.js'
import { svgPathToTikz } from '../utils/svgpath.js'
import { pt2cm } from '../utils/transform.js'

export function renderShape(element, registry, options = {}) {
  const lines = []
  const x = element.left
  const y = options.slideHeight - element.top   // TikZ top of element (max y)
  const w = element.width
  const h = element.height
  const cx = x + w / 2
  const cy = y - h / 2                          // TikZ center y

  // Shorthand for converting pt coords to cm strings
  const c = v => pt2cm(v)

  const needsScope = element.rotate || element.isFlipH || element.isFlipV
  if (needsScope) {
    const scopeOpts = []
    // TikZ applies scope transforms right-to-left (last option applied first to coordinates).
    // PPTX applies flip first, then rotation. So rotation must be listed FIRST (applied last),
    // and flip operations listed LAST (applied first).
    // Flip around (cx,0): [shift(cx), xscale=-1, shift(-cx)] — right-to-left: shift(-cx), flip, shift(cx).
    if (element.rotate) scopeOpts.push(`rotate around={${-element.rotate}:(${c(cx)},${c(cy)})}`)
    if (element.isFlipH) {
      scopeOpts.push(`shift={(${c(cx)},0)}`, 'xscale=-1', `shift={(-${c(cx)},0)}`)
    }
    if (element.isFlipV) {
      scopeOpts.push(`shift={(0,${c(cy)})}`, 'yscale=-1', `shift={(0,-${c(cy)})}`)
    }
    lines.push(`  \\begin{scope}[${scopeOpts.join(', ')}]`)
  }

  const indent = needsScope ? '    ' : '  '
  const fillInfo = fillToTikz(element.fill, registry)
  const borderOpts = borderToTikzOptions(element, registry)

  const drawOpts = []
  if (fillInfo.options) drawOpts.push(fillInfo.options)
  if (borderOpts) drawOpts.push(borderOpts)

  const hasFill = !!fillInfo.options
  const hasBorder = !!borderOpts
  const cmd = fillInfo.shade
    ? (hasBorder ? '\\shadedraw' : '\\shade')
    : (hasFill && hasBorder ? '\\filldraw' : hasFill ? '\\fill' : '\\draw')
  const optsStr = drawOpts.length ? `[${drawOpts.join(', ')}]` : ''

  switch (element.shapType) {
    case 'straightConnector1': {
      // The scope transform (if any) handles flip/rotation. Use unflipped coords here.
      // tailEnd arrowhead is at (x+w, y-h); scope flips will move it to the correct end.
      const arrowOpts = ['->']
      if (borderOpts) arrowOpts.push(borderOpts)
      lines.push(`${indent}\\draw[${arrowOpts.join(', ')}] (${c(x)},${c(y)}) -- (${c(x + w)},${c(y - h)});`)
      break
    }

    case 'line': {
      const lineOpts = borderOpts ? `[${borderOpts}]` : ''
      lines.push(`${indent}\\draw${lineOpts} (${c(x)},${c(y)}) -- (${c(x + w)},${c(y - h)});`)
      break
    }

    case 'rect':
    case 'snip1Rect':
    case 'snip2SameRect':
      lines.push(`${indent}${cmd}${optsStr} (${c(x)},${c(y - h)}) rectangle (${c(x + w)},${c(y)});`)
      break

    case 'roundRect':
    case 'round1Rect':
    case 'round2SameRect': {
      const radius = Math.min(w, h) * 0.1
      const opts2 = drawOpts.length ? drawOpts.join(', ') + ', ' : ''
      lines.push(`${indent}${cmd}[${opts2}rounded corners=${c(radius)}cm] (${c(x)},${c(y - h)}) rectangle (${c(x + w)},${c(y)});`)
      break
    }

    case 'ellipse':
      lines.push(`${indent}${cmd}${optsStr} (${c(cx)},${c(cy)}) ellipse (${c(w / 2)}cm and ${c(h / 2)}cm);`)
      break

    case 'triangle':
    case 'accentCallout1':
      lines.push(`${indent}${cmd}${optsStr} (${c(cx)},${c(y)}) -- (${c(x + w)},${c(y - h)}) -- (${c(x)},${c(y - h)}) -- cycle;`)
      break

    case 'diamond':
    case 'rhombus':
      lines.push(`${indent}${cmd}${optsStr} (${c(cx)},${c(y)}) -- (${c(x + w)},${c(cy)}) -- (${c(cx)},${c(y - h)}) -- (${c(x)},${c(cy)}) -- cycle;`)
      break

    case 'pentagon':
      lines.push(`${indent}${cmd}${optsStr} (${c(cx)},${c(y)}) -- (${c(x + w)},${c(y - h * 0.38)}) -- (${c(x + w * 0.81)},${c(y - h)}) -- (${c(x + w * 0.19)},${c(y - h)}) -- (${c(x)},${c(y - h * 0.38)}) -- cycle;`)
      break

    case 'hexagon':
      lines.push(`${indent}${cmd}${optsStr} (${c(x + w * 0.25)},${c(y)}) -- (${c(x + w * 0.75)},${c(y)}) -- (${c(x + w)},${c(cy)}) -- (${c(x + w * 0.75)},${c(y - h)}) -- (${c(x + w * 0.25)},${c(y - h)}) -- (${c(x)},${c(cy)}) -- cycle;`)
      break

    case 'parallelogram': {
      const off = w * 0.2
      lines.push(`${indent}${cmd}${optsStr} (${c(x + off)},${c(y)}) -- (${c(x + w)},${c(y)}) -- (${c(x + w - off)},${c(y - h)}) -- (${c(x)},${c(y - h)}) -- cycle;`)
      break
    }

    case 'trapezoid': {
      const off = w * 0.2
      lines.push(`${indent}${cmd}${optsStr} (${c(x + off)},${c(y)}) -- (${c(x + w - off)},${c(y)}) -- (${c(x + w)},${c(y - h)}) -- (${c(x)},${c(y - h)}) -- cycle;`)
      break
    }

    case 'custom': {
      if (element.path) {
        const tikzPath = svgPathToTikz(element.path, element.left, element.top, options.slideHeight)
        if (tikzPath) {
          lines.push(`${indent}${cmd}${optsStr} ${tikzPath};`)
          break
        }
      }
      // fallback to rect
      lines.push(`${indent}${cmd}${optsStr} (${c(x)},${c(y - h)}) rectangle (${c(x + w)},${c(y)});`)
      break
    }

    default:
      lines.push(`${indent}${cmd}${optsStr} (${c(x)},${c(y - h)}) rectangle (${c(x + w)},${c(y)});`)
      break
  }

  // Add text content if present
  const textResult = htmlToLatex(element.content, registry, options)
  const content = textResult.content
  if (content.trim()) {
    const textOpts = ['anchor=center', 'inner sep=2pt', `text width=${c(w * 0.9)}cm`]
    if (textResult.nodeTextOptions?.length) {
      textOpts.push(...textResult.nodeTextOptions)
    }
    lines.push(`${indent}\\node[${textOpts.join(', ')}] at (${c(cx)},${c(cy)}) {${content}};`)
  }

  if (needsScope) {
    lines.push('  \\end{scope}')
  }

  return lines.join('\n')
}
