import { ConfigFunction } from "@nmsys/stack-config";

interface JestConfig {
  preset: string;
  testEnvironment: string;
}

const jest: ConfigFunction<void, JestConfig> = (_root) => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
  };
};

export default jest;
