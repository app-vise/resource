import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DateVO, UUID, NotUniqueException } from '@appvise/domain';
import { Resource, ResourceType, ResourceWriteRepository } from '../../domain';
import { CreateResourceCommand } from './dto/create-resource.command';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateResourceCommand)
export class CreateResourceHandler
  implements ICommandHandler<CreateResourceCommand>
{
  constructor(
    @Inject('ResourceWriteRepository')
    private readonly writeRepository: ResourceWriteRepository
  ) {}

  async execute(command: CreateResourceCommand): Promise<void> {
    if (command.id && (await this.writeRepository.existsById(command.id))) {
      throw new NotUniqueException('Resource id is not unique');
    }

    const resource = Resource.create(
      {
        file: command.file,
        type: command.type as ResourceType,
        clientCreatedAt: command.clientCreatedAt
          ? new DateVO(command.clientCreatedAt)
          : undefined,
      },
      command.id ? new UUID(command.id) : undefined
    );

    await this.writeRepository.save(resource);
  }
}
