import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { Injectable } from '@nestjs/common';
import {
  IncorrectMimetypeException,
  MaxFilesizeExceededException,
  Resource,
  ResourceType,
  File,
  UploadFailedException,
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
    private readonly fileUploader: FileManager
  ) {}

  public async upload(
    file: FileUpload,
    destinationPath: string,
    filename?: string,
    resourceId?: string
  ): Promise<Resource> {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      throw new IncorrectMimetypeException();
    }

    let uploadedFile: File;

    try {
      uploadedFile = await this.fileUploader.upload(
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
      new CreateResourceCommand(uploadedFile, ResourceType.image, id.value)
    );

    return await this.queryBus.execute<ResourceQuery, Resource>(
      new ResourceQuery(id.value)
    );
  }
}
