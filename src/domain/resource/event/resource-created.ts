import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ResourceCreated extends DomainEvent {
  constructor(props: DomainEventProps<ResourceCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly filename!: string;
}
