import { pt2cm } from './transform.js'

export function svgPathToTikz(pathStr, offsetX = 0, offsetY = 0, slideHeight = null) {
  if (!pathStr) return ''

  const fy = slideHeight !== null ? y => slideHeight - y : y => y

  const segments = parseSvgPath(pathStr)
  const parts = []

  for (const { cmd, coords } of segments) {
    switch (cmd) {
      case 'M':
        parts.push(`(${pt2cm(coords[0] + offsetX)},${pt2cm(fy(coords[1] + offsetY))})`)
        break
      case 'L':
        parts.push(`-- (${pt2cm(coords[0] + offsetX)},${pt2cm(fy(coords[1] + offsetY))})`)
        break
      case 'C':
        parts.push(
          `.. controls (${pt2cm(coords[0] + offsetX)},${pt2cm(fy(coords[1] + offsetY))}) and (${pt2cm(coords[2] + offsetX)},${pt2cm(fy(coords[3] + offsetY))}) .. (${pt2cm(coords[4] + offsetX)},${pt2cm(fy(coords[5] + offsetY))})`
        )
        break
      case 'Q':
        parts.push(
          `.. controls (${pt2cm(coords[0] + offsetX)},${pt2cm(fy(coords[1] + offsetY))}) .. (${pt2cm(coords[2] + offsetX)},${pt2cm(fy(coords[3] + offsetY))})`
        )
        break
      case 'Z':
        parts.push('-- cycle')
        break
    }
  }

  return parts.join(' ')
}

// Parse SVG path into segments, each with a command letter and flat array of numbers.
// Handles coordinates separated by spaces, commas, or sign changes.
function parseSvgPath(pathStr) {
  // Match command letters or individual numbers (including scientific notation)
  const re = /([MLCQZmlcqz])|(-?(?:\d*\.)?\d+(?:[eE][+-]?\d+)?)/g
  const tokens = []
  let match
  while ((match = re.exec(pathStr)) !== null) {
    tokens.push(match[0])
  }

  const coordCounts = { M: 2, L: 2, C: 6, Q: 4, Z: 0 }
  const segments = []
  let i = 0

  while (i < tokens.length) {
    const token = tokens[i]
    if (/^[MLCQZmlcqz]$/.test(token)) {
      const cmd = token.toUpperCase()
      const needed = coordCounts[cmd] ?? 0
      i++
      if (needed === 0) {
        segments.push({ cmd, coords: [] })
      } else {
        const nums = []
        while (nums.length < needed && i < tokens.length && !/^[MLCQZmlcqz]$/.test(tokens[i])) {
          nums.push(parseFloat(tokens[i++]))
        }
        if (nums.length === needed) {
          segments.push({ cmd, coords: nums })
        }
      }
    } else {
      i++ // skip unexpected token
    }
  }

  return segments
}
