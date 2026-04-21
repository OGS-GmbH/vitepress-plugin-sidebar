---
prev: false
next: false
---

# Manual Mode

This mode has a small difference to the old [filesystem mode](/guide/filesystem-mode). It'll keep the filesystem hierarchy but allows better controls of each Markdown page by using Frontmatter.

It takes the follwing Frontmatter keys:

| Key          | Type    | Description                                                                 | Optional?                                                      |
| ------------ | ------- | --------------------------------------------------------------------------- | -------------------------------------------------------------- |
| sidebarHide  | boolean | Flag to toggle the visibility                                               | Yes, it is `false` by default                                  |
| sidebarTitle | string  | Defines, which text should appear as link                                   | No                                                             |
| sidebarIndex | number  | Defines, at which index of all sidebar items in a group this item'll appear | Yes, if not defined, the sorting falls back to your filesystem |

## Usage

First, add [`sidebarPlugin`](/reference/Plugin/sidebarPlugin) into your [VitePress Site Config](https://vitepress.dev/reference/site-config#config-resolution). Then you are able to set `mode` to `manual`.

```ts [config.ts]
import { sidebarPlugin } from "@ogs-gmbh/vitepress-plugin-sidebar";

export default {
  themeConfig: {
    sidebar: sidebarPlugin({
      mode: "manual",
      path: "./dist/vitepress-content"
    })
  }
};
```

Now, we want to add Frontmatter to one of our pages to individually change the sidebar appearance:

```md [my-page.md]
---
sidebarIndex: 1
sidebarTitle: My first page
---

# My page

This page will have `My first page` as sidebar title and is the first item of its group.
```
