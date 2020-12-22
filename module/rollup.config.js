import {builtinModules} from 'module'
import rpi_jsy from 'rollup-plugin-jsy'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'
// import rpi_commonjs from '@rollup/plugin-commonjs'
// import { terser as rpi_terser } from 'rollup-plugin-terser'


const _cfg_ = {
  external: id => builtinModules.includes(id),
  plugins: [
    rpi_dgnotify(),
    rpi_resolve(),
    // rpi_commonjs(), // Allow CommonJS use -- https://github.com/rollup/plugins/tree/master/packages/commonjs#readme

    rpi_jsy({defines:{}}),
  ]}

/// Allow Minification -- https://github.com/TrySound/rollup-plugin-terser
// import { terser as rpi_terser } from 'rollup-plugin-terser'
// const _cfg_min_ = { ... _cfg_,
//   plugins: [ ... _cfg_.plugins, rpi_terser() ]}


export default [
  ... add_jsy('index'),
]



function * add_jsy(src_name, opt={}) {
  const input = `code/${src_name}${opt.ext || '.jsy'}`

  yield { ..._cfg_, input,
    output: { file: `esm/${src_name}.mjs`, format: 'es', sourcemap: true }}

  if ('undefined' !== typeof _cfg_min_)
    yield { ... _cfg_min_, input,
      output: { file: `esm/${src_name}.min.mjs`, format: 'es', sourcemap: false }}
}
