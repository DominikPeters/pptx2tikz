import { htmlToLatex } from '../htmlToLatex.js'
import { cellBorderToTikz } from '../utils/border.js'
import { pt2cm } from '../utils/transform.js'

export function renderTable(element, registry, options = {}) {
  const lines = []
  const x0 = element.left
  const y0 = options.slideHeight - element.top  // TikZ y of table top (max y)

  // Compute cumulative positions
  const colX = [0]
  for (const w of element.colWidths) {
    colX.push(colX[colX.length - 1] + w)
  }
  const rowY = [0]
  for (const h of element.rowHeights) {
    rowY.push(rowY[rowY.length - 1] + h)
  }

  lines.push(`  % Table at (${pt2cm(x0)}, ${pt2cm(element.top)})`)

  for (let r = 0; r < element.data.length; r++) {
    for (let c = 0; c < element.data[r].length; c++) {
      const cell = element.data[r][c]
      if (!cell) continue
      if (cell.hMerge || cell.vMerge) continue

      const cs = cell.colSpan || 1
      const rs = cell.rowSpan || 1

      const cx1 = x0 + colX[c]
      const cy1 = y0 - rowY[r]          // TikZ y of row top (higher)
      const cx2 = x0 + (colX[c + cs] !== undefined ? colX[c + cs] : colX[colX.length - 1])
      const cy2 = y0 - (rowY[r + rs] !== undefined ? rowY[r + rs] : rowY[rowY.length - 1])  // TikZ y of row bottom (lower)
      const midX = (cx1 + cx2) / 2
      const midY = (cy1 + cy2) / 2

      // Cell background
      if (cell.fillColor) {
        const color = registry.register(cell.fillColor)
        if (color) {
          lines.push(`  \\fill[fill=${color.name}] (${pt2cm(cx1)},${pt2cm(cy2)}) rectangle (${pt2cm(cx2)},${pt2cm(cy1)});`)
        }
      }

      // Cell borders
      if (cell.borders) {
        const { top, bottom, left, right } = cell.borders
        if (top) {
          const opts = cellBorderToTikz(top, registry)
          if (opts) lines.push(`  \\draw[${opts}] (${pt2cm(cx1)},${pt2cm(cy1)}) -- (${pt2cm(cx2)},${pt2cm(cy1)});`)
        }
        if (bottom) {
          const opts = cellBorderToTikz(bottom, registry)
          if (opts) lines.push(`  \\draw[${opts}] (${pt2cm(cx1)},${pt2cm(cy2)}) -- (${pt2cm(cx2)},${pt2cm(cy2)});`)
        }
        if (left) {
          const opts = cellBorderToTikz(left, registry)
          if (opts) lines.push(`  \\draw[${opts}] (${pt2cm(cx1)},${pt2cm(cy2)}) -- (${pt2cm(cx1)},${pt2cm(cy1)});`)
        }
        if (right) {
          const opts = cellBorderToTikz(right, registry)
          if (opts) lines.push(`  \\draw[${opts}] (${pt2cm(cx2)},${pt2cm(cy2)}) -- (${pt2cm(cx2)},${pt2cm(cy1)});`)
        }
      }

      // Cell text
      const textResult = htmlToLatex(cell.text, registry, options)
      const content = textResult.content
      if (content.trim()) {
        const textW = cx2 - cx1 - 4
        const textOpts = ['anchor=center', 'inner sep=2pt', `text width=${pt2cm(textW)}cm`]
        if (textResult.nodeTextOptions?.length) {
          textOpts.push(...textResult.nodeTextOptions)
        }
        lines.push(`  \\node[${textOpts.join(', ')}] at (${pt2cm(midX)},${pt2cm(midY)}) {${content}};`)
      }
    }
  }

  return lines.join('\n')
}
