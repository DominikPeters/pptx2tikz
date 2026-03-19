export function fillToTikz(fill, registry) {
  if (!fill) return { options: '', preCommands: '', postCommands: '' }

  switch (fill.type) {
    case 'color': {
      const color = registry.register(fill.value)
      if (!color) return { options: '', preCommands: '', postCommands: '' }
      const opts = [`fill=${color.name}`]
      if (color.opacity < 1) opts.push(`fill opacity=${color.opacity.toFixed(2)}`)
      return { options: opts.join(', '), preCommands: '', postCommands: '' }
    }

    case 'gradient': {
      const { path, rot, colors } = fill.value
      if (!colors || colors.length < 2) return { options: '', preCommands: '', postCommands: '' }

      const first = registry.register(colors[0].color)
      const last = registry.register(colors[colors.length - 1].color)
      if (!first || !last) return { options: '', preCommands: '', postCommands: '' }

      if (path === 'circle' || path === 'rect' || path === 'shape') {
        return {
          options: `inner color=${first.name}, outer color=${last.name}`,
          shade: true,
          preCommands: '',
          postCommands: '',
        }
      }

      const angle = (rot || 0) + 90
      return {
        options: `left color=${first.name}, right color=${last.name}, shading angle=${angle}`,
        shade: true,
        preCommands: '',
        postCommands: '',
      }
    }

    default:
      return { options: '', preCommands: '', postCommands: '' }
  }
}
