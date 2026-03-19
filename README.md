# pptx2tikz

Convert PowerPoint (`.pptx`) slides to TikZ/LaTeX. Works as a command-line tool and as a JavaScript library (Node.js and browser).

Built on top of [pptxtojson](https://github.com/pipipi-pikachu/pptxtojson) with extensions for SVG extraction, math color/font parsing, and GVML clipboard support.

## Installation

```bash
npm install pptx2tikz
```

## CLI usage

```bash
npx pptx2tikz slides.pptx                        # convert slide 1
npx pptx2tikz slides.pptx -s 3                   # convert slide 3
npx pptx2tikz slides.pptx -a                      # convert all slides
npx pptx2tikz slides.pptx --pdf output.pdf        # convert all and compile to PDF
npx pptx2tikz slides.pptx -s 2 -o slide2.tex     # specify output file
```

### CLI options

| Option | Description |
|---|---|
| `-s, --slide <n>` | Slide number to convert (default: 1) |
| `-a, --all` | Convert all slides, each into its own subfolder |
| `--pdf <file>` | Convert all slides, compile, and stitch into one PDF |
| `-o, --output <file>` | Output `.tex` file (default: `output.tex`) |
| `--out-dir <dir>` | Output directory for `--all` mode (default: `slides/`) |
| `--no-images` | Replace images with placeholder boxes |
| `--image-dir <dir>` | Image output directory (default: `images/`) |
| `--compile` | Run `pdflatex` after converting |
| `--include-layout` | Include layout/master slide elements |
| `--save-svgs <dir>` | Save extracted SVG files to `<dir>` for inspection |
| `--xcolor-rgb-convert` | Convert colors to xcolor expressions |

The `--pdf` and `--compile` options require `pdflatex` to be installed and on your PATH.

## Library usage

### Node.js

```js
import { parse, convertSlideToTikZ } from 'pptx2tikz'
import { installNodeSvgEnvironment } from 'svg2tikz/node-env'
import { readFileSync, writeFileSync } from 'fs'

installNodeSvgEnvironment() // required in Node for SVG-to-TikZ conversion

const buffer = readFileSync('slides.pptx')
const result = await parse(buffer.buffer)

const { tex, images } = convertSlideToTikZ(result.slides[0], result.size)
writeFileSync('slide.tex', tex)
```

### Browser

```js
import { parse, convertSlideToTikZ } from 'pptx2tikz'

const file = /* File from <input type="file"> */
const buffer = await file.arrayBuffer()
const result = await parse(buffer)

const { tex, images } = convertSlideToTikZ(result.slides[0], result.size)
console.log(tex)
```

### `convertSlideToTikZ(slide, size, options?)`

| Option | Type | Description |
|---|---|---|
| `noImages` | `boolean` | Replace images with placeholder boxes |
| `imageDir` | `string` | Directory prefix for `\includegraphics` paths (default: `"images"`) |
| `includeLayoutElements` | `boolean` | Include layout/master slide elements |
| `xcolorRgbConvert` | `boolean` | Convert colors to xcolor expressions |

Returns `{ tex, images }` where `tex` is the full LaTeX document string and `images` is an array of `{ filename, base64data, ext }` objects for any raster images referenced by `\includegraphics`.

### `parse(arrayBuffer)`

Parses a `.pptx` file. Returns:

```js
{
  slides: [{ elements, layoutElements, fill, note, transition }],
  size: { width, height },   // in points
  themeColors: ['#...', ...]
}
```

### `parseClipboardGVML(arrayBuffer)`

Parses a GVML clipboard ZIP (the format used when copying shapes from PowerPoint). Returns the same structure as `parse`, with a single slide.

## Output format

Each slide is output as a self-contained LaTeX document using the `standalone` document class with a single `tikzpicture` environment. The slide dimensions are preserved in centimeters.

SVG images embedded in the `.pptx` are converted to native TikZ commands using [svg2tikz](https://github.com/xyz-fish/svg2tikz). Raster images (PNG, JPEG) are saved as separate files and included via `\includegraphics`.

## Updating the pptxtojson dependency

This repo vendors [pptxtojson](https://github.com/pipipi-pikachu/pptxtojson) as a git subtree under `pptxtojson/`. To pull in upstream updates:

```bash
git subtree pull --prefix=pptxtojson https://github.com/pipipi-pikachu/pptxtojson.git master --squash
```

## License

MIT
