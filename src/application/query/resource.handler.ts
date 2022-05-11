import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Resource, ResourceReadRepository } from '../../domain';
import { ResourceQuery } from '.';

@QueryHandler(ResourceQuery)
export class ResourceHandler implements IQueryHandler<ResourceQuery> {
  constructor(private readonly readRepository: ResourceReadRepository) {}

  async execute(query: ResourceQuery): Promise<Resource> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
