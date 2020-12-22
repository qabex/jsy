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


const configs = []
export default configs


add_jsy('index')



function add_jsy(src_name, opt={}) {
  const input = `code/${src_name}${opt.ext || '.jsy'}`
  //const module_name = opt.name || `${pkg_name}_${src_name}`

  configs.push({ ..._cfg_, input, output: [
    { file: `esm/${src_name}.mjs`, format: 'es', sourcemap: true },
    //{ file: `cjs/${src_name}.cjs`, format: 'cjs', exports: opt.exports || 'named', sourcemap: true },
    //{ file: `umd/${src_name}.js`, format: 'umd', name:module_name, exports: opt.exports || 'named', sourcemap: true },
  ]})

  if ('undefined' !== typeof _cfg_min_)
    configs.push({ ... _cfg_min_, input, output: [
      //{ file: `umd/${src_name}.min.js`, format: 'umd', name:module_name, exports:opt.exports || 'named', sourcemap: false }
      { file: `esm/${src_name}.min.mjs`, format: 'es', sourcemap: false } ]})
}
