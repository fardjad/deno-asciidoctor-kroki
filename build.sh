#!/usr/bin/env bash

set -e

pushd patcher > /dev/null
npm run --silent patch > ../mod/asciidoctor-kroki.js
npm run --silent get-version > ../VERSION
popd > /dev/null

pushd mod > /dev/null
deno cache --lock=lock.json --lock-write ./deps.ts
cp ../README.md README.md
popd > /dev/null
