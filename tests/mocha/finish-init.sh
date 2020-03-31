#!/bin/sh

# npm install --save-dev @rollup/plugin-commonjs

npm install --save-dev \
  rollup @rollup/plugin-node-resolve \
  rollup-plugin-jsy

npm install --save-prod \
  mocha chai

npm -s run test

echo "To use the parent package properly, install it relatively:"
echo "  > npm install .. "
echo

echo "You may now remove '$0'"

