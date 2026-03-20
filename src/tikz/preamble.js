function commonPackages(hasImages, hasLinks, hasSvgTikz) {
  const lines = [
    '\\usepackage[utf8]{inputenc}',
    '\\usepackage[T1]{fontenc}',
    '\\usepackage{tikz}',
    '\\usepackage{xcolor}',
    '\\usepackage{amsmath,amssymb}',
    '\\usepackage[normalem]{ulem}',
    '\\usetikzlibrary{shapes.geometric,calc,positioning,shadows.blur,patterns,shadings}',
  ]
  if (hasImages || hasSvgTikz) lines.push('\\usepackage{graphicx}')
  if (hasLinks) lines.push('\\usepackage{hyperref}')
  return lines
}

export function generatePreamble(colorRegistry, hasImages, hasLinks, hasSvgTikz = false) {
  const lines = [
    '\\documentclass[border=0pt]{standalone}',
    ...commonPackages(hasImages, hasLinks, hasSvgTikz),
    '',
  ]
  const defs = colorRegistry.getDefinitions()
  if (defs) {
    lines.push(defs)
    lines.push('')
  }
  return lines.join('\n')
}

export function generateContainerPreamble(colorRegistry, size, hasImages, hasLinks, hasSvgTikz = false) {
  const w = (size.width / 28.3465).toFixed(4)
  const h = (size.height / 28.3465).toFixed(4)
  const lines = [
    '\\documentclass{article}',
    `\\usepackage[paperwidth=${w}cm,paperheight=${h}cm,margin=0pt]{geometry}`,
    '\\usepackage{parskip}',
    ...commonPackages(hasImages, hasLinks, hasSvgTikz),
    '',
  ]
  const defs = colorRegistry.getDefinitions()
  if (defs) {
    lines.push(defs)
    lines.push('')
  }
  return lines.join('\n')
}
