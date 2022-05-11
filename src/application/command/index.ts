import { CreateResourceHandler } from './create-resource.handler';
import { DeleteResourceHandler } from './delete-resource.handler';

export { CreateResourceCommand } from './dto/create-resource.command';
export { DeleteResourceCommand } from './dto/delete-resource.command';

export default {
  handlers: [CreateResourceHandler, DeleteResourceHandler],
};
