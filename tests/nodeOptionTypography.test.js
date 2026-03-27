import assert from 'node:assert/strict'
import test from 'node:test'

import { htmlToLatex, mapPtToLatexSizeCommand } from '../src/tikz/htmlToLatex.js'
import { renderText } from '../src/tikz/renderers/text.js'
import { renderShape } from '../src/tikz/renderers/shape.js'
import { renderTable } from '../src/tikz/renderers/table.js'

const registry = {
  register: () => ({ name: 'mockColor', opacity: 1 }),
}

test('mapPtToLatexSizeCommand uses nearest command and ties upward', () => {
  assert.equal(mapPtToLatexSizeCommand(10), '\\normalsize')
  assert.equal(mapPtToLatexSizeCommand(8.5), '\\small')
  assert.equal(mapPtToLatexSizeCommand(13.2), '\\Large')
  assert.equal(mapPtToLatexSizeCommand(17.28), '\\LARGE')
})

test('htmlToLatex promotes uniform center alignment and font size to node options', () => {
  const html = '<p style="text-align:center"><span style="font-size:9pt">Hello</span></p>'
  const result = htmlToLatex(html, registry)

  assert.deepEqual(result.nodeTextOptions, ['align=center', 'font=\\small'])
  assert.equal(result.content, 'Hello')
  assert.equal(result.usesInlineFormatting, false)
  assert.equal(result.content.includes('\\centering'), false)
  assert.equal(result.content.includes('\\fontsize'), false)
})

test('htmlToLatex keeps inline paragraph alignment when alignments are mixed', () => {
  const html = '<p style="text-align:center">A</p><p style="text-align:right">B</p>'
  const result = htmlToLatex(html, registry)

  assert.equal(result.nodeTextOptions.some(opt => opt.startsWith('align=')), false)
  assert.equal(result.content.includes('\\centering'), true)
  assert.equal(result.content.includes('\\raggedleft'), true)
  assert.equal(result.usesInlineFormatting, true)
})

test('htmlToLatex keeps inline font sizes when span font sizes are mixed', () => {
  const html = '<p style="text-align:left"><span style="font-size:9pt">A</span><span style="font-size:12pt">B</span></p>'
  const result = htmlToLatex(html, registry)

  assert.equal(result.nodeTextOptions.some(opt => opt.startsWith('font=')), false)
  assert.equal(result.content.includes('\\fontsize{9}{10.8}\\selectfont'), true)
  assert.equal(result.content.includes('\\fontsize{12}{14.4}\\selectfont'), true)
  assert.equal(result.usesInlineFormatting, true)
})

test('renderText includes promoted node text options', () => {
  const element = {
    content: '<p style="text-align:center"><span style="font-size:9pt">Hello</span></p>',
    left: 0,
    top: 0,
    width: 100,
    height: 20,
  }

  const tikz = renderText(element, registry, { slideHeight: 100 })
  assert.match(tikz, /align=center/)
  assert.match(tikz, /font=\\small/)
  assert.doesNotMatch(tikz, /\\centering/)
  assert.doesNotMatch(tikz, /\\fontsize/)
})

test('renderShape includes promoted node text options', () => {
  const element = {
    shapType: 'rect',
    content: '<p style="text-align:right"><span style="font-size:12pt">Hello</span></p>',
    left: 0,
    top: 0,
    width: 100,
    height: 50,
  }

  const tikz = renderShape(element, registry, { slideHeight: 100 })
  assert.match(tikz, /align=right/)
  assert.match(tikz, /font=\\large/)
  assert.doesNotMatch(tikz, /\\raggedleft/)
  assert.doesNotMatch(tikz, /\\fontsize/)
})

test('renderTable includes promoted node text options', () => {
  const element = {
    left: 0,
    top: 0,
    colWidths: [50],
    rowHeights: [20],
    data: [[{ text: '<p style="text-align:center"><span style="font-size:9pt">Cell</span></p>' }]],
  }

  const tikz = renderTable(element, registry, { slideHeight: 100 })
  assert.match(tikz, /align=center/)
  assert.match(tikz, /font=\\small/)
  assert.doesNotMatch(tikz, /\\centering/)
  assert.doesNotMatch(tikz, /\\fontsize/)
})
