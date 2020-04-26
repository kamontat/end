import { NodePlopAPI } from "plop";
import { index, pjson, tsconfig, rushjson, templates, gulpfile, eslintignore, eslintrc, npmignore } from "./constants";
import { join } from "path";

export default (plop: NodePlopAPI) => {
  plop.addHelper("to_module", (category, name) => {
    if (category === "apps") return name;
    else if (category === "libs") return `lib-${name}`;
    else return `${category}-${name}`;
  });

  plop.addHelper("to_review", (category) => {
    switch (category) {
      case "apps":
        return "productions";
        break;
      case "libs":
        return "libraries";
        break;
      case "dev":
        return "developments";
        break;
      default:
        return "prototypes";
    }
  });

  // create your generators here
  plop.setGenerator("module", {
    description: "application controller logic",
    prompts: [
      {
        type: "list",
        name: "category",
        message: "modules category",
        choices: ["apps", "libs", "dev"],
      },
      {
        type: "input",
        name: "name",
        message: "module name",
        validate: (i, a) => /[a-z0-9\-]/.test(i),
      },
      {
        type: "input",
        name: "description",
        message: "module description",
        validate: (i, a) => /[a-z0-9 ]/.test(i),
      },
    ],
    actions: [
      {
        type: "add",
        path: index,
        templateFile: join(templates, "index.hbs"),
      },
      {
        type: "add",
        path: pjson,
        templateFile: join(templates, "package.hbs"),
      },
      {
        type: "add",
        path: tsconfig,
        templateFile: join(templates, "tsconfig.hbs"),
      },
      {
        type: "add",
        path: gulpfile,
        templateFile: join(templates, "gulpfile.hbs"),
      },
      {
        type: "add",
        path: npmignore,
        templateFile: join(templates, "npmignore.hbs"),
      },
      {
        type: "add",
        path: eslintrc,
        templateFile: join(templates, "eslintrc.hbs"),
      },
      {
        type: "add",
        path: eslintignore,
        templateFile: join(templates, "eslintignore.hbs"),
      },
      {
        type: "append",
        pattern: "/*APPEND_HERE*/",
        path: rushjson,
        templateFile: join(templates, "rushjson.hbs"),
      },
    ],
  });
};
