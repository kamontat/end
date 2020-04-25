#!/usr/bin/env node

import * as child_process from "child_process";

child_process.execSync("gulp", { stdio: "inherit" });
