import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const cwd = process.cwd()

test('e2e: examples/text.pptx slide 1 matches expected conversion', () => {
  const actual = execFileSync('node', ['dist/pptx2tikz.js', 'examples/text.pptx', '--slides', '1'], {
    cwd,
    encoding: 'utf8',
  })

  const expectedPath = path.join(cwd, 'tests', 'fixtures', 'text-slide1.expected.tex')
  const expected = readFileSync(expectedPath, 'utf8')

  assert.equal(actual, expected)
})
