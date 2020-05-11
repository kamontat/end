import { isDevelopment, isProduction, isTesting } from "@nmsys/lib-utils";

import { Levels, Level } from "../constants/level";
import { LoggerName } from "../constants/name";
import { TransportExporter, LoggerExporter } from "./envs/object";

export type MetaData = Record<string, number | string | boolean>;

export class Logger {
  private logger?: LoggerExporter;
  private transports?: TransportExporter;

  constructor(private name: LoggerName) {}

  debug(title: string, message?: string, meta: MetaData = {}) {
    this.fetchingLogger();
    this.logger?.debug({ title, message, ...meta });
  }

  verbose(title: string, message?: string, meta: MetaData = {}) {
    this.fetchingLogger();
    this.logger?.verbose({ title, message, ...meta });
  }

  info(title: string, message?: string, meta: MetaData = {}) {
    this.fetchingLogger();
    this.logger?.info({ title, message, ...meta });
  }

  warn(title: string, message?: string, meta: MetaData = {}) {
    this.fetchingLogger();
    this.logger?.warn({ title, message, ...meta });
  }

  error(title: string, message?: string, meta: MetaData = {}) {
    this.fetchingLogger();
    this.logger?.error({ title, message, ...meta });
  }

  setLevel(level: Level) {
    this.setConsoleLevel(level);
    this.setFileLevel(level);
  }

  setConsoleLevel(level: Level) {
    if (this.transports) this.transports.console.level = level;
  }

  setFileLevel(level: Level) {
    if (this.transports) this.transports.outfile.level = level;
  }

  setErrFileLevel(level: Level.WARN | Level.ERROR | Level.SILENT) {
    if (this.transports) this.transports.outfile.level = level;
  }

  get level() {
    return Levels.from(this.logger?.level);
  }

  onTesting() {
    const envs = require("./envs/testing");
    this.transports = envs.transport(this.name);
    this.logger = envs.logger(this.name, this.transports);

    return this;
  }

  onDevelopment() {
    const envs = require("./envs/development");
    this.transports = envs.transport(this.name);
    this.logger = envs.logger(this.name, this.transports);

    return this;
  }

  onProduction() {
    const envs = require("./envs/production");
    this.transports = envs.transport(this.name);
    this.logger = envs.logger(this.name, this.transports);

    return this;
  }

  onAuto() {
    isDevelopment() && this.onDevelopment();
    isProduction() && this.onProduction();
    isTesting() && this.onTesting();

    return this;
  }

  private fetchingLogger() {
    if (!this.logger) this.onAuto();
  }
}

export class ApplicationLogger {
  protected logger: Logger;

  constructor(name: LoggerName) {
    this.logger = new Logger(name);
  }
}
