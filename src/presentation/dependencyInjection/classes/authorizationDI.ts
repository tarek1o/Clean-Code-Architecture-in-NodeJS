import { container } from '../container/DIContainer';
import { Authorization } from '../../middlewares/authorization-validator/AuthorizationValidator';

container.bind<Authorization>('Authorization').to(Authorization).inRequestScope();
