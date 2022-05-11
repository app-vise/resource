import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { Resource, ResourceReadRepository } from '../../domain';
import { ResourcesQuery } from '.';

@QueryHandler(ResourcesQuery)
export class ResourcesHandler implements IQueryHandler<ResourcesQuery> {
  constructor(private readonly readRepository: ResourceReadRepository) {}

  async execute(query: ResourcesQuery): Promise<SearchResponse<Resource>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
