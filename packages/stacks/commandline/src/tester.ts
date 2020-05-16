import { runCLI } from "jest";

import { Command } from "./models/Command";
import { Custom } from "./models/Custom";

const cli = new Command(process.cwd(), new Custom());
cli.build(({ helper }) => {
  return runCLI(
    {
      _: [],
      $0: "",
      ci: process.env.CI === "true",
      runInBand: process.env.CI === "true",
      config: helper.parentPath("jest.config.js"),
    },
    [helper.parentPath()]
  );
});

cli.start(process.argv.slice(2));
