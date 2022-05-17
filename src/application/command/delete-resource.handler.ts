import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { ResourceDeleted, ResourceWriteRepository } from '../../domain';
import { DeleteResourceCommand } from './dto/delete-resource.command';
import { FileManager } from '../..';
import { Inject } from '@nestjs/common';

@CommandHandler(DeleteResourceCommand)
export class DeleteResourceHandler
  implements ICommandHandler<DeleteResourceCommand>
{
  constructor(
    private readonly fileManager: FileManager,
    private readonly eventBus: EventBus,
    @Inject('ResourceWriteRepository')
    private readonly writeRepository: ResourceWriteRepository
  ) {}

  async execute(command: DeleteResourceCommand): Promise<boolean> {
    const resource = await this.writeRepository.findOneByIdOrThrow(
      command.resourceId
    );

    // First delete file from storage
    await this.fileManager.delete(resource.file);

    await this.writeRepository.delete(resource);

    this.eventBus.publish(
      new ResourceDeleted({
        aggregateId: resource.id.value,
        filename: resource.file.name,
      })
    );

    return true;
  }
}
