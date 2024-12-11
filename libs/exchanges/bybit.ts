import { RestClientV5 } from 'bybit-api';

export const testnetClient = new RestClientV5({
  testnet: true,
});

export type { GetKlineParamsV5, RestClientType } from 'bybit-api';
