---
prev: false
next: false
---

# Getting started

## Installation

- Node.js version 18 or higher
- A VitePress project
- A package manager: e.g. npm, pnpm, ...

::: code-group

```sh [npm]
$ npm install -D @ogs-gmbh/vitepress-plugin-sidebar
```

```sh [pnpm]
$ pnpm add -D @ogs-gmbh/vitepress-plugin-sidebar
```

```sh [yarn]
$ yarn add -D @ogs-gmbh/vitepress-plugin-sidebar
```

```sh [bun]
$ bun add -D @ogs-gmbh/vitepress-plugin-sidebar
```

:::

## Usage

Now, just import and use the `sidebarPlugin` inside your [VitePress Site Config](https://vitepress.dev/reference/site-config).

You can use the reference of [`Config`](/reference/Configuration/Config) to get a better understanding of the configuration.

```ts [index.ts]
import { sidebarPlugin } from "@ogs-gmbh/vitepress-plugin-sidebar";

export default {
  themeConfig: {
    sidebar: sidebarPlugin({
      path: "./dist/vitepress-content"
    })
  }
}
```
