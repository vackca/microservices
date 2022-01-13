import { connectionDbOptions } from '@config/db';
import { microserviceOptions, microserviceParams } from '@config/ms';
import { MS_CONFIGS, MS_DISABLE_REMOTE_MIDDLEWARE, MS_MIDDLEWARES } from '@constants/index';
import registerMethods from '@methods/index';
// eslint-disable-next-line unicorn/import-index
import { start } from './index';

/**
 * Entrypoint for nodejs
 */
export default start({
  msOptions: microserviceOptions,
  msParams: microserviceParams,
  dbOptions: connectionDbOptions,
  initConfigs: JSON.parse(MS_CONFIGS),
  initMiddlewares: JSON.parse(MS_MIDDLEWARES),
  registerMethods,
  isDisableRemoteMiddleware: Boolean(MS_DISABLE_REMOTE_MIDDLEWARE),
});
