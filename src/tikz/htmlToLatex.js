const LATEX_SPECIAL = /[&%$#_{}~^\\]/g
const SPECIAL_MAP = {
  '&': '\\&',
  '%': '\\%',
  '$': '\\$',
  '#': '\\#',
  '_': '\\_',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
  '\\': '\\textbackslash{}',
}

function escapeLatex(text) {
  return text.replace(LATEX_SPECIAL, ch => SPECIAL_MAP[ch])
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, '\x00NBSP\x00')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function restoreNbsp(text) {
  return text.replace(/\x00NBSP\x00/g, '~')
}

function parseStyle(styleStr) {
  const props = {}
  if (!styleStr) return props
  for (const part of styleStr.split(';')) {
    const colonIdx = part.indexOf(':')
    if (colonIdx === -1) continue
    const key = part.slice(0, colonIdx).trim()
    const val = part.slice(colonIdx + 1).trim()
    if (key && val) props[key] = val
  }
  return props
}

function wrapWithFormatting(text, style, registry, options = {}) {
  let result = text

  if (style['vertical-align'] === 'super') {
    result = `\\textsuperscript{${result}}`
  } else if (style['vertical-align'] === 'sub') {
    result = `\\textsubscript{${result}}`
  }

  if (style['text-decoration'] === 'underline') {
    result = `\\underline{${result}}`
  }
  if (style['text-decoration-line'] === 'line-through') {
    result = `\\sout{${result}}`
  }

  if (style['font-weight'] === 'bold') {
    result = `\\textbf{${result}}`
  }
  if (style['font-style'] === 'italic') {
    result = `\\textit{${result}}`
  }

  const color = style['color']
  if (color && color.startsWith('#')) {
    if (options.xcolorRgbConvert && registry) {
      const converted = registry.register(color)
      if (converted) result = `\\textcolor{${converted.name}}{${result}}`
      else {
        const hex = color.replace('#', '').toUpperCase().slice(0, 6)
        result = `\\textcolor[HTML]{${hex}}{${result}}`
      }
    } else {
      const hex = color.replace('#', '').toUpperCase().slice(0, 6)
      result = `\\textcolor[HTML]{${hex}}{${result}}`
    }
  }

  const fontSize = style['font-size']
  if (fontSize) {
    const match = fontSize.match(/([\d.]+)pt/)
    if (match) {
      const size = parseFloat(match[1])
      const skip = (size * 1.2).toFixed(1)
      result = `{\\fontsize{${size}}{${skip}}\\selectfont ${result}}`
    }
  }

  return result
}

function processSpans(html, registry, options = {}) {
  let result = ''
  const spanRe = /<span\s+style="([^"]*)">([\s\S]*?)<\/span>/g
  let lastIndex = 0
  let match

  while ((match = spanRe.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const between = html.slice(lastIndex, match.index)
      result += restoreNbsp(escapeLatex(decodeHtmlEntities(between)))
    }

    const style = parseStyle(match[1])
    const innerHtml = match[2]

    const linkMatch = innerHtml.match(/<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/)
    if (linkMatch) {
      const url = linkMatch[1]
      const linkText = restoreNbsp(escapeLatex(decodeHtmlEntities(linkMatch[2])))
      const formatted = wrapWithFormatting(`\\href{${url}}{${linkText}}`, style, registry, options)
      result += formatted
    } else {
      const plainText = restoreNbsp(escapeLatex(decodeHtmlEntities(innerHtml)))
      result += wrapWithFormatting(plainText, style, registry, options)
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < html.length) {
    result += restoreNbsp(escapeLatex(decodeHtmlEntities(html.slice(lastIndex))))
  }

  return result
}

function processListBlock(html, listTag, registry, options = {}) {
  const items = []
  const liRe = /<li\s+style="([^"]*)">([\s\S]*?)<\/li>/g
  let match
  while ((match = liRe.exec(html)) !== null) {
    items.push(processSpans(match[2], registry, options))
  }

  const env = listTag === 'ol' ? 'enumerate' : 'itemize'
  const lines = [`\\begin{${env}}`]
  for (const item of items) {
    lines.push(`  \\item ${item}`)
  }
  lines.push(`\\end{${env}}`)
  return lines.join('\n')
}

export function htmlToLatex(html, registry, options = {}) {
  if (!html) return ''

  const blocks = []

  const blockRe = /<(p|ul|ol|li)\s*(?:style="([^"]*)")?\s*>([\s\S]*?)<\/\1>/g
  let match
  let lastIndex = 0

  // Check for list wrappers
  const listWrapperRe = /<(ul|ol)>([\s\S]*?)<\/\1>/g
  let listMatch
  const processedRanges = []

  while ((listMatch = listWrapperRe.exec(html)) !== null) {
    processedRanges.push({
      start: listMatch.index,
      end: listMatch.index + listMatch[0].length,
      content: processListBlock(listMatch[2], listMatch[1], registry, options),
    })
  }

  if (processedRanges.length > 0) {
    let pos = 0
    for (const range of processedRanges) {
      const before = html.slice(pos, range.start)
      if (before.trim()) {
        blocks.push(...processParagraphs(before, registry, options))
      }
      blocks.push(range.content)
      pos = range.end
    }
    const after = html.slice(pos)
    if (after.trim()) {
      blocks.push(...processParagraphs(after, registry, options))
    }
  } else {
    blocks.push(...processParagraphs(html, registry, options))
  }

  return blocks.join('\n')
}

function processParagraphs(html, registry, options = {}) {
  const blocks = []
  const pRe = /<p\s+style="([^"]*)">([\s\S]*?)<\/p>/g
  let match

  while ((match = pRe.exec(html)) !== null) {
    const style = parseStyle(match[1])
    const content = processSpans(match[2], registry, options)
    const align = style['text-align']

    if (align === 'center') {
      blocks.push(`{\\centering ${content}\\par}`)
    } else if (align === 'right') {
      blocks.push(`{\\raggedleft ${content}\\par}`)
    } else {
      blocks.push(content)
    }
  }

  if (blocks.length === 0 && html.trim()) {
    blocks.push(restoreNbsp(escapeLatex(decodeHtmlEntities(html.replace(/<[^>]*>/g, '')))))
  }

  return blocks
}
