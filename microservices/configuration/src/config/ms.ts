import { Log } from '@lomray/microservice-helpers';
import type { IMicroserviceOptions, IMicroserviceParams } from '@lomray/microservice-nodejs-lib';
import { ConsoleLogDriver } from '@lomray/microservice-nodejs-lib';
import { MS_CONNECTION, MS_CONNECTION_SRV, MS_NAME, MS_WORKERS } from '@constants/index';
import { version } from '../../package.json';

const microserviceOptions: Partial<IMicroserviceOptions> = {
  name: MS_NAME,
  connection: MS_CONNECTION,
  isSRV: MS_CONNECTION_SRV,
  workers: MS_WORKERS,
  version,
};

const microserviceParams: Partial<IMicroserviceParams> = {
  logDriver: ConsoleLogDriver((_, message) => Log.info(message)),
};

export { microserviceOptions, microserviceParams };
