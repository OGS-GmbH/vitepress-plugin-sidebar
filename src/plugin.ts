import { pathExists } from "./fs";
import { fsMode } from "./modes/fs";
import { getRootPath } from "./path";
import { Config, SidebarItem } from "./types";
import process from "node:process";

function sidebarPlugin (config: Config): SidebarItem {
  const rootPath: string = getRootPath(config);

  if (!pathExists(rootPath)) {
    process.stderr.write(`Error: The path "${ rootPath }" does not exist.\n`);
    /* eslint-disable-next-line @unicorn/no-process-exit */
    process.exit(1);
  }

  const sidebarItem: SidebarItem | undefined = fsMode(
    rootPath,
    rootPath,
    config
  );

  if (!sidebarItem) {
    process.stderr.write(`Error: The path "${ rootPath }" has not a valid type or contains no markdown files.\n`);
    /* eslint-disable-next-line @unicorn/no-process-exit */
    process.exit(1);
  }

  const maybeTransformedSidebarItem: SidebarItem = config.transformFn
    ? config.transformFn(sidebarItem)
    : sidebarItem;

  return maybeTransformedSidebarItem;
}

export {
  sidebarPlugin
};
