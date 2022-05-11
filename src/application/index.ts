import { handlers as ResourceCommandHandlers } from './command';
import { handlers as ResourceQueryHandlers } from './query';

export * from './command';
export * from './query';
export * from './service';

export const handlers = [...ResourceCommandHandlers, ...ResourceQueryHandlers];
