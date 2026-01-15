import { Config, Index, SidebarItem } from "../types";
import fs from "node:fs";
import * as nodePath from "node:path";
import { DIR_UP, subtractPath } from "../path";
import { pathExists } from "../fs";
import { getCollapsedState } from "../config";
import { normalizeDirNames, normalizeLinkNames } from "../normalize";

const MD_EXTENSION: string = ".md";
const INDEX_FILENAME: string = `index${ MD_EXTENSION }`;

function fsMode (
  path: string,
  rootPath: string,
  config: Config
): SidebarItem | undefined {
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

    /* eslint-disable-next-line @security/detect-non-literal-fs-filename */
    for (const item of fs.readdirSync(path)) {
      const innerSidebarItemPath: string = nodePath.join(path, item);
      const innerSidebarItem: SidebarItem | undefined = fsMode(
        innerSidebarItemPath,
        rootPath,
        config
      );

      if (!innerSidebarItem)
        continue;

      sidebarItem.items = sidebarItem.items
        ? [ ...sidebarItem.items, innerSidebarItem ]
        : [ innerSidebarItem ];
    }

    return sidebarItem;
  }

  if (nodePath.extname(path) !== MD_EXTENSION || nodePath.basename(path) === INDEX_FILENAME)
    return;

  const filename: string = nodePath.basename(path, MD_EXTENSION);
  /* eslint-disable-next-line @tseslint/no-non-null-assertion */
  const relativeLink: string = subtractPath(nodePath.join(rootPath, DIR_UP), path)!;
  const foundIndex: Index | undefined = config.index?.find((index: Index): boolean => index.path === relativeLink);
  const sidebarItem: SidebarItem = {
    text: normalizeLinkNames(filename, config),
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

    return {
      ...sidebarItem,
      ...foundIndex.item
    };
  }

  return sidebarItem;
}

export {
  fsMode
};
