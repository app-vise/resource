import { DateVO, UUID } from '@appvise/domain';
import { File } from '../../domain';

// Import ResourceParentType from config to allow each implementing application to define their own types
// TODO: Find way to allow project to provide config file with ResourceParentTypes
// import { ResourceParentType } from '@config/appvise/resource';
// export { ResourceParentType };

export enum ResourceParentType {
  general = 'general',
  entity = 'entity',
  estimate = 'estimate',
}

export enum ResourceType {
  image = 'image',
  pdf = 'pdf',
}

export enum MimeType {
  jpg = 'jpg',
}

export interface CreateResourceProps {
  file: File;
  type: ResourceType;
  parentId?: UUID;
  parentType?: ResourceParentType;
  clientCreatedAt?: DateVO;
}

export interface ResourceProps extends CreateResourceProps {
  clientCreatedAt: DateVO;
  clientUpdatedAt: DateVO;
}
