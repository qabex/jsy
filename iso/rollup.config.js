import pkg from './package.json'
import rpi_jsy from 'rollup-plugin-jsy'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'
// import rpi_commonjs from '@rollup/plugin-commonjs'


const pkg_name = (pkg.name || 'private').replace('-', '_')

const _cfg_ = {
  plugins: [
    rpi_dgnotify(),
    rpi_resolve(),  // Allow Node module resolution -- https://github.com/rollup/plugins/tree/master/packages/node-resolve#readme
    // rpi_commonjs(), // Allow CommonJS use -- https://github.com/rollup/plugins/tree/master/packages/commonjs#readme
  ],
  external: [],
}


const cfg_nodejs = { ..._cfg_,
  plugins: [
    rpi_jsy({defines: {PLAT_NODEJS: true}}),
    ... _cfg_.plugins ]}

const cfg_web = { ..._cfg_,
  plugins: [
    rpi_jsy({defines: {PLAT_WEB: true}}),
    ... _cfg_.plugins ]}

/// Allow Minification -- https://github.com/TrySound/rollup-plugin-terser
// import { terser as rpi_terser } from 'rollup-plugin-terser'
// const cfg_web_min = { ... cfg_web,
//   plugins: [ ... cfg_web.plugins, rpi_terser() ]}


export default [
  ... add_jsy('index', {name: pkg_name}),
  //... add_jsy('other module'),
]


function * add_jsy(src_name, opt={}) {
  const input = `code/${src_name}${opt.ext || '.jsy'}`
  //const module_name = opt.name || `${pkg_name}_${src_name}`

  if (cfg_nodejs)
    yield { ... cfg_nodejs, input, output: [
      //{ file: `cjs/${src_name}.cjs`, format: 'cjs', exports:opt.exports || 'named', sourcemap: true },
      { file: `esm/${src_name}.mjs`, format: 'es', sourcemap: true } ]}

  if (cfg_web)
    yield { ... cfg_web, input, output: [
      //{ file: `umd/${src_name}.js`, format: 'umd', name:module_name, exports:opt.exports || 'named', sourcemap: true },
      { file: `esm/web/${src_name}.mjs`, format: 'es', sourcemap: true } ]}

  if ('undefined' !== typeof cfg_web_min)
    yield { ... cfg_web_min, input, output: [
      //{ file: `umd/${src_name}.min.js`, format: 'umd', name:module_name, exports:opt.exports || 'named', sourcemap: false }
      { file: `esm/web/${src_name}.min.mjs`, format: 'es', sourcemap: false } ]}
}
