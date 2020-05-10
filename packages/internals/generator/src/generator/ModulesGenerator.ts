import { Generator, Plop, GeneratorObject, Helper } from "../models/Generator";

export class ModulesGenerator extends Generator {
  constructor() {
    super("modules");
  }

  config(plop: Plop) {
    plop.addHelper("get_normal_module_name", (name: string) => {
      // nmsys__name => @nmsys/name
      // @types/nmsys__exam => @nmsys/exam
      // hello => hello
      // @types/world => world
      if (name.includes("__")) return `@${name.replace("@types/", "").replace("__", "/")}`;
      else return name.replace("@types/", "");
    });

    plop.addHelper(
      "is_prod",
      (category: string) => category.includes("app") || category.includes("core") || category.includes("lib"),
    );
    plop.addHelper("is_dev", (category: string) => category.includes("stack") || category.includes("internal"));
    plop.addHelper("is_type", (category: string) => category.includes("typ"));

    plop.addHelper("create_module_name", (category: string, name: string) => {
      if (category.includes("app")) return `@nmsys/app-${name}`;
      if (category.includes("core")) return `@nmsys/${name}`;
      if (category.includes("lib")) return `@nmsys/lib-${name}`;
      if (category.includes("stack")) return `@nmsys/stack-${name}`;
      if (category.includes("internal")) return `@nmsys/internal-${name}`;
      if (category.includes("typ")) return `@types/${name}`;
    });

    // plop.addHelper("get_scripts", (category: string) => {});
    // plop.addHelper("get_dependency_list", (category: string) => {});
  }

  generate(helper: Helper): GeneratorObject {
    return {
      description: "application modules generator",
      prompts: [
        {
          type: "list",
          name: "category",
          message: "module category",
          choices: ["apps", "cores", "libs", "stacks", "internals", "typings"],
        },
        {
          type: "input",
          name: "name",
          message: "module name",
          validate: (i) => /[a-z0-9-_]/.test(i),
        },
        {
          type: "input",
          name: "description",
          message: "module description",
          validate: (i) => /[a-z0-9 ]/.test(i),
          when: (a) => a.category !== "typing",
        },
      ],
      actions: [
        {
          type: "add",
          path: helper.module("src", "index.ts"),
          templateFile: helper.template("index.hbs"),
        },
        {
          type: "add",
          path: helper.module("package.json"),
          templateFile: helper.template("package.hbs"),
        },
      ],
    };
  }
}
