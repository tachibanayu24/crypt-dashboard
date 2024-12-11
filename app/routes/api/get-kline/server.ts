import { type GetKlineParamsV5, testnetClient } from 'libs/exchanges/bybit';

type Params = {
  category: GetKlineParamsV5['category'];
  symbol: GetKlineParamsV5['symbol'];
  interval: GetKlineParamsV5['interval'];
  start?: GetKlineParamsV5['start'];
  end?: GetKlineParamsV5['end'];
};

export const clientLoader = async (_params: Params) => {
  const res = await testnetClient.getKline({
    category: 'inverse',
    symbol: 'BTCUSD',
    interval: '60',
    start: new Date().getTime() - 24 * 3600 * 1000,
    end: new Date().getTime(),
  });
  const result = res.result;

  return result;
};
