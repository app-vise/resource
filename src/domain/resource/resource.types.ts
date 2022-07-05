import { DateVO, UUID } from '@appvise/domain';
import { File } from '../../domain';

// Import ResourceParentType from config to allow each implementing application to define their own types
// TODO: Find better way to allow for importing types from project
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ResourceParentType } from '@config/appvise/resource';

export { ResourceParentType };

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
