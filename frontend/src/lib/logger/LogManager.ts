import { ConsoleLogger } from "./ConsoleLogger";
import { Logger } from "./Logger.interface";

class LogManager implements Logger {
  private providers: Logger[];

  constructor(...providers: Logger[]) {
    if (providers.length === 0) {
      throw new Error("At least one provider.");
    }
    this.providers = providers;
  }

  info = (message: string, data: unknown) => {
    this.providers.forEach((provider) => {
      provider.info(message, data);
    });
  };
  error = (message: string, data: unknown) => {
    this.providers.forEach((provider) => {
      provider.error(message, data);
    });
  };
  warn = (message: string, data: unknown) => {
    this.providers.forEach((provider) => {
      provider.warn(message, data);
    });
  };
  debug = (message: string, data: unknown) => {
    this.providers.forEach((provider) => {
      provider.debug(message, data);
    });
  };
}

export const logManager = new LogManager(ConsoleLogger);
