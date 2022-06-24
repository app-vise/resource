import { DateVO } from '@appvise/domain';
import { File } from '../../domain';

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
  mutatedAt?: DateVO;
}

export interface ResourceProps extends CreateResourceProps {
  mutatedAt: DateVO;
}
