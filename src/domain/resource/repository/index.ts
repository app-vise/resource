import { ReadRepository, WriteRepository } from '@appvise/domain';
import { Resource } from '../resource';

export abstract class ResourceReadRepository extends ReadRepository<Resource> {}
export abstract class ResourceWriteRepository extends WriteRepository<Resource> {}
