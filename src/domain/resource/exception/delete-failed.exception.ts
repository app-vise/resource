import { ExceptionBase, ExceptionCodes } from '@appvise/domain';

export class DeleteFailedException extends ExceptionBase {
  constructor(message = 'Resource delete could not be executed') {
    super(message);
  }

  readonly code = ExceptionCodes.conflict;
}
