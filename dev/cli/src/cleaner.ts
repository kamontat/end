#!/usr/bin/env node

import { execSync } from "child_process";
import { join } from "path";
import { finder } from "./utils/files/searcher";

const args = process.argv.slice(2);

(async () => {
  const logs = (await finder(".", /[a-zA-Z0-9\-\.]+\.log/, 3)).map((f) => f.path);
  const libs = (await finder(join(".", "lib"), /.*/, 5)).map((f) => f.path);
  const all = logs.concat(...libs).concat(...args);

  args.forEach(async (v) => all.concat((await finder(".", v, 5)).map((f) => f.path)));

  console.log("deleting...");
  console.log(`  - ${all.join("\n  - ")}`);

  execSync(`rm -rf ${all.join(" ")}`, { stdio: "inherit" });
})();
