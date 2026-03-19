import { scopeTransform } from '../utils/transform.js'

export function renderGroup(element, registry, imageCollector, options, renderElementFn) {
  const lines = []
  const scopeOpts = scopeTransform(element, options.slideHeight)

  lines.push(`  \\begin{scope}[${scopeOpts.join(', ')}]`)

  // Children have coordinates relative to the group's top-left corner.
  // The scope already shifts the origin to the group's position, so children
  // must render in local coords: slideHeight=0 gives tikz_y = 0 - local_top = -local_top.
  const childOptions = { ...options, slideHeight: 0 }
  for (const child of element.elements) {
    const childTikz = renderElementFn(child, registry, imageCollector, childOptions)
    if (childTikz) lines.push(childTikz)
  }

  lines.push('  \\end{scope}')
  return lines.join('\n')
}
