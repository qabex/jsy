import rpi_jsy from 'rollup-plugin-jsy-lite'

const configs = []
export default configs

const sourcemap = true
const external = []
const plugins = [rpi_jsy()]

// Allow Node module resolution -- https://github.com/rollup/plugins/tree/master/packages/node-resolve#readme
/// import rpi_resolve from '@rollup/plugin-node-resolve'
/// plugins.push(rpi_resolve())


add_jsy('bench_this')


function add_jsy(src_name, module_name) {
  if (!module_name) module_name = src_name

  configs.push({
    input: `${src_name}.jsy`,
    output: [
      { file: `cjs/${src_name}.cjs`, format: 'cjs', exports:'named', sourcemap },
      { file: `iife/${src_name}.js`, format: 'iife', name: module_name, exports:'named', sourcemap },
    ],
    plugins, external })
}
