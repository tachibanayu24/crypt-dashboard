import { clientV5 } from 'libs/exchanges/bybit.server';

import type { Route } from './+types/route';

import { BalanceCard } from '~/components/domains/balance-card/balance-card';
import { Amount } from '~/components/uis';
import { isSmallCurrency, roundCurrency } from '~/utils';

export function meta() {
  return [{ title: 'Crypt dashboard' }, { name: 'description', content: 'My crypt dashboard' }];
}

export const loader = async () => {
  const unifiedRes = await clientV5.getWalletBalance({ accountType: 'UNIFIED' });
  const unified = unifiedRes.result.list[0];
  const validUnifiedCoins = unified.coin.filter((c) => !isSmallCurrency(c.usdValue));

  const fundRes = await clientV5.getAllCoinsBalance({ accountType: 'FUND' });
  const tickers = await clientV5.getTickers({ category: 'spot' });
  const validFunds = fundRes.result.balance.filter((b) => Number(b.transferBalance) > 0 || Number(b.walletBalance) > 0);
  const validFundsWithPrice = validFunds
    .map((b) => {
      const ticker = tickers.result.list.find((t) => {
        return t.symbol === `${b.coin}USDT`;
      });
      if (!ticker || (b.coin === 'USDT' && isSmallCurrency(b.walletBalance))) {
        return undefined;
      } else if (b.coin === 'USDT') {
        return {
          ...b,
          usdValue: Number(b.walletBalance),
        };
      } else {
        return {
          ...b,
          usdValue: Number(b.walletBalance) * Number(ticker.lastPrice),
        };
      }
    })
    .filter((b) => b !== undefined);

  return {
    unified: { ...unified, totalEquity: Number(unified.totalEquity), coin: validUnifiedCoins },
    fund: { coin: validFundsWithPrice, totalEquity: validFundsWithPrice.reduce((acc, b) => acc + b.usdValue, 0) },
  };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { unified, fund } = loaderData;

  const total = unified.totalEquity + fund.totalEquity;

  console.log(unified.totalPerpUPL);

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="shadow-inner-diagonal-md inline rounded-full bg-purple-700 px-3 py-1 text-xs font-light">
          TOTAL EQUITY
        </div>
        <Amount className="inline text-xl">{total}</Amount>
      </div>

      <div className="flex gap-8 py-6">
        <BalanceCard
          title="UNIFIED ACCOUNT"
          total={unified.totalEquity}
          unrealisedPL={unified.totalPerpUPL}
          coins={unified.coin}
        />
        <BalanceCard title="FUND ACCOUNT" total={fund.totalEquity} coins={fund.coin} />
        {/* APIなし */}
        <BalanceCard title="EARN ACCOUNT" />
      </div>

      <ul>
        {unified.coin.map((c) => (
          <li key={c.coin}>
            <strong>{c.coin}</strong>
            <br />
            usdValue: {roundCurrency(c.usdValue)}
            <br />
            amount: {c.walletBalance}
          </li>
        ))}
        <div className="h-20" />
        {fund.coin.map((c) => (
          <li key={c.coin}>
            <strong>{c.coin}</strong>
            <br />
            usdValue: {roundCurrency(c.usdValue)}
            <br />
            amount: {c.walletBalance}
          </li>
        ))}
      </ul>
    </div>
  );
}
