import {builtinModules} from 'module'
import rpi_jsy from 'rollup-plugin-jsy'
import rpi_dgnotify from 'rollup-plugin-dgnotify'
import rpi_resolve from '@rollup/plugin-node-resolve'
// import { terser as rpi_terser } from 'rollup-plugin-terser' // if you want minification

import pkg from './package.json' // allow use of Node CommonJS modules without Rollup in the middle
if (0 !== Object.entries(pkg.dependencies ||= {}).length) {
  // Remove this warning block when making a NodeJS-only library.
  // If making an ES6 targeted library for Browser/Deno/NodeJS, it should likely be moved to devDependencies.
  console.warn('[WARN:Rollup Config] pkg.dependencies detected -- problematic for ES6 browser-only libraries. Please tailor rollup.config.js to reflect your intentions')
}

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


// Allow Minification -- https://github.com/TrySound/rollup-plugin-terser
const _cfg_min_ = 'undefined'===typeof rpi_terser ? null
  : { ... _cfg_, plugins: [ ... _cfg_.plugins, rpi_terser() ]}


export default [
  ... add_jsy('index'),
]



function * add_jsy(src_name, opt={}) {
  const input = `code/${src_name}${opt.ext || '.jsy'}`

  yield { ..._cfg_, input, output: [
      { file: `esm/${src_name}.mjs`, format: 'es', sourcemap: true },
      // { file: `cjs/${src_name}.cjs`, format: 'cjs', sourcemap: true },
    ].filter(Boolean)}

  if (_cfg_min_)
    yield { ... _cfg_min_, input, output: [
        { file: `esm/${src_name}.min.mjs`, format: 'es', sourcemap: false },
      ].filter(Boolean)}
}
