import rpi_resolve from '@rollup/plugin-node-resolve'
import rpi_jsy from '@jsy-lang/jsy/esm/rollup.js'

const external = id => /^\w*:/.test(id)
const _rpis_ = [
  rpi_jsy(),
  rpi_resolve(),
]

let is_watch = process.argv.includes('--watch')


export default [
  ... add_jsy('index'),
]


function * add_jsy(src_name) {
  yield { input: `code/${src_name}.jsy`,
    plugins: _rpis_,
    external,
    output: [
      { file: `esm/${src_name}.js`, format: 'es', sourcemap: true },
    ].filter(Boolean)}
}
