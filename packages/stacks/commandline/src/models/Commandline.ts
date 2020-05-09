import * as childProcess from "child_process";

import { Execution } from "./Execution";

export class Commandline implements Execution<string[], Buffer> {
  run(commands: string[]) {
    return childProcess.execSync(commands.join(" "), { stdio: "inherit" });
  }
}
