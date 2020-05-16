export enum Level {
  DEBUG = "debug",
  VERBOSE = "verbose",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  SILENT = "silent",
}

export class Levels {
  static from(name?: string) {
    switch (name?.toLowerCase()) {
      case "debug":
        return Level.DEBUG;
      case "verbose":
        return Level.VERBOSE;
      case "info":
        return Level.INFO;
      case "warn":
        return Level.WARN;
      case "error":
        return Level.ERROR;
      case "silent":
        return Level.SILENT;
      case null:
      case undefined:
        return Level.ERROR;
      default:
        return Level.INFO;
    }
  }

  static list() {
    return [Level.DEBUG, Level.VERBOSE, Level.INFO, Level.WARN, Level.ERROR, Level.SILENT];
  }

  static json(): { [name in Level]: number } {
    const json: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    json[Level.DEBUG] = 5;
    json[Level.VERBOSE] = 4;
    json[Level.INFO] = 3;
    json[Level.WARN] = 2;
    json[Level.ERROR] = 1;
    json[Level.SILENT] = 0;
    return json;
  }
}
