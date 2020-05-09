import * as childProcess from "child_process";

import { resolve } from "path";

const parentProject = resolve(process.cwd());
const rootProject = resolve(parentProject, "..", "..", "..");

const tscProject = resolve(parentProject, "node_modules", "@nmsys", "internal-compiler");
const project = resolve(tscProject, "includes");

childProcess.execSync(`${rootProject}/node_modules/.bin/tsc --project ${project}`, { stdio: "inherit" });
