import path from "node:path";
import process from "node:process";
import type { Config } from "./types.js";

const DIR_UP: string = "..";
const MD_EXTENSION: string = ".md";
const INDEX_FILENAME: string = `index${MD_EXTENSION}`;

function getCwd(config: Config): string {
  return config.cwd ?? process.cwd();
}

function getRootPath(config: Config): string {
  const cwd: string = getCwd(config);

  return path.isAbsolute(config.path) ? config.path : path.join(cwd, config.path);
}

function subtractPath(basePath: string, fullPath: string): string | null {
  const normalizedBasePath: string = path.normalize(basePath);
  const normalizedFullPath: string = path.normalize(fullPath);

  return normalizedFullPath.startsWith(normalizedBasePath + path.sep)
    ? normalizedFullPath.slice(normalizedBasePath.length + 1)
    : null;
}

export { DIR_UP, MD_EXTENSION, INDEX_FILENAME, getCwd, getRootPath, subtractPath };
