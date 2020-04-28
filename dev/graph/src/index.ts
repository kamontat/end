import { Graph } from "./models/graph";
import * as deps from "./constants/dependencies";
import { resolve } from "path";

const graph = new Graph("Dependencies");

// dev-cli completed
graph
  .newNode(deps.devCli)
  .dependsOn(deps.typescript, deps.microsoftNodeBuild, deps.microsoftRushCompiler, deps.gulp, deps.rimraf);

// dev-graph completed
graph.newNode(deps.devGraph).withDevCli().withLint().dependsOn(deps.graphviz);

// dev-generator completed
graph.newNode(deps.devGenerator).withDevCli().dependsOn(deps.plop);

// dev-linter completed
graph.newNode(deps.devLinter).withDevCli().dependsOn(deps.eslint, deps.prettier);

// dev-testbox completed
graph.newNode(deps.devTestbox).withDevCli().dependsOn(deps.chai, deps.sinon);

// dev-utils completed
graph.newNode(deps.devUtils).withDevCli().withTest();

// lib-error completed
graph.newNode(deps.libError).withDevCli().withLint().withTest().withUtils();

// lib-logger completed
graph.newNode(deps.libLogger).withDevCli().withLint().withTest().withUtils().dependsOn(deps.winston);

// cli
// graph.newNode(deps.cli).standardNode();

// console.log(graph.toString());

const path = resolve(".");
graph.toPNG(path);
graph.toPDF(path);
