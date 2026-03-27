import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import test from 'node:test'

const cwd = process.cwd()

test('e2e: --no-images keeps SVG conversion for graphics.pptx', () => {
  const tex = execFileSync('node', ['dist/pptx2tikz.js', 'examples/graphics.pptx', '--slides', '1', '--no-images'], {
    cwd,
    encoding: 'utf8',
  })

  assert.match(tex, /use as bounding box/)
  assert.match(tex, /begin\{scope\}\[shift=/)
  assert.doesNotMatch(tex, /\\resizebox/)
  assert.doesNotMatch(tex, /\[Image\]/)
})
