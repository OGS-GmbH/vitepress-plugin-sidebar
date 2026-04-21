import fs from "node:fs";
import * as nodePath from "node:path";
import matter from "gray-matter";
import { getCollapsedState } from "../config.js";
import { pathExists } from "../fs.js";
import { normalizeDirNames } from "../normalize.js";
import { DIR_UP, INDEX_FILENAME, MD_EXTENSION, subtractPath } from "../path.js";
import type { Config, Index, SidebarItem } from "../types.js";

/**
 * Type, in that is parsed by `gray-matter` to get frontmatter properties
 *
 * @category Types
 * @since 1.1.0
 * @author Simon Kovtyk
 */
type ManualModeFrontmatter = Partial<{
  /**
   * Title for the {@link SidebarItem}
   *
   * @since 1.1.0
   * @author Simon Kovtyk
   */
  sidebarTitle: string;
  /**
   * Index for the {@link SidebarItem}
   *
   * @since 1.1.0
   * @author Simon Kovtyk
   */
  sidebarIndex: number;
  /**
   * Flag to hide/show the {@link SidebarItem}
   *
   * @since 1.1.0
   * @author Simon Kovtyk
   */
  sidebarHide: boolean;
}>;

/**
 * Return of {@link manualMode}
 *
 * @category Types
 * @since 1.1.0
 * @author Simon Kovtyk
 */
type ManualModeReturn = {
  /**
   * {@link SidebarItem}, that'll appear in the sidebar.
   *
   * @since 1.1.0
   * @author Simon Kovtyk
   */
  item: SidebarItem;
  /**
   * Possible index, at which the {@link SidebarItem} will appear.
   *
   * @since 1.1.0
   * @author Simon Kovtyk
   */
  at?: number;
};

/**
 * Manual mode
 * @category Modes
 * @param path - Path to start reading the filesystem from
 * @param rootPath - Root path for relative links
 * @param config - Configuration to use
 * @returns {@link ManualModeReturn}, that contains a {@link SidebarItem} or, if nothing could be resolved, `undefined`
 *
 * @since 1.1.0
 * @author Simon Kovtyk
 */
function manualMode(path: string, rootPath: string, config: Config): ManualModeReturn | undefined {
  /* eslint-disable-next-line @security/detect-non-literal-fs-filename */
  const stats: fs.Stats = fs.statSync(path);

  if (!stats.isDirectory() && !stats.isFile()) return;

  if (stats.isDirectory()) {
    /* eslint-disable-next-line @tseslint/no-non-null-assertion */
    const dirname: string = path.split(nodePath.sep).at(-1)!;
    /* eslint-disable-next-line @tseslint/no-shadow */
    const sidebarItem: SidebarItem = {
      text: normalizeDirNames(dirname, config),
      collapsed: getCollapsedState(config.collapsible)
    };
    /* eslint-disable-next-line @tseslint/no-shadow */
    const relativeLink: string | null = subtractPath(rootPath, path);
    const indexExists: boolean = pathExists(
      nodePath.join(rootPath, relativeLink ?? "", "index.md")
    );

    if (indexExists) {
      sidebarItem.link = nodePath.join(
        config.baseHref ?? "",
        relativeLink ??
          subtractPath(rootPath, path) ??
          /* eslint-disable-next-line @tseslint/no-non-null-assertion */
          subtractPath(nodePath.join(rootPath, DIR_UP), path)!
      );
    }

    const items = [];

    /* eslint-disable-next-line @security/detect-non-literal-fs-filename */
    for (const item of fs.readdirSync(path)) {
      const innerSidebarItemPath: string = nodePath.join(path, item);
      const innerFileReturn: ManualModeReturn | undefined = manualMode(
        innerSidebarItemPath,
        rootPath,
        config
      );

      if (!innerFileReturn) continue;

      if (!innerFileReturn.at) {
        items.push(innerFileReturn.item);
        continue;
      }

      items[innerFileReturn.at] = innerFileReturn.item;
    }

    sidebarItem.items = items;

    return {
      item: sidebarItem
    };
  }

  if (nodePath.extname(path) !== MD_EXTENSION || nodePath.basename(path) === INDEX_FILENAME) return;

  const content = fs.readFileSync(path, {
    encoding: "utf-8"
  });
  const parsedContent = matter(content);
  const { sidebarHide, sidebarIndex, sidebarTitle } = parsedContent.data as ManualModeFrontmatter;
  const relativeLink: string = subtractPath(nodePath.join(rootPath, DIR_UP), path)!;
  const foundIndex: Index | undefined = config.index?.find(
    (index: Index): boolean => index.path === relativeLink
  );

  if (sidebarHide) return;

  let sidebarItem: SidebarItem = {
    text: sidebarTitle,
    link: config.baseHref ? nodePath.join(config.baseHref, relativeLink) : relativeLink
  };

  if (foundIndex) {
    if (foundIndex.hide) return;

    sidebarItem = {
      ...sidebarItem,
      ...foundIndex.item
    };
  }

  return {
    item: sidebarItem,
    at: sidebarIndex
  };
}

export { manualMode };

export type { ManualModeFrontmatter, ManualModeReturn };
