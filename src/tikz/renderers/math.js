import { pt2cm } from '../utils/transform.js'

export function renderMath(element, registry, options = {}) {
  if (!element.latex) {
    return `  % Math element at (${pt2cm(element.left)},${pt2cm(element.top)}) with no LaTeX`
  }
  // Escape % and convert Unicode math italic/bold characters to plain LaTeX
  const latex = element.latex
    .replace(/%/g, '\\%')
    .replace(/[\u{1D434}-\u{1D44D}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D434 + 65))  // Math Italic A-Z
    .replace(/[\u{1D44E}-\u{1D467}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D44E + 97))  // Math Italic a-z
    .replace(/[\u{1D400}-\u{1D419}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D400 + 65))  // Math Bold A-Z
    .replace(/[\u{1D41A}-\u{1D433}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D41A + 97))  // Math Bold a-z
    .replace(/[\u{1D7CE}-\u{1D7D7}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D7CE + 48))  // Math Bold 0-9
  const y = options.slideHeight - element.top
  const w = element.width
  const h = element.height

  const nodeOpts = ['anchor=north west', 'inner sep=0pt', `text width=${pt2cm(w)}cm`, `minimum height=${pt2cm(h)}cm`]
  if (element.fontSize) {
    const leading = (element.fontSize * 1.2).toFixed(1)
    nodeOpts.push(`font=\\fontsize{${element.fontSize}}{${leading}}\\selectfont`)
  }

  let colorPrefix = ''
  if (element.color && registry) {
    const color = registry.register(element.color)
    if (color) colorPrefix = `\\color{${color.name}}`
  }
  return `  \\node[${nodeOpts.join(', ')}] at (${pt2cm(element.left)},${pt2cm(y)}) {$${colorPrefix}\\displaystyle ${latex}$};`
}
