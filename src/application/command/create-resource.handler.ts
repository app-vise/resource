import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DateVO, UUID, NotUniqueException } from '@appvise/domain';
import { Resource, ResourceType, ResourceWriteRepository } from '../../domain';
import { CreateResourceCommand } from './dto/create-resource.command';

@CommandHandler(CreateResourceCommand)
export class CreateResourceHandler
  implements ICommandHandler<CreateResourceCommand>
{
  constructor(private readonly writeRepository: ResourceWriteRepository) {}

  async execute(command: CreateResourceCommand): Promise<void> {
    if (command.id && (await this.writeRepository.existsById(command.id))) {
      throw new NotUniqueException('Resource id is not unique');
    }

    const resource = Resource.create(
      {
        file: command.file,
        type: command.type as ResourceType,
        createdAt: command.createdAt
          ? new DateVO(command.createdAt)
          : undefined,
      },
      command.id ? new UUID(command.id) : undefined
    );

    await this.writeRepository.save(resource);
  }
}
