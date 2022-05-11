import ResourceCommands from './command';
import ResourceQueries from './query';

export default [...ResourceCommands.handlers, ...ResourceQueries.handlers];
