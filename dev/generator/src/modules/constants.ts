import { resolve } from "path";

export const templates = resolve(__dirname, "..", "..", "templates", "modules");
export const root = resolve(__dirname, "..", "..", "..", "..");

export const app = resolve(root, "{{category}}", "{{name}}");
export const rushjson = resolve(root, "rush.json");

export const index = resolve(app, "src", "index.ts");
export const pjson = resolve(app, "package.json");
export const tsconfig = resolve(app, "tsconfig.json");
export const gulpfile = resolve(app, "gulpfile.js");

export const eslintrc = resolve(app, ".eslintrc.js");
export const eslintignore = resolve(app, ".eslintignore");
