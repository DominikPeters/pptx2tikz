import { ColorRegistry } from './utils/color.js'
import { generatePreamble } from './preamble.js'
import { fillToTikz } from './utils/fill.js'
import { pt2cm } from './utils/transform.js'
import { renderText } from './renderers/text.js'
import { renderShape } from './renderers/shape.js'
import { renderImage } from './renderers/image.js'
import { renderTable } from './renderers/table.js'
import { renderMath } from './renderers/math.js'
import { renderGroup } from './renderers/group.js'
import { renderFallback } from './renderers/fallback.js'

function renderElement(element, registry, imageCollector, options) {
  switch (element.type) {
    case 'text':
      return renderText(element, registry, options)
    case 'shape':
      return renderShape(element, registry, options)
    case 'image':
      return renderImage(element, imageCollector, options)
    case 'table':
      return renderTable(element, registry, options)
    case 'math':
      return renderMath(element, registry, options)
    case 'group':
      return renderGroup(element, registry, imageCollector, options, renderElement)
    case 'diagram':
      return renderDiagram(element, registry, imageCollector, options)
    default:
      return renderFallback(element, options)
  }
}

function renderDiagram(element, registry, imageCollector, options) {
  if (element.elements && element.elements.length > 0) {
    const lines = [`  % Diagram at (${element.left},${element.top})`]
    for (const child of element.elements) {
      const tikz = renderElement(child, registry, imageCollector, options)
      if (tikz) lines.push(tikz)
    }
    return lines.join('\n')
  }

  return renderFallback(element)
}

function renderBackground(fill, size, registry) {
  if (!fill) return ''

  const fillInfo = fillToTikz(fill, registry)
  if (!fillInfo.options) return ''

  const cmd = fillInfo.shade ? '\\shade' : '\\fill'
  return `  ${cmd}[${fillInfo.options}] (0,0) rectangle (${pt2cm(size.width)},${pt2cm(size.height)});`
}

function hasLinks(elements) {
  for (const el of elements) {
    if (el.link) return true
    if (el.content && el.content.includes('<a href=')) return true
    if (el.type === 'group' && el.elements && hasLinks(el.elements)) return true
    if (el.type === 'diagram' && el.elements && hasLinks(el.elements)) return true
    if (el.type === 'table' && el.data) {
      for (const row of el.data) {
        for (const cell of row) {
          if (cell && cell.text && cell.text.includes('<a href=')) return true
        }
      }
    }
  }
  return false
}

export function convertSlideToTikZ(slide, size, options = {}) {
  const registry = new ColorRegistry(options)
  const imageCollector = []
  options = { ...options, slideHeight: size.height }

  let elements = [...(slide.elements || [])]
  if (options.includeLayoutElements && slide.layoutElements) {
    elements = [...slide.layoutElements, ...elements]
  }

  // Sort by z-order
  elements.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // Render background
  const backgroundTikz = renderBackground(slide.fill, size, registry)

  // Render elements
  const elementsTikz = elements
    .map(el => renderElement(el, registry, imageCollector, options))
    .filter(Boolean)

  // Check for features that need extra packages
  const hasImg = imageCollector.length > 0
  const hasSvgTikz = !!imageCollector.hasSvgTikz
  const hasLnk = hasLinks(elements)

  // Generate preamble (after all colors are registered)
  const preamble = generatePreamble(registry, hasImg, hasLnk, hasSvgTikz)

  const body = [
    '\\begin{document}',
    `\\begin{tikzpicture}[x=1cm, y=1cm]`,
    `  \\clip (0,0) rectangle (${pt2cm(size.width)},${pt2cm(size.height)});`,
  ]

  if (backgroundTikz) body.push(backgroundTikz)
  body.push(...elementsTikz)

  body.push('\\end{tikzpicture}')
  body.push('\\end{document}')
  body.push('')

  return {
    tex: preamble + body.join('\n'),
    images: imageCollector,
  }
}
