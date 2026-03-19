export function pt2cm(v) {
  return (v / 28.3465).toFixed(2)
}

export function transformOptions(element, slideHeight) {
  const opts = []

  if (element.rotate) {
    const cx = element.left + element.width / 2
    const cy = slideHeight - element.top - element.height / 2
    opts.push(`rotate around={${-element.rotate}:(${pt2cm(cx)},${pt2cm(cy)})}`)
  }

  if (element.isFlipH) opts.push('xscale=-1')
  if (element.isFlipV) opts.push('yscale=-1')

  return opts
}

export function scopeTransform(element, slideHeight) {
  const opts = []
  opts.push(`shift={(${pt2cm(element.left)},${pt2cm(slideHeight - element.top)})}`)
  if (element.rotate) {
    const cx = element.width / 2
    const cy = -element.height / 2   // y-up: center is half-height below the top
    opts.push(`rotate around={${-element.rotate}:(${pt2cm(cx)},${pt2cm(cy)})}`)
  }
  if (element.isFlipH) opts.push('xscale=-1')
  if (element.isFlipV) opts.push('yscale=-1')
  return opts
}
