import { AggregateRoot, ArgumentInvalidException, UUID } from '@appvise/domain';
import { File, ResourceCreated, ResourceType } from '../index';
import { CreateResourceProps, ResourceProps } from './resource.types';

export class Resource extends AggregateRoot<ResourceProps> {
  protected readonly _id!: UUID;

  static create(create: CreateResourceProps, id?: UUID): Resource {
    id = id ?? UUID.generate();

    const props: ResourceProps = {
      ...create,
    };

    const { createdAt } = props;
    delete props.createdAt;

    const entity = new Resource({
      id,
      createdAt,
      updatedAt: createdAt,
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

  validate(): void {
    const resourceTypeKeys = Object.keys(ResourceType);

    if (!resourceTypeKeys.includes(this.props.type)) {
      throw new ArgumentInvalidException('type is not a valid ResourceType');
    }
  }
}
