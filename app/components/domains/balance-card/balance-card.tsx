import { useMemo } from 'react';

import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Amount, Card } from '~/components/uis';
import { roundCurrency } from '~/utils';

type Props = {
  title: string;
  total?: number | string;
  unrealisedPL?: number | string;
  coins?: { coin: string; usdValue: number | string }[];
};

export const BalanceCard = ({ title, total, unrealisedPL, coins }: Props) => {
  const data = useMemo(() => {
    return coins?.map((c) => ({
      name: c.coin,
      value: roundCurrency(c.usdValue),
    }));
  }, [coins]);

  return (
    <Card>
      <p className="text-xs font-light">{title}</p>
      <div className="flex justify-center">
        {total && coins ? (
          <div>
            <Amount>{total}</Amount>

            <div className="h-40 w-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    // fill="#8884d8"
                    // TODO: https://recharts.org/en-US/examples/PieChartWithCustomizedLabel
                    data={data}
                  />
                  <Tooltip
                    content={(arg) => {
                      if (arg) {
                        console.log(arg);
                        return <div>aa{/* <span>{payload[0].value}</span> */}</div>;
                      }
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {unrealisedPL && (
              <span className="flex items-baseline justify-end gap-1 text-slate-300">
                <span className="text-xs">UPL</span>
                <Amount size="sm">{unrealisedPL}</Amount>
              </span>
            )}
          </div>
        ) : (
          <span className="text-sm font-extralight text-red-500">Could not be retrieved.</span>
        )}
      </div>
    </Card>
  );
};
