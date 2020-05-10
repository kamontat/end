import { ConfigFunction } from "@nmsys/stack-config";

interface JestConfig {
  verbose: boolean;
  preset: string;
  testEnvironment: string;
  rootDir: string;
  collectCoverage: boolean;
}

const jest: ConfigFunction<void, JestConfig> = (_root) => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    rootDir: _root ?? process.cwd(),
    collectCoverage: true,
  };
};

export default jest;
