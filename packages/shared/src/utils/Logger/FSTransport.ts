import { createWriteStream, WriteStream } from 'node:fs';
import path from 'node:path';

import { LoggerTransport } from './Transport';

const pathToLogFile = path.resolve('.', 'main.log');

export class FSTransport implements LoggerTransport {
  private _stream: WriteStream;

  constructor() {
    this._stream = createWriteStream(pathToLogFile);
  }

  info(message: string, ...optionalParams: string[]): void {
    this._stream.cork();
    this._stream.write(message);
    this._stream.write(optionalParams.join('\t'));
    this._stream.write('\n');
    this._stream.uncork();
  }

  warn(message: string, ...optionalParams: string[]): void {
    this._stream.cork();
    this._stream.write(message);
    this._stream.write(optionalParams.join('\t'));
    this._stream.write('\n');
    this._stream.uncork();
  }

  error(message: string, ...optionalParams: string[]): void {
    this._stream.cork();
    this._stream.write(message);
    this._stream.write(optionalParams.join('\t'));
    this._stream.write('\n');
    this._stream.uncork();
  }

  destroy(): void {
    this._stream.close();
  }
}
