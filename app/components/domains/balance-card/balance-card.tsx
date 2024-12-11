import { useMemo } from 'react';

import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Amount, Card } from '~/components/uis';
import { roundCurrency } from '~/utils';

type Props = {
  title: string;
  total?: number | string;
  coins?: { coin: string; usdValue: number | string }[];
};

export const BalanceCard = ({ title, total, coins }: Props) => {
  const data = useMemo(() => {
    return coins?.map((c) => ({
      name: c.coin,
      value: roundCurrency(c.usdValue),
    }));
  }, [coins]);

  console.log(data);

  return (
    <Card>
      <p className="mb-4 text-xs font-light">{title}</p>
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <span className="text-sm font-extralight text-red-500">Could not be retrieved.</span>
        )}
      </div>
    </Card>
  );
};
