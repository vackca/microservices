import { connectionDbOptions } from '@config/db';
import { microserviceOptions, microserviceParams } from '@config/ms';
import { MS_CONFIGS, MS_DISABLE_REMOTE_MIDDLEWARE } from '@constants/index';
// import registerMethods from '@methods/index';
import { start } from '.';

/**
 * Entrypoint for nodejs
 */
void start({
  msOptions: microserviceOptions,
  msParams: microserviceParams,
  dbOptions: connectionDbOptions,
  initConfigs: JSON.parse(MS_CONFIGS),
  registerMethods: () => undefined,
  isDisableRemoteMiddleware: Boolean(MS_DISABLE_REMOTE_MIDDLEWARE),
});
