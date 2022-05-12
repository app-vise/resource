import { ResourceCommandHandlers } from './command';
import { ResourceQueryHandlers } from './query';

export * from './command';
export * from './query';
export * from './service';

export const ResourceApplicationHandlers = [
  ...ResourceCommandHandlers,
  ...ResourceQueryHandlers,
];
