import { pathExists } from "./fs";
import { getAnalyzePath } from "./path";
import { parseSidebarItem } from "./sidebar";
import { Config, SidebarItem } from "./types";
import process from "node:process";

function sidebarPlugin (config: Config): SidebarItem {
  const analyzePath: string = getAnalyzePath(config);

  if (!pathExists(analyzePath)) {
    process.stderr.write(`Error: The path "${ analyzePath }" does not exist.\n`);
    /* eslint-disable-next-line @unicorn/no-process-exit */
    process.exit(1);
  }

  const sidebarItem: SidebarItem | undefined = parseSidebarItem(analyzePath, analyzePath, config);

  if (!sidebarItem) {
    process.stderr.write(`Error: The path "${ analyzePath }" has not a valid type or contains no markdown files.\n`);
    /* eslint-disable-next-line @unicorn/no-process-exit */
    process.exit(1);
  }

  const maybeTransformed: SidebarItem = config.transformFn
    ? config.transformFn(sidebarItem)
    : sidebarItem;

  return maybeTransformed;
}

export {
  sidebarPlugin
};
