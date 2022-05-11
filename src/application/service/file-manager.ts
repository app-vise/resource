import { ReadStream } from 'fs-capacitor';
import { File } from '../../domain';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}

export abstract class FileManager {
  abstract upload(
    file: FileUpload,
    destinationPath: string,
    filename?: string
  ): Promise<File>;

  abstract delete(file: File): Promise<void>;
}
