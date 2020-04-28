import { internalBuilder, externalBuilder, DependencyType } from "./dependency";

export const microsoftNodeBuild = externalBuilder(DependencyType.LIB, "@microsoft/node-library-build");
export const microsoftRushCompiler = externalBuilder(DependencyType.LIB, "@microsoft/rush-stack-compiler-3.7");

export const typescript = externalBuilder(DependencyType.APP, "typescript");
export const gulp = externalBuilder(DependencyType.DEV, "gulp");
export const rimraf = externalBuilder(DependencyType.DEV, "rimraf");
export const graphviz = externalBuilder(DependencyType.APP, "graphviz");
export const plop = externalBuilder(DependencyType.APP, "plop");
export const winston = externalBuilder(DependencyType.APP, "winston");

export const eslint = externalBuilder(DependencyType.DEV, "eslint");
export const prettier = externalBuilder(DependencyType.DEV, "prettier");

export const chai = externalBuilder(DependencyType.TST, "chai");
export const sinon = externalBuilder(DependencyType.TST, "sinon");

export const cli = internalBuilder(DependencyType.APP, "cli");

export const libLogger = internalBuilder(DependencyType.LIB, "logger");
export const libError = internalBuilder(DependencyType.LIB, "error");

export const devCli = internalBuilder(DependencyType.DEV, "cli");
export const devLinter = internalBuilder(DependencyType.DEV, "linter");
export const devTestbox = internalBuilder(DependencyType.TST, "testbox");
export const devGraph = internalBuilder(DependencyType.DEV, "graph");
export const devGenerator = internalBuilder(DependencyType.DEV, "generator");
export const devUtils = internalBuilder(DependencyType.DEV, "utils");

export const standardNodes = [devCli, devLinter, devTestbox];
