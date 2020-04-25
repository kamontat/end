const path = require("path")

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {

  const root = path.join(__dirname, "..", "..")
  const app = path.join(root, "{{category}}", "{{name}}")
  const rushjson = path.join(root, "rush.json")

  const index = path.join(app, "src", "index.ts")
  const package = path.join(app, "package.json")
  const tsconfig = path.join(app, "tsconfig.json")

  plop.addHelper("to_module", (category, name) => {
    if (category === "apps") return name
    else if (category === "libs") return `lib-${name}`
    else return `${category}-${name}`
  })

  plop.addHelper("to_review", (category) => {
    switch (category) {
      case "apps":
        return "productions"
        break
      case "libs":
        return "libraries"
        break
      case "dev":
        return "developments"
        break
      default:
        return "prototypes"
    }
  })

  // create your generators here
  plop.setGenerator('module', {
    description: 'application controller logic',
    prompts: [{
      type: "list",
      name: "category",
      message: "modules category",
      choices: ["apps", "libs", "dev"]
    }, {
      type: 'input',
      name: 'name',
      message: 'module name',
      validate: (i, a) => /[a-z0-9\-]/.test(i)
    }, {
      type: 'input',
      name: 'description',
      message: 'module description',
      validate: (i, a) => /[a-z0-9 ]/.test(i)
    }],
    actions: [{
      type: 'add',
      path: index,
      templateFile: 'templates/modules/index.hbs'
    }, {
      type: 'add',
      path: package,
      templateFile: 'templates/modules/package.hbs'
    }, {
      type: 'add',
      path: tsconfig,
      templateFile: 'templates/modules/tsconfig.hbs'
    }, {
      type: "append",
      pattern: "\/\*APPEND_HERE\*\/",
      path: rushjson,
      templateFile: "templates/modules/rushjson.hbs"
    }]
  });
};