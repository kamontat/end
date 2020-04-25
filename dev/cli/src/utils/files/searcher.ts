import { readdir, stat } from "fs";
import { join, resolve } from "path";
import { promisify } from "util";
import { Pool } from "../promises/pools";

const fs_readDir = promisify(readdir);
const fs_stat = promisify(stat);

export interface Results {
  dir: string;
  file: string;
  path: string;
}

const search = async (dir: string, regex: RegExp, depth: number, result: Results[] = [], concurrency: number) => {
  async function fileAnalyzer(file) {
    const filePath = join(dir, file);
    const stat = await fs_stat(filePath);

    // Check if it's a file, if so then
    // check if the pattern contains a global
    // flag, if so then test the pattern
    // on the complete path else just the filename
    if (stat.isFile() && regex.test(regex.global ? filePath : file)) {
      result.push({ dir, file, path: filePath });
    } else if (stat.isDirectory() && depth > 0) {
      await search(filePath, regex, depth - 1, result, concurrency);
    }

    // reset the lastIndex for the regex
    // to run the match from the beginning of the
    // string (filePath)
    regex.lastIndex = 0;
  }

  const folderContents = await fs_readDir(dir);
  return Pool<string, void>(folderContents, fileAnalyzer, concurrency);
};

export interface Option {
  concurrency: number;
}

export const finder = async (
  baseDir: string,
  pattern: string | RegExp,
  depth: number = 0,
  options: Option = { concurrency: 10 }
) => {
  const result: Results[] = [];
  depth > -1 &&
    (await search(
      resolve(baseDir),
      typeof pattern === "string" ? new RegExp(pattern) : pattern,
      depth,
      result,
      options.concurrency
    ));
  return result;
};
