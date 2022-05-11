import { ExceptionBase, ExceptionCodes } from '@appvise/domain';

export class IncorrectMimetypeException extends ExceptionBase {
  constructor(message = 'Incorrect mimetype') {
    super(message);
  }

  readonly code = ExceptionCodes.conflict;
}
