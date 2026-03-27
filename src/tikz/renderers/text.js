import { htmlToLatex } from '../htmlToLatex.js'
import { borderToTikzOptions } from '../utils/border.js'
import { fillToTikz } from '../utils/fill.js'
import { pt2cm } from '../utils/transform.js'

export function renderText(element, registry, options = {}) {
  const textResult = htmlToLatex(element.content, registry, options)
  const content = textResult.content
  if (!content.trim()) return ''

  const opts = ['anchor=north west', 'inner sep=0pt']
  opts.push(`text width=${pt2cm(element.width)}cm`)
  opts.push(`minimum height=${pt2cm(element.height)}cm`)
  if (textResult.nodeTextOptions?.length) {
    opts.push(...textResult.nodeTextOptions)
  }

  const fillInfo = fillToTikz(element.fill, registry)
  if (fillInfo.options) opts.push(fillInfo.options)

  const borderOpts = borderToTikzOptions(element, registry)
  if (borderOpts) opts.push(borderOpts)

  if (element.vAlign === 'mid') {
    opts.push(`minimum height=${pt2cm(element.height)}cm`)
    const hasAlignOption = opts.some(opt => opt.startsWith('align='))
    if (!hasAlignOption) opts.push('align=center')
  }

  const lines = []
  const fy = y => options.slideHeight - y

  const needsScope = element.rotate || element.isFlipH || element.isFlipV
  if (needsScope) {
    const scopeOpts = []
    if (element.rotate) {
      const cx = element.left + element.width / 2
      const cy = fy(element.top) - element.height / 2
      scopeOpts.push(`rotate around={${-element.rotate}:(${pt2cm(cx)},${pt2cm(cy)})}`)
    }
    if (element.isFlipH) scopeOpts.push('xscale=-1')
    if (element.isFlipV) scopeOpts.push('yscale=-1')
    lines.push(`  \\begin{scope}[${scopeOpts.join(', ')}]`)
  }

  const indent = needsScope ? '    ' : '  '

  lines.push(`${indent}\\node[${opts.join(', ')}] at (${pt2cm(element.left)},${pt2cm(fy(element.top))}) {${content}};`)

  if (needsScope) {
    lines.push('  \\end{scope}')
  }

  return lines.join('\n')
}
