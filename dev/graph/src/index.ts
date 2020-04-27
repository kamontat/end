import { Graph } from "./models/graph";
import * as deps from "./constants/dependencies";
import { resolve } from "path";

const graph = new Graph("Dependencies");

// dev-cli completed
graph.newNode(deps.devCli).dependsOn(deps.typescript, deps.gulp, deps.rimraf);

// dev-graph completed
graph.newNode(deps.devGraph).dependsOn(deps.graphviz, deps.devCli, deps.devLinter);

// dev-generator completed
graph.newNode(deps.devGenerator).dependsOn(deps.plop, deps.devCli);

// dev-linter

// dev-testbox

// dev-utils

// lib-logger
graph.newNode(deps.libLogger).standardNode();

// lib-error
graph.newNode(deps.libError).standardNode();

// cli
graph.newNode(deps.cli).standardNode();

console.log(graph.toString());

const path = resolve(".");
graph.toPNG(path);
graph.toPDF(path);
