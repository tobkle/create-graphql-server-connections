#!/bin/sh -e

# This script maintains a git branch which mirrors master but in a form that
# what will eventually be deployed to npm, allowing npm dependencies to use:
#
#     "graphql": "git://github.com/tobkle/create-graphql-server-authorization.git#npm"
#

babel src --ignore __tests__ --out-dir npm-local

# Ensure a vanilla package.json before deploying so other tools do not interpret
# The built output as requiring any further transformation.
node -e "var package = require('./package.json'); \
  delete package.scripts; \
  delete package.options; \
  delete package.devDependencies; \
  require('fs').writeFileSync('./npm-local/package.json', JSON.stringify(package, null, 2));"

cp README.md npm-local/
cp LICENSE npm-local/
cp -r docs npm-local/
cp -r templates npm-local/

cd npm-local
npm install
# npm link

