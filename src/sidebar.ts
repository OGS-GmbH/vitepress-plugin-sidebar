import { Config, Index, SidebarItem } from "./types";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { subtractPath } from "./path";
import { pathExists } from "./fs";

const MD_EXTENSION: string = ".md";
const INDEX_FILENAME: string = `index + ${ MD_EXTENSION }`;

function parseSidebarItem (currentPath: string, analyzePath: string, config: Config): SidebarItem | undefined {
  const stats: fs.Stats = fs.statSync(currentPath);

  if (!stats.isDirectory() && !stats.isFile())
    return;

  if (stats.isDirectory()) {
    const dirname: string = currentPath.split(path.sep).at(-1)!;
    const sidebarItem: SidebarItem = {
      text: dirname.at(0)!.toUpperCase() + dirname.slice(1),
      collapsed: config.collapsed
    };
    const relativeLink: string | null = subtractPath(analyzePath, currentPath);

    if (pathExists(path.join(analyzePath, relativeLink ?? "", "index.md")))
      sidebarItem.link = relativeLink ?? subtractPath(config.cwd ?? process.cwd(), analyzePath)!;

    console.log(sidebarItem);
    for (const item of fs.readdirSync(currentPath)) {
      const itemPath: string = path.join(currentPath, item);
      const innerSidebarItem: SidebarItem | undefined = parseSidebarItem(itemPath, analyzePath, config);

      if (!innerSidebarItem)
        continue;

      if (sidebarItem.items) {
        sidebarItem.items.push(
          innerSidebarItem
        );
      } else {
        sidebarItem.items = [
          innerSidebarItem
        ];
      }
    }

    return sidebarItem;
  }

  if (path.extname(currentPath) !== MD_EXTENSION || path.basename(currentPath) === INDEX_FILENAME)
    return;

  const filename: string = path.basename(currentPath, MD_EXTENSION);
  /* eslint-disable-next-line t */
  const relativeLink: string = subtractPath(config.path, currentPath)!;
  const foundIndex: Index | undefined = config.index?.find((index: Index): boolean => index.path === relativeLink);
  const sidebarItem: SidebarItem = {
    text: filename,
    link: config.baseHref
      ? path.join(
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
  parseSidebarItem
};
