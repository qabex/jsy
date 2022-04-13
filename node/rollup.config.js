import {builtinModules} from 'module'
import rpi_jsy from 'rollup-plugin-jsy'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'

import pkg from './package.json' // allow use of Node CommonJS modules without Rollup in the middle
pkg.dependencies ||= {} // ensure a dependencies dict

const _rpis_ = (defines, ...args) => [
  rpi_jsy({defines}),
  rpi_resolve(),
  ...args,
  rpi_dgnotify()]


const _cfg_ = {
  external: id => (
       /^\w*:/.test(id)
    || builtinModules.includes(id)
    || !! pkg.dependencies[id] // allow use of Node CommonJS modules without Rollup in the middle
    ),
  plugins: _rpis_({}) }


export default [
  ... add_jsy('index'),
]



function * add_jsy(src_name, opt={}) {
  const input = `code/${src_name}${opt.ext || '.jsy'}`

  yield { ..._cfg_, input, output: [
      { file: `esm/${src_name}.mjs`, format: 'es', sourcemap: true },
      // { file: `cjs/${src_name}.cjs`, format: 'cjs', sourcemap: true },
    ].filter(Boolean)}

}
