export function borderToTikzOptions(element, registry) {
  const opts = []

  if (!element.borderWidth || !element.borderColor) return ''

  const color = registry.register(element.borderColor)
  if (!color) return ''

  opts.push(`draw=${color.name}`)
  if (color.opacity < 1) opts.push(`draw opacity=${color.opacity.toFixed(2)}`)
  opts.push(`line width=${element.borderWidth}pt`)

  if (element.borderType === 'dashed' || element.borderStrokeDasharray === '5') {
    opts.push('dashed')
  } else if (element.borderType === 'dotted' || element.borderStrokeDasharray === '1, 5') {
    opts.push('dotted')
  } else if (element.borderStrokeDasharray && element.borderStrokeDasharray !== '0') {
    const parts = element.borderStrokeDasharray.split(',').map(s => s.trim())
    if (parts.length >= 2) {
      const pattern = []
      for (let i = 0; i < parts.length; i++) {
        pattern.push(`${i % 2 === 0 ? 'on' : 'off'} ${parts[i]}pt`)
      }
      opts.push(`dash pattern=${pattern.join(' ')}`)
    }
  }

  return opts.join(', ')
}

export function cellBorderToTikz(border, registry) {
  if (!border || !border.borderWidth || !border.borderColor) return null
  const color = registry.register(border.borderColor)
  if (!color) return null

  const opts = [`draw=${color.name}`, `line width=${border.borderWidth}pt`]
  if (border.borderType === 'dashed') opts.push('dashed')
  else if (border.borderType === 'dotted') opts.push('dotted')

  return opts.join(', ')
}
