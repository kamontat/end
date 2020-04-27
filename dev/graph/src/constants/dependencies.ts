import { internalBuilder, externalBuilder, DependencyType } from "./dependency";

export const typescript = externalBuilder(DependencyType.APP, "typescript");
export const gulp = externalBuilder(DependencyType.DEV, "gulp");
export const rimraf = externalBuilder(DependencyType.DEV, "rimraf");
export const graphviz = externalBuilder(DependencyType.APP, "graphviz");
export const plop = externalBuilder(DependencyType.APP, "plop");

export const cli = internalBuilder(DependencyType.APP, "cli");

export const libLogger = internalBuilder(DependencyType.LIB, "logger");
export const libError = internalBuilder(DependencyType.LIB, "error");

export const devCli = internalBuilder(DependencyType.DEV, "cli");
export const devLinter = internalBuilder(DependencyType.DEV, "linter");
export const devTestbox = internalBuilder(DependencyType.DEV, "testbox");
export const devGraph = internalBuilder(DependencyType.DEV, "graph");
export const devGenerator = internalBuilder(DependencyType.DEV, "generator");
export const devUtils = internalBuilder(DependencyType.DEV, "utils");

export const standardNodes = [devCli, devLinter, devTestbox];
