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

const LATEX_SIZE_COMMANDS = [
  { command: '\\tiny', pt: 5 },
  { command: '\\scriptsize', pt: 7 },
  { command: '\\footnotesize', pt: 8 },
  { command: '\\small', pt: 9 },
  { command: '\\normalsize', pt: 10 },
  { command: '\\large', pt: 12 },
  { command: '\\Large', pt: 14.4 },
  { command: '\\LARGE', pt: 17.28 },
  { command: '\\huge', pt: 20.74 },
  { command: '\\Huge', pt: 24.88 },
]

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

function parseFontSizePt(fontSize) {
  if (!fontSize) return null
  const match = fontSize.match(/([\d.]+)\s*pt/i)
  if (!match) return null
  const value = parseFloat(match[1])
  return Number.isFinite(value) ? value : null
}

function normalizeAlign(align) {
  if (!align) return null
  const value = align.trim().toLowerCase()
  if (value === 'center') return 'center'
  if (value === 'right') return 'right'
  if (value === 'left') return 'left'
  return 'unsupported'
}

function stripTags(text) {
  return text.replace(/<[^>]*>/g, '')
}

function hasVisibleText(text) {
  const decoded = decodeHtmlEntities(stripTags(text))
    .replace(/\x00NBSP\x00/g, ' ')
    .replace(/\s+/g, '')
  return decoded.length > 0
}

function detectUniformTextOptions(html) {
  const paragraphRe = /<p(?:\s+style="([^"]*)")?\s*>([\s\S]*?)<\/p>/g
  const paragraphs = []
  let paragraphMatch
  while ((paragraphMatch = paragraphRe.exec(html)) !== null) {
    paragraphs.push({
      style: parseStyle(paragraphMatch[1]),
      innerHtml: paragraphMatch[2],
    })
  }

  if (paragraphs.length === 0) {
    paragraphs.push({ style: {}, innerHtml: html })
  }

  let sawExplicitAlign = false
  let sawUnsupportedAlign = false
  let sawMissingAlign = false
  const alignValues = new Set()

  let sawExplicitFontSize = false
  let sawText = false
  let sawUnknownFontSize = false
  const fontSizes = new Set()

  const registerTextSegment = (segment, sizePt) => {
    if (!hasVisibleText(segment)) return
    sawText = true
    if (sizePt == null) {
      sawUnknownFontSize = true
      return
    }
    fontSizes.add(sizePt.toFixed(4))
  }

  for (const paragraph of paragraphs) {
    const align = normalizeAlign(paragraph.style['text-align'])
    if (paragraph.style['text-align']) {
      sawExplicitAlign = true
      if (align === 'unsupported') sawUnsupportedAlign = true
      else alignValues.add(align)
    } else if (hasVisibleText(paragraph.innerHtml)) {
      sawMissingAlign = true
    }

    const paragraphFontSize = parseFontSizePt(paragraph.style['font-size'])
    if (paragraphFontSize != null) sawExplicitFontSize = true

    const spanRe = /<span(?:\s+style="([^"]*)")?\s*>([\s\S]*?)<\/span>/g
    let lastIndex = 0
    let spanMatch
    while ((spanMatch = spanRe.exec(paragraph.innerHtml)) !== null) {
      if (spanMatch.index > lastIndex) {
        const before = paragraph.innerHtml.slice(lastIndex, spanMatch.index)
        registerTextSegment(before, paragraphFontSize)
      }

      const spanStyle = parseStyle(spanMatch[1])
      const spanFontSize = parseFontSizePt(spanStyle['font-size'])
      if (spanFontSize != null) sawExplicitFontSize = true
      registerTextSegment(spanMatch[2], spanFontSize ?? paragraphFontSize)

      lastIndex = spanMatch.index + spanMatch[0].length
    }

    if (lastIndex < paragraph.innerHtml.length) {
      registerTextSegment(paragraph.innerHtml.slice(lastIndex), paragraphFontSize)
    }
  }

  let uniformAlign = null
  if (sawExplicitAlign && !sawUnsupportedAlign && !sawMissingAlign && alignValues.size === 1) {
    uniformAlign = [...alignValues][0]
  }

  let uniformFontSizePt = null
  if (sawExplicitFontSize && sawText && !sawUnknownFontSize && fontSizes.size === 1) {
    uniformFontSizePt = parseFloat([...fontSizes][0])
  }

  return {
    uniformAlign,
    uniformFontSizePt,
    alignmentNeedsInlineFallback: sawExplicitAlign && uniformAlign == null,
    fontSizeNeedsInlineFallback: sawExplicitFontSize && uniformFontSizePt == null,
  }
}

