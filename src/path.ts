import path from "node:path";
import process from "node:process";
import { Config } from "./types";

function getAnalyzePath (config: Config): string {
  const cwd: string = config.cwd ?? process.cwd();

  return path.isAbsolute(config.path)
    ? config.path
    : path.join(cwd, config.path);
}

function subtractPath (basePath: string, fullPath: string): string | null {
  const normalizedBasePath: string = path.normalize(basePath);
  const normalizedFullPath: string = path.normalize(fullPath);

  return normalizedFullPath.startsWith(normalizedBasePath + path.sep)
    ? normalizedFullPath.slice(normalizedBasePath.length + 1)
    : null;
}

export {
  getAnalyzePath,
  subtractPath
};
