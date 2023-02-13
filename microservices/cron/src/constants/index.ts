import GetConstants from '@lomray/microservice-helpers/helpers/get-constants';
import { version, name } from '../../package.json';

const isBuild = process.env.__IS_BUILD__;
const msNameDefault = 'cron';

const constants = {
  ...GetConstants({ msNameDefault, version, isBuild, packageName: name, withDb: true }),
  MS_WORKERS: Number(process.env.MS_WORKERS || 2),
  MS_INIT_TASKS: process.env.MS_INIT_TASKS || '[]',
};

export default constants;
