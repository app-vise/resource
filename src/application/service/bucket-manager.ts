import { UUID } from '@appvise/domain';

export abstract class BucketManager {
  abstract createBucket(accountId: UUID): Promise<string>;

  abstract deleteBucket(accountId: UUID): Promise<boolean>;
}
