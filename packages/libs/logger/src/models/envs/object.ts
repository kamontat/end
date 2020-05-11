import winston from "winston";
import { LoggerName } from "../../constants/name";

const console = winston.transports.Console;
const file = winston.transports.File;
export type TransportExporter = { console: typeof console; outfile: typeof file; errfile: typeof file };
export type LoggerExporter = winston.Logger;

export type TransportFn = () => TransportExporter;
export type LoggerFn = (name: LoggerName, transports: TransportExporter) => LoggerExporter;
