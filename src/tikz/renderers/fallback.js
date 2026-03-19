import { pt2cm } from '../utils/transform.js'

export function renderFallback(element, options = {}) {
  const x = element.left
  const y = options.slideHeight - element.top   // TikZ top of element
  const w = element.width
  const h = element.height
  const cx = x + w / 2
  const cy = y - h / 2
  const label = element.type.charAt(0).toUpperCase() + element.type.slice(1)

  return [
    `  % Unsupported element: ${element.type} at (${pt2cm(x)},${pt2cm(element.top)}) size ${pt2cm(w)}x${pt2cm(h)}`,
    `  \\draw[dashed, gray] (${pt2cm(x)},${pt2cm(y - h)}) rectangle (${pt2cm(x + w)},${pt2cm(y)});`,
    `  \\node[gray] at (${pt2cm(cx)},${pt2cm(cy)}) {\\small [${label}]};`,
  ].join('\n')
}
