import { ItemQuery, SearchQuery } from '@appvise/domain';

export class ResourceQuery extends ItemQuery {}
export class ResourcesQuery extends SearchQuery {}

import { ResourceHandler } from './resource.handler';
import { ResourcesHandler } from './resources.handler';

export const ResourceQueryHandlers = [ResourceHandler, ResourcesHandler];
