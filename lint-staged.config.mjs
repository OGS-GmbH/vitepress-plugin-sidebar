export default {
  "*.{ts,mts,cts,js,mjs,cjs,json,jsonc,json5,md}": "eslint",
  "package.json": "npmPkgJsonLint -c ./node_modules/@ogs-gmbh/linter/package-json-open-source.rules.json"
};
