import {
  AggregateRoot,
  ArgumentInvalidException,
  DateVO,
  UUID,
} from '@appvise/domain';
import { File, ResourceCreated, ResourceType } from '../index';
import { CreateResourceProps, ResourceProps } from './resource.types';

export class Resource extends AggregateRoot<ResourceProps> {
  protected readonly _id!: UUID;

  static create(create: CreateResourceProps, id?: UUID): Resource {
    id = id ?? UUID.generate();
    const clientCreatedAt = create.clientCreatedAt ?? DateVO.now();

    const props: ResourceProps = {
      ...create,
      clientCreatedAt,
      clientUpdatedAt: clientCreatedAt,
    };

    const entity = new Resource({
      id,
      props,
    });

    entity.addEvent(
      new ResourceCreated({
        aggregateId: id.value,
        filename: props.file.name,
      })
    );

    return entity;
  }

  get type(): ResourceType {
    return this.props.type;
  }

  get file(): File {
    return this.props.file;
  }

  get clientCreatedAt(): DateVO {
    return this.props.clientCreatedAt;
  }

  get clientUpdatedAt(): DateVO {
    return this.props.clientUpdatedAt;
  }

  validate(): void {
    const resourceTypeKeys = Object.keys(ResourceType);

    if (!resourceTypeKeys.includes(this.props.type)) {
      throw new ArgumentInvalidException('type is not a valid ResourceType');
    }
  }
}
