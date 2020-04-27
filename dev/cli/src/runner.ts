#!/usr/bin/env node
import fs from "fs";
import path from "path";

const filepath = path.resolve(".", "lib", "index.js");
const exist = fs.existsSync(filepath);
if (exist) {
  require(filepath);
} else {
  console.error(`cannot find filepath=${filepath}`);
}
