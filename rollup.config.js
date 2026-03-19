import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

const onwarn = warning => {
  if (warning.code === 'CIRCULAR_DEPENDENCY') return
  console.warn(`(!) ${warning.message}`)
}

export default [
  // Library build (ESM + CJS) — browser-compatible, all deps bundled
  {
    input: 'src/index.js',
    onwarn,
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({ preferBuiltins: false, browser: true }),
      commonjs(),
      json(),
    ],
  },
  // CLI build — Node.js, npm deps kept external
  {
    input: 'bin/pptx2tikz.js',
    onwarn,
    external: id => !id.startsWith('.') && !id.startsWith('/') && !id.endsWith('pptx2tikz.js'),
    output: {
      file: 'dist/pptx2tikz.js',
      format: 'es',
      banner: '#!/usr/bin/env node',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      json(),
    ],
  },
]
