import { Config, Index, SidebarItem } from "../types";
import fs from "node:fs";
import * as nodePath from "node:path";
import matter from "gray-matter";
import { normalizeDirNames } from "../normalize";
import { getCollapsedState } from "../config";
import { DIR_UP, INDEX_FILENAME, MD_EXTENSION, subtractPath } from "../path";
import { pathExists } from "../fs";

type FrontmatterData = Partial<{
  sidebarTitle: string;
  sidebarIndex: number;
  sidebarHide: boolean;
}>

type ManualModeReturn = {
  item: SidebarItem,
  at?: number
};

function manualMode (
  path: string,
  rootPath: string,
  config: Config
): ManualModeReturn | undefined {
  /* eslint-disable-next-line @security/detect-non-literal-fs-filename */
  const stats: fs.Stats = fs.statSync(path);

  if (!stats.isDirectory() && !stats.isFile())
    return;

  if (stats.isDirectory()) {
    /* eslint-disable-next-line @tseslint/no-non-null-assertion */
    const dirname: string = path.split(nodePath.sep).at(-1)!;
    /* eslint-disable-next-line @tseslint/no-shadow */
    const sidebarItem: SidebarItem = {
      text: normalizeDirNames(
        dirname,
        config
      ),
      collapsed: getCollapsedState(config.collapsible)
    };
    /* eslint-disable-next-line @tseslint/no-shadow */
    const relativeLink: string | null = subtractPath(rootPath, path);
    const indexExists: boolean = pathExists(nodePath.join(rootPath, relativeLink ?? "", "index.md"));

    if (indexExists) {
      sidebarItem.link = nodePath.join(
        config.baseHref ?? "",
        relativeLink
        ?? subtractPath(rootPath, path)
        /* eslint-disable-next-line @tseslint/no-non-null-assertion */
        ?? subtractPath(nodePath.join(rootPath, DIR_UP), path)!
      );
    }

    let items = [];

    /* eslint-disable-next-line @security/detect-non-literal-fs-filename */
    for (const item of fs.readdirSync(path)) {
      const innerSidebarItemPath: string = nodePath.join(path, item);
      const innerFileReturn: ManualModeReturn | undefined = manualMode(
        innerSidebarItemPath,
        rootPath,
        config
      );

      console.log(innerFileReturn);

      if (!innerFileReturn)
        continue;

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

  if (nodePath.extname(path) !== MD_EXTENSION || nodePath.basename(path) === INDEX_FILENAME)
    return;

  const content = fs.readFileSync(path, {
    encoding: "utf-8"
  });
  const parsedContent = matter(content);
  const { sidebarHide, sidebarIndex, sidebarTitle } = parsedContent.data as FrontmatterData;
  const foundIndex: Index | undefined = config.index?.find((index: Index): boolean => index.path === relativeLink);

  if (sidebarHide)
    return;

  const relativeLink: string = subtractPath(nodePath.join(rootPath, DIR_UP), path)!;
  let sidebarItem: SidebarItem = {
    text: sidebarTitle,
    link: config.baseHref
      ? nodePath.join(
        config.baseHref,
        relativeLink
      )
      : relativeLink
  };

  if (foundIndex) {
    if (foundIndex.hide)
      return;

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

export {
  manualMode
}
