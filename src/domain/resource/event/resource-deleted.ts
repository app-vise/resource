import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ResourceDeleted extends DomainEvent {
  constructor(props: DomainEventProps<ResourceDeleted>) {
    super(props);

    Object.assign(this, props);
  }

  readonly filename!: string;
  readonly parentId?: string;
  readonly parentType?: string;
}
