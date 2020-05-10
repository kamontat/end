import { Command } from "./models/Command";
import { Commandline } from "./models/Commandline";

const cli = new Command(process.cwd(), new Commandline());
cli.build(({ helper }) => {
  const isci = process.env.CI === "true";
  const commands = [helper.rootNodeModulesCommand("jest")];
  if (isci) commands.push("--ci", "--runInBand");
  return commands;
});

cli.start(process.argv.slice(2));
