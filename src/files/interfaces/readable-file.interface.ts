import { Readable } from 'stream';

export interface ReadableFileInterface {
  fileStream: Readable;
  bufferSize: number;
}
