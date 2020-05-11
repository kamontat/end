import { Logger } from "../models/logger";
import { LoggerName } from "../constants/name";

interface ServiceOption {
  name: LoggerName;
  auto?: boolean;
}

export class LoggerService {
  static new(opt: ServiceOption) {
    const option = { auto: true, ...opt };

    const logger = new Logger(option.name);
    if (option.auto) logger.onAuto();
    return logger;
  }
}
