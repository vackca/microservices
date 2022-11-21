const ENV = process.env.NODE_ENV || 'development';
const IS_PROD = ENV === 'production';
const IS_DEV = ENV === 'development';
const IS_TEST = ENV === 'tests';
const IS_BUILD = process.env.__IS_BUILD__;
const ENVIRONMENT = process.env.ENVIRONMENT || 'prod';
const SRC_FOLDER = IS_BUILD ? 'lib' : 'src';

const MS_NAME = process.env.MS_NAME || 'configuration';
const MS_CONNECTION = process.env.MS_CONNECTION || undefined;
// eslint-disable-next-line @typescript-eslint/naming-convention
const MS_CONNECTION_SRV = Boolean(process.env.MS_CONNECTION_SRV) || false;
const MS_WORKERS = Number(process.env.MS_WORKERS) || 5;
const MS_ENABLE_REMOTE_MIDDLEWARE = Number(process.env.MS_ENABLE_REMOTE_MIDDLEWARE ?? 1);
const MS_INIT_CONFIGS = process.env.MS_INIT_CONFIGS || '[]';
const MS_INIT_MIDDLEWARES = process.env.MS_INIT_MIDDLEWARES || '[]';
const MS_ENABLE_GRAFANA_LOKI_LOG = Number(process.env.MS_ENABLE_GRAFANA_LOKI_LOG || 0);
const MS_OPENTELEMETRY_ENABLE = Number(process.env.MS_OPENTELEMETRY_ENABLE || 0);
const MS_OPENTELEMETRY_OTLP_URL = process.env.MS_OPENTELEMETRY_OTLP_URL || undefined;
const MS_OPENTELEMETRY_OTLP_URL_SRV = Number(process.env.MS_OPENTELEMETRY_OTLP_URL_SRV || 0);
const MS_OPENTELEMETRY_DEBUG = Number(process.env.MS_OPENTELEMETRY_DEBUG || 0);
const MS_CONSOLE_LOG_LEVEL = process.env.MS_CONSOLE_LOG_LEVEL || 'info';

const DB_ENV = {
  URL: process.env.DB_URL || undefined,
  HOST: process.env.DB_HOST || '127.0.0.1',
  PORT: Number(process.env.DB_PORT) || 5432,
  USERNAME: process.env.DB_USERNAME || 'postgres',
  PASSWORD: process.env.DB_PASSWORD || 'example',
  DATABASE: process.env.DB_DATABASE || 'ms-configuration',
};

export {
  MS_NAME,
  MS_CONNECTION,
  MS_CONNECTION_SRV,
  MS_WORKERS,
  DB_ENV,
  MS_ENABLE_REMOTE_MIDDLEWARE,
  MS_INIT_CONFIGS,
  MS_INIT_MIDDLEWARES,
  ENV,
  IS_PROD,
  IS_DEV,
  IS_TEST,
  IS_BUILD,
  ENVIRONMENT,
  SRC_FOLDER,
  MS_ENABLE_GRAFANA_LOKI_LOG,
  MS_OPENTELEMETRY_ENABLE,
  MS_OPENTELEMETRY_OTLP_URL,
  MS_OPENTELEMETRY_OTLP_URL_SRV,
  MS_OPENTELEMETRY_DEBUG,
  MS_CONSOLE_LOG_LEVEL,
};
