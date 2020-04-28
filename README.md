# NMSys - Novel Management System
(formly known as [ND command](https://github.com/kamontat/nd))

## Development process

1. Install [node](https://nodejs.org/en/download/) and [rushjs](https://rushjs.io/pages/intro/get_started/) in local machine
2. Install and update depencies and modules via `rush update`
3. Compile and build typescript project via `rush build`
   1. Normally `rush build` will write log as files to modules, you can make it write to console by add `--verbose`

### Add new modules

1. Add new modules via `rush gen`
2. Input all necessary information and run `rush update`
3. You might add new dependencies via `rush add -p <dependency_name>`
4. You might `cd` to specify modules and run `rushx <scripts_command>` to run individual commands

### Exist modules

1. Everytime add, or remove dependencies from **package.json**, you need to run `rush update`

### Dependencies graph

You might want to look dependencies graph in [@nmsys/dev-graph](dev/graph) or update your new or exist modules by [@nmsys/dev-graph#index](dev/graph/src/index.ts)