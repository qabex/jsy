import rpi_jsy from 'rollup-plugin-jsy'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
// import rpi_resolve from '@rollup/plugin-node-resolve'
// import rpi_commonjs from '@rollup/plugin-commonjs'

const _cfg_ = {
  plugins: [
    rpi_dgnotify(),
    // rpi_resolve(),  // Allow Node module resolution -- https://github.com/rollup/plugins/tree/master/packages/node-resolve#readme
    // rpi_commonjs(), // Allow CommonJS use -- https://github.com/rollup/plugins/tree/master/packages/commonjs#readme

    rpi_jsy({defines:{}}),
  ],
  external: [],
}

export default [
  ... add_jsy('bench_this'),
]


function * add_jsy(src_name, module_name) {
  yield { ..._cfg_,
    input: `${src_name}.jsy`,
    output: [
      { file: `cjs/${src_name}.cjs`, format: 'cjs', sourcemap: true },
      { file: `iife/${src_name}.js`, format: 'iife', name: src_name, sourcemap: true },
    ]}
}
