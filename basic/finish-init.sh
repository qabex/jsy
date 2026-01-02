#!/bin/sh

npm install --save-dev \
  rollup \
  @rollup/plugin-node-resolve \
  @rollup/plugin-terser \
  @jsy-lang/jsy

echo "You may now remove '$0'"

