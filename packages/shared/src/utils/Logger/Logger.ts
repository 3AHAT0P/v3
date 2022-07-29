/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoggerTransport } from './Transport';
import { ConsoleTransport } from './ConsoleTransport';
import { FSTransport } from './FSTransport';

export enum LogLevel {
  INFO = 0,
  WARN = 1,
  ERROR = 2,
  QUIET = 3,
}

export interface LoggerOptions {
  transport?: LoggerTransport;
  useTimestamp?: boolean;
  mode?: LogLevel;
}

export class Logger {
  private _transport: LoggerTransport;

  private _mode: LogLevel = LogLevel.ERROR;

  private _useTimestamp: boolean = false;

  public get mode(): LogLevel {
    return this._mode;
  }

  public set mode(value: LogLevel) {
    this._mode = value;
  }

  private _buildMessage(type: string, place: string) {
    let result = `${type} => `;
    if (this._useTimestamp) result += `[${(new Date()).toISOString()}] `;
    result += `${place} | `;
    return result;
  }

  private _paramsToText(optionalParams: any[]): string[] {
    return optionalParams.map((item: any) => {
      if (item instanceof Error) return `${item.toString()}\n${item.stack ?? ''}`;
      if (typeof item === 'object') return JSON.stringify(item);

      return item?.toString() ?? 'undefined';
    });
  }

  constructor(options: LoggerOptions = {}) {
    if (options.transport != null) this._transport = options.transport;
    else this._transport = new ConsoleTransport();

    if (options.mode != null) this._mode = options.mode;
    if (options.useTimestamp != null) this._useTimestamp = options.useTimestamp;
  }

  public info(place: string, ...optionalParams: any[]): void {
    if (this._mode <= LogLevel.INFO) {
      this._transport.info(this._buildMessage('INFO', place), ...this._paramsToText(optionalParams));
    }
  }

  public warn(place: string, ...optionalParams: any[]): void {
    if (this._mode <= LogLevel.WARN) {
      this._transport.warn(this._buildMessage('WARN', place), ...this._paramsToText(optionalParams));
    }
  }

  public error(place: string, ...optionalParams: any[]): void {
    if (this._mode <= LogLevel.ERROR) {
      this._transport.error(this._buildMessage('ERROR', place), ...this._paramsToText(optionalParams));
    }
  }

  public catchAndLogError(place: string, promise: Promise<any>): void {
    promise.catch((error) => this.error(place, error));
  }
}

const defaultLoggerOptions: LoggerOptions = {
  transport: new FSTransport(),
  useTimestamp: true,
  mode: LogLevel.INFO,
};

export const logger = new Logger(defaultLoggerOptions);

export const loginfo = logger.info.bind(logger);

export const logwarn = logger.warn.bind(logger);

export const logerror = logger.error.bind(logger);
