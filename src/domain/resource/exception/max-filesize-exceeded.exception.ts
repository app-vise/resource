import { ExceptionBase, ExceptionCodes } from '@appvise/domain';

export class MaxFilesizeExceededException extends ExceptionBase {
  constructor(message = 'File is too large') {
    super(message);
  }

  readonly code = ExceptionCodes.conflict;
}
