export const root = path.join(__dirname, "..", "..");

export const app = path.join(root, "{{category}}", "{{name}}");
export const rushjson = path.join(root, "rush.json");

export const index = path.join(app, "src", "index.ts");
export const package = path.join(app, "package.json");
export const tsconfig = path.join(app, "tsconfig.json");
