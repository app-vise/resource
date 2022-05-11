import { ExceptionBase, ExceptionCodes } from '@appvise/domain';

export class UploadFailedException extends ExceptionBase {
  constructor(message = 'Upload could not be processed') {
    super(message);
  }

  readonly code = ExceptionCodes.conflict;
}
