import rpi_resolve from '@rollup/plugin-node-resolve'
import rpi_jsy from '@jsy-lang/jsy/esm/rollup.js'
import rpi_terser from '@rollup/plugin-terser'

const external = id => /^\w*:/.test(id)
const _rpis_ = [
  rpi_jsy(),
  rpi_resolve(),
]

let is_watch = process.argv.includes('--watch')
const _rpi_min_ = is_watch ? null : [ rpi_terser() ]


export default [
  ... add_jsy('index'),
]


function * add_jsy(src_name) {
  yield { input: `code/${src_name}.jsy`,
    plugins_: _rpis_,
    external,
    output: [
      { file: `esm/${src_name}.js`, format: 'es', sourcemap: true },
      _rpi_min_ &&
        { plugins: _rpi_min_, file: `esm/${out_name}.min.js`, format: 'es', sourcemap: true },
    ].filter(Boolean)}
}
