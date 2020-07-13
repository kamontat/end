import * as childProcess from "child_process";

import { Execution } from "./Execution";

export class Commandline implements Execution<string[], childProcess.ChildProcess, string[]> {
  run(commands?: string[], opts?: string[]) {
    const _opts = opts ?? [];
    const _commands = commands ?? [];

    _commands.push(..._opts);
    const command = _commands.shift() ?? "exit";

    console.debug(`[debug] cmd: ${command} ${_commands.join(" ")}`);

    const proc = childProcess.spawn(command, _commands, { stdio: "inherit" });
    proc.on("exit", (code, signal) => {
      console.debug(`[debug] exit signal: ${signal}`);
      if (code ?? 0 > 0) process.exit(code ?? 1);
    });

    return proc;
  }
}
