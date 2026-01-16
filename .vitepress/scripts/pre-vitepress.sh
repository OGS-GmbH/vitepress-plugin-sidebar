#!/usr/bin/env bash

echo "Preparing VitePress source..."

# Theme
sass ./.vitepress/.vitepress/theme/custom.scss ./.vitepress/.vitepress/theme/custom.css

# Filesystem
mkdir -p ./dist/vitepress-src

cp -r ./.vitepress/public ./dist/vitepress-src/public

mkdir -p ./dist/vitepress-src/reference

cp -r ./dist/typedoc/* ./dist/vitepress-src/reference

cp -r ./.vitepress/docs/* ./dist/vitepress-src
cp CODE_OF_CONDUCT.md ./dist/vitepress-src/other/code-of-conduct.md
