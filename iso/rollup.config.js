import pkg from './package.json'
import rpi_jsy from 'rollup-plugin-jsy'
// import rpi_dgnotify from '@rollup-plugin-dgnotify'
// import rpi_resolve from '@rollup/plugin-node-resolve'
// import rpi_commonjs from '@rollup/plugin-commonjs'


const pkg_name = (pkg.name || 'private').replace('-', '_')

const _cfg_ = {
  plugins: [
    // rpi_dgnotify(),
    // rpi_resolve(),  // Allow Node module resolution -- https://github.com/rollup/plugins/tree/master/packages/node-resolve#readme
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
// const cfg_web_min = { ... _cfg_,
//   plugins: [ ... _cfg_.plugins, rpi_terser() ]}


const _out_ = { sourcemap: true }

const configs = []
export default configs


add_jsy('index', {name: pkg_name})
//add_jsy('other module')


function add_jsy(src_name, opt={}) {
  const module_name = opt.name || `${pkg_name}_${src_name}`

  if (cfg_nodejs)
    configs.push({ ... cfg_nodejs,
      input: `code/${src_name}.jsy`,
      output: [
        { ..._out_, file: `cjs/${src_name}.cjs`, format: 'cjs', exports:'named' },
        { ..._out_, file: `esm/${src_name}.mjs`, format: 'es' } ]})

  if (cfg_nodejs)
    configs.push({ ... cfg_nodejs,
      input: `code/${src_name}.jsy`,
      output: [
        { ..._out_, file: `umd/${src_name}.js`, format: 'umd', name:module_name, exports:'named' },
        { ..._out_, file: `esm/web/${src_name}.js`, format: 'es' } ]})

  if ('undefined' !== typeof cfg_web_min)
    configs.push({ ... cfg_web_min,
      input: `code/${src_name}.jsy`,
      output: { ..._out_, file: `umd/${src_name}.min.js`, format: 'umd', name:module_name, exports:'named', sourcemap: false }})
}
