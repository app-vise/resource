import { Command, CommandProps } from '@appvise/domain';
import { File } from '../../../domain';

export class CreateResourceCommand extends Command {
  constructor(props: CommandProps<CreateResourceCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly file!: File;
  readonly type!: string;
  readonly id?: string;
  readonly clientCreatedAt?: Date;
}
