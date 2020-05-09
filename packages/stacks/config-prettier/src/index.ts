import { ConfigFunction } from "@nmsys/stack-config";

interface PrettierConfig {
  semi: boolean;
  trailingComma: "all";
  singleQuote: boolean;
  printWidth: number;
  tabWidth: number;
}

const prettier: ConfigFunction<void, PrettierConfig> = (_root) => {
  return {
    semi: true,
    trailingComma: "all",
    singleQuote: false,
    printWidth: 120,
    tabWidth: 2,
  };
};

export default prettier;