export function mapPtToLatexSizeCommand(sizePt) {
  if (!Number.isFinite(sizePt)) return '\\normalsize'
  const EPSILON = 1e-9
  let best = LATEX_SIZE_COMMANDS[0]
  let bestDistance = Math.abs(sizePt - best.pt)
  for (const candidate of LATEX_SIZE_COMMANDS.slice(1)) {
    const distance = Math.abs(sizePt - candidate.pt)
    if (distance + EPSILON < bestDistance || (Math.abs(distance - bestDistance) <= EPSILON && candidate.pt > best.pt)) {
      best = candidate
      bestDistance = distance
    }
  }
  return best.command
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
  if (options.inlineFontSize !== false && fontSize) {
    const size = parseFontSizePt(fontSize)
    if (size != null) {
      const skip = (size * 1.2).toFixed(1)
      result = `{\\fontsize{${size}}{${skip}}\\selectfont ${result}}`
    }
  }

  return result
}

function processSpans(html, registry, options = {}) {
  let result = ''
  const spanRe = /<span(?:\s+style="([^"]*)")?\s*>([\s\S]*?)<\/span>/g
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
  const liRe = /<li(?:\s+style="([^"]*)")?\s*>([\s\S]*?)<\/li>/g
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
  if (!html) return { content: '', nodeTextOptions: [], usesInlineFormatting: false }

  const styleDetection = detectUniformTextOptions(html)
  const inlineOptions = {
    ...options,
    inlineParagraphAlignment: styleDetection.uniformAlign == null,
    inlineFontSize: styleDetection.uniformFontSizePt == null,
  }

  const nodeTextOptions = []
  if (styleDetection.uniformAlign) {
    nodeTextOptions.push(`align=${styleDetection.uniformAlign}`)
  }
  if (styleDetection.uniformFontSizePt != null) {
    nodeTextOptions.push(`font=${mapPtToLatexSizeCommand(styleDetection.uniformFontSizePt)}`)
  }

  const blocks = []

  // Check for list wrappers
  const listWrapperRe = /<(ul|ol)>([\s\S]*?)<\/\1>/g
  let listMatch
  const processedRanges = []

  while ((listMatch = listWrapperRe.exec(html)) !== null) {
    processedRanges.push({
      start: listMatch.index,
      end: listMatch.index + listMatch[0].length,
      content: processListBlock(listMatch[2], listMatch[1], registry, inlineOptions),
    })
  }

  if (processedRanges.length > 0) {
    let pos = 0
    for (const range of processedRanges) {
      const before = html.slice(pos, range.start)
      if (before.trim()) {
        blocks.push(...processParagraphs(before, registry, inlineOptions))
      }
      blocks.push(range.content)
      pos = range.end
    }
    const after = html.slice(pos)
    if (after.trim()) {
      blocks.push(...processParagraphs(after, registry, inlineOptions))
    }
  } else {
    blocks.push(...processParagraphs(html, registry, inlineOptions))
  }

  return {
    content: blocks.join('\n'),
    nodeTextOptions,
    usesInlineFormatting: styleDetection.alignmentNeedsInlineFallback || styleDetection.fontSizeNeedsInlineFallback,
  }
}

function processParagraphs(html, registry, options = {}) {
  const blocks = []
  const pRe = /<p(?:\s+style="([^"]*)")?\s*>([\s\S]*?)<\/p>/g
  let match

  while ((match = pRe.exec(html)) !== null) {
    const style = parseStyle(match[1])
    const content = processSpans(match[2], registry, options)
    const align = style['text-align']

    if (options.inlineParagraphAlignment !== false && align === 'center') {
      blocks.push(`{\\centering ${content}\\par}`)
    } else if (options.inlineParagraphAlignment !== false && align === 'right') {
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
