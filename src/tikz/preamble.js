export function generatePreamble(colorRegistry, hasImages, hasLinks, hasSvgTikz = false) {
  const lines = [
    '\\documentclass[border=0pt]{standalone}',
    '\\usepackage[utf8]{inputenc}',
    '\\usepackage[T1]{fontenc}',
    '\\usepackage{tikz}',
    '\\usepackage{xcolor}',
    '\\usepackage{amsmath,amssymb}',
    '\\usepackage[normalem]{ulem}',
    '\\usetikzlibrary{shapes.geometric,calc,positioning,shadows.blur,patterns,shadings}',
  ]

  if (hasImages || hasSvgTikz) {
    lines.push('\\usepackage{graphicx}')
  }
  if (hasLinks) {
    lines.push('\\usepackage{hyperref}')
  }

  lines.push('')

  const colorDefs = colorRegistry.getDefinitions()
  if (colorDefs) {
    lines.push(colorDefs)
    lines.push('')
  }

  return lines.join('\n')
}
