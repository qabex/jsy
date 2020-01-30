import rpi_jsy from 'rollup-plugin-jsy-lite'

const configs = []
export default configs

const sourcemap = true
const external = []
const plugins = [rpi_jsy()]

// Allow Node module resolution -- https://github.com/rollup/plugins/tree/master/packages/node-resolve#readme
/// import rpi_resolve from '@rollup/plugin-node-resolve'
/// plugins.push(rpi_resolve())


add_jsy('index')


function add_jsy(name) {
  configs.push({
    input: `code/${name}.jsy`,
    output: [
      { file: `cjs/${name}.js`, format: 'cjs', exports:'named', sourcemap },
      { file: `umd/${name}.js`, format: 'umd', name, exports:'named', sourcemap },
      { file: `esm/${name}.mjs`, format: 'es', sourcemap },
    ],
    plugins, external })
}
