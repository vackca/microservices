import { GetMsOptions, GetMsParams } from '@lomray/microservice-helpers';
import type { IGatewayOptions, IGatewayParams } from '@lomray/microservice-nodejs-lib';
import CONST from '@constants/index';
import cors from '@middlewares/cors';
import userInfo from '@middlewares/user-info';

/**
 * Microservice options
 */
const msOptions: Partial<IGatewayOptions> = {
  ...GetMsOptions(CONST),
  batchLimit: CONST.MS_BATCH_LIMIT,
  infoRoute: CONST.MS_INFO_ROUTE,
  reqTimeout: CONST.MS_REQ_TIMEOUT,
  listener: `0.0.0.0:${CONST.MS_LISTENER_PORT}`,
  jsonParams: {
    limit: `${CONST.MS_JSON_LIMIT}mb`,
  },
};

const msMiddlewares = [cors, userInfo];

/**
 * Microservice params
 */
const msParams: Partial<IGatewayParams> = {
  beforeRoute: async (express) => {
    for (const middleware of msMiddlewares) {
      express.use(await middleware());
    }
  },
  ...GetMsParams(),
};

export { msOptions, msParams, msMiddlewares };
