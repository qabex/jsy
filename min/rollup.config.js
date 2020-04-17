import pkg from './package.json'
import rpi_jsy from 'rollup-plugin-jsy'
// import rpi_dgnotify from '@rollup-plugin-dgnotify'
// import rpi_resolve from '@rollup/plugin-node-resolve'
// import rpi_commonjs from '@rollup/plugin-commonjs'

const _cfg_ = {
  plugins: [
    // rpi_dgnotify(),
    // rpi_resolve(),  // Allow Node module resolution -- https://github.com/rollup/plugins/tree/master/packages/node-resolve#readme
    // rpi_commonjs(), // Allow CommonJS use -- https://github.com/rollup/plugins/tree/master/packages/commonjs#readme

    rpi_jsy({defines:{}}),
  ],
  external: [],
}

/// Allow Minification -- https://github.com/TrySound/rollup-plugin-terser
// import { terser as rpi_terser } from 'rollup-plugin-terser'
// const cfg_web_min = { ... _cfg_,
//   plugins: [ ... _cfg_.plugins, rpi_terser() ]}

const _out_ = { sourcemap: true }


export default { ..._cfg_,
  input: `code/index.jsy`,
  output: [
    { ..._out_, file: pkg.module, format: 'es' },
    { ..._out_, file: pkg.main, format: 'cjs', exports:'default' },
  ]}

