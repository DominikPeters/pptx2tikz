import { rgbToXcolorExpression } from 'xcolor-rgb-convert'

export class ColorRegistry {
  constructor(options = {}) {
    this.colors = new Map()
    this.counter = 0
    this.options = options || {}
  }

  register(hex) {
    if (!hex) return null
    let clean = hex.replace('#', '').toUpperCase()
    // Expand 3-char hex to 6-char
    if (clean.length === 3) {
      clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2]
    }
    if (clean.length < 6) return null

    const rgb6 = clean.slice(0, 6)
    const alpha = clean.length === 8 ? parseInt(clean.slice(6, 8), 16) / 255 : 1

    if (this.options.xcolorRgbConvert) {
      try {
        const r = parseInt(rgb6.slice(0, 2), 16)
        const g = parseInt(rgb6.slice(2, 4), 16)
        const b = parseInt(rgb6.slice(4, 6), 16)
        const converted = rgbToXcolorExpression({ r, g, b }, { mode: 'release' })
        if (converted?.expression) {
          return { name: converted.expression, opacity: alpha }
        }
      } catch (err) {
        // Fall back to named color registration below if conversion fails.
      }
    }

    if (!this.colors.has(rgb6)) {
      const name = `clr${this.counter++}`
      this.colors.set(rgb6, { name, model: 'HTML', value: rgb6 })
    }
    return { name: this.colors.get(rgb6).name, opacity: alpha }
  }

  getDefinitions() {
    const lines = []
    for (const [, color] of this.colors) {
      if (color.model === 'xcolor') {
        lines.push(`\\colorlet{${color.name}}{${color.value}}`)
      } else {
        lines.push(`\\definecolor{${color.name}}{HTML}{${color.value}}`)
      }
    }
    return lines.join('\n')
  }
}

export function hexToTikzColor(hex, registry) {
  if (!hex) return null
  return registry.register(hex)
}
