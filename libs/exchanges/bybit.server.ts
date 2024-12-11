import { RestClientV5 } from 'bybit-api';

export const clientV5 = new RestClientV5({
  key: process.env.BYBIT_DASHBOARD_API_KEY,
  secret: process.env.BYBIT_DASHBOARD_API_SECRET_KEY,
});

export type { GetKlineParamsV5, RestClientType } from 'bybit-api';
