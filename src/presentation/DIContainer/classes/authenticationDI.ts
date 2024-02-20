import { container } from '../container/DIContainer';
import { AuthenticationController } from '../../controllers/AuthenticationController';

container.bind<AuthenticationController>('AuthenticationController').to(AuthenticationController).inRequestScope();