import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { Inject, Injectable } from '@nestjs/common';
import {
  IncorrectMimetypeException,
  MaxFilesizeExceededException,
  Resource,
  ResourceType,
  File,
  UploadFailedException,
  DeleteFailedException,
  ResourceWriteRepository,
  ResourceDeleted,
} from '../../domain';
import {
  FileUpload,
  FileManager,
  CreateResourceCommand,
  ResourceQuery,
} from '../../application';

// TODO: Not depend on @nestjs/common
@Injectable()
export class ResourceManager {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly fileManager: FileManager,
    @Inject('ResourceWriteRepository')
    private readonly writeRepository: ResourceWriteRepository
  ) {}

  public async upload(args: {
    file: FileUpload;
    destinationPath: string;
    filename?: string;
    parentId?: string;
    parentType?: string;
    resourceId?: string;
    creatorId: string;
    clientCreatedAt?: Date;
  }): Promise<Resource> {
    const {
      file,
      destinationPath,
      filename,
      parentId,
      parentType,
      resourceId,
      creatorId,
      clientCreatedAt,
    } = args;

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      throw new IncorrectMimetypeException();
    }

    let uploadedFile: File;

    try {
      uploadedFile = await this.fileManager.upload(
        file,
        destinationPath,
        filename
      );
    } catch (error: any) {
      if (error.status === 413) {
        throw new MaxFilesizeExceededException();
      }

      console.error('Could not upload file', error);

      throw new UploadFailedException();
    }

    const id = resourceId ? new UUID(resourceId) : UUID.generate();

    await this.commandBus.execute(
      new CreateResourceCommand({
        file: uploadedFile,
        type: ResourceType.image,
        parentId,
        parentType,
        id: id.value,
        creatorId,
        clientCreatedAt,
      })
    );

    return await this.queryBus.execute<ResourceQuery, Resource>(
      new ResourceQuery(id.value)
    );
  }

  async delete(resourceId: string) {
    try {
      const resource = await this.writeRepository.findOneByIdOrThrow(
        resourceId
      );

      // First delete file from storage
      await this.fileManager.delete(resource.file);

      await this.writeRepository.delete(resource);

      this.eventBus.publish(
        new ResourceDeleted({
          aggregateId: resource.id.value,
          filename: resource.file.name,
          parentId: resource.parentId ? resource.parentId.value : undefined,
          parentType: resource.parentType,
        })
      );
    } catch (err) {
      console.error('Error deleting resource: ', err);
      throw new DeleteFailedException();
    }
  }
}
