import {
  ESLINT_JSON_RULES,
  ESLINT_MARKDOWN_RULES,
  NODE_JS_RULES_PRESET,
  NODE_TS_RULES_PRESET
} from "@ogs-gmbh/linter";
import eslintJsonPlugin from "@eslint/json";
import eslintMarkdownPlugin from "@eslint/markdown";
import globals from "globals";
import tseslintPlugin from "typescript-eslint";
import unicornPlugin from "eslint-plugin-unicorn";
import securityPlugin from "eslint-plugin-security";
import stylisticPlugin from "@stylistic/eslint-plugin";
import jsdocPlugin from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    plugins: {
      "@tseslint": tseslintPlugin.plugin,
      "@unicorn": unicornPlugin,
      "@stylistic": stylisticPlugin,
      "@security": securityPlugin,
      "@markdown": eslintMarkdownPlugin,
      "@jsdoc": jsdocPlugin,
      "@json": eslintJsonPlugin
    }
  },
  {
    ignores: [
      ".git",
      ".husky",
      ".idea",
      ".vscode",
      "node_modules",
      "dist",
      ".vitepress/.vitepress/cache"
    ]
  },
  {
    files: [
      "**/*.ts",
      "**/*.mts",
      "**/*.cts"
    ],
    languageOptions: {
      parser: tseslintPlugin.parser,
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            ".vitepress/.vitepress/*",
            ".vitepress/.vitepress/theme/*"
          ]
        },
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: NODE_TS_RULES_PRESET
  },
  {
    files: [
      "**/*.js",
      "**/*.mjs",
      "**/*.cjs"
    ],
    rules: NODE_JS_RULES_PRESET
  },
  {
    files: [ "**/*.md" ],
    rules: ESLINT_MARKDOWN_RULES,
    language: "@markdown/gfm",
    languageOptions: {
      frontmatter: "yaml"
    }
  },
  {
    files: [ "**/*.json" ],
    language: "@json/json",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.json5" ],
    language: "@json/json5",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.jsonc" ],
    language: "@json/jsonc",
    rules: ESLINT_JSON_RULES
  }
);
