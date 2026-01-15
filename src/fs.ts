import fs from "node:fs";

function pathExists (path: string): boolean {
  try {
    fs.accessSync(path, fs.constants.R_OK);

    return true;
  } catch {
    return false;
  }
}

export {
  pathExists
};
