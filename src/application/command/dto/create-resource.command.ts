import { File } from '../../../domain';

export class CreateResourceCommand {
  constructor(
    public readonly file: File,
    public readonly type: string,
    public readonly id?: string,
    public readonly createdAt?: Date
  ) {}
}
