import { Logger } from "./Logger.interface";

export const ConsoleLogger: Logger = {
  info: function (message: string, data: unknown): void {
    console.log(`[INFO]`, message, data);
  },
  error: function (message: string, data: unknown): void {
    console.error(`[ERROR]`, message, data);
  },
  warn: function (message: string, data: unknown): void {
    console.warn(`[WARN]`, message, data);
  },
  debug: function (message: string, data: unknown): void {
    console.debug(`[DEBUG]`, message, data);
  },
};
