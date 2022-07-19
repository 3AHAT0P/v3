import { LoggerTransport } from './Transport';

export class ConsoleTransport implements LoggerTransport {
  private _context: Console;

  constructor() {
    this._context = console;
  }

  info(message: string, ...optionalParams: string[]): void {
    this._context.info(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: string[]): void {
    this._context.warn(message, ...optionalParams);
  }

  error(message: string, ...optionalParams: string[]): void {
    this._context.error(message, ...optionalParams);
  }

  destroy(): void { }
}
