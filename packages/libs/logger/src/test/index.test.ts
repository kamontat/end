import { Logger, LoggerName, Level } from "..";

describe("Logger", () => {
  it("try logger", () => {
    process.env.NODE_ENV = "development";
    const logger = new Logger(LoggerName.is().e("development"));
    logger.onAuto();

    logger.debug("show");
    logger.verbose("show");
    logger.info("show");
    logger.warn("show");
    logger.error("show");

    logger.setLevel(Level.SILENT);
    logger.warn("not show");
    logger.error("not show");

    logger.setLevel(Level.ERROR);
    logger.verbose("not show");
    logger.info("not show");
  });
});
