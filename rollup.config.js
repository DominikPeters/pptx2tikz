import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const onwarn = warning => {
  if (warning.code === 'CIRCULAR_DEPENDENCY') return
  console.warn(`(!) ${warning.message}`)
}

const plugins = [
  nodeResolve({ preferBuiltins: true }),
  commonjs(),
]

export default [
  // Library build (ESM + CJS)
  {
    input: 'src/index.js',
    onwarn,
    external: ['jszip', 'svg2tikz', 'tinycolor2', 'txml', 'xcolor-rgb-convert'],
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
    plugins,
  },
  // CLI build (standalone, dependencies bundled)
  {
    input: 'bin/pptx2tikz.js',
    onwarn,
    output: {
      file: 'dist/pptx2tikz.js',
      format: 'es',
      banner: '#!/usr/bin/env node',
      sourcemap: true,
    },
    plugins,
  },
]
