import { ExceptionBase, ExceptionCodes } from '@appvise/domain';

export class DeleteFailedException extends ExceptionBase {
  constructor(message = 'Delete could not be executed') {
    super(message);
  }

  readonly code = ExceptionCodes.conflict;
}
