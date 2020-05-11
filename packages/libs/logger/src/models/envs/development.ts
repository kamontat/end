import winston from "winston";
import { Level, Levels } from "../../constants/level";
import { TransportFn, LoggerFn } from "./object";

export const level: Level = Level.DEBUG;
export const transport: TransportFn = () => {
  return {
    console: new winston.transports.Console({ level: level }),
    outfile: new winston.transports.File({ filename: "combined.log", level: Level.SILENT }),
    errfile: new winston.transports.File({ filename: "error.log", level: Level.SILENT }),
  };
};
export const logger: LoggerFn = (name, transports) => {
  return winston.createLogger({
    levels: Levels.json(),
    defaultMeta: { root: `@${name.rootName}`, name: name.toString(), env: "development" },
    transports: [transports.console, transports.outfile, transports.errfile],
  });
};
