---
prev: false
next: false
---

# Filesystem Mode

The first mode is the filesystem mode. This mode'll automatically analyze a given path and will generate a sidebar based on the hierarchy of your filesystem.

## Usage

Simply add [`sidebarPlugin`](/reference/Plugin/sidebarPlugin) into your [VitePress config](https://vitepress.dev/reference/site-config#config-resolution). Keep in mind, that the filesystem mode is the default mode and doesn't need to be specified.

```ts [config.ts]
import { sidebarPlugin } from "@ogs-gmbh/vitepress-plugin-sidebar";

export default {
  themeConfig: {
    sidebar: sidebarPlugin({
      // mode: "fs",
      path: "./dist/vitepress-content"
    })
  }
};
```
