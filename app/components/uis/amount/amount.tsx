import { roundCurrency } from '~/utils';

type Props = {
  children: number | string;
  unit?: string;
  className?: string;
};

export const Amount = ({ children, unit = 'USD', className }: Props) => {
  return (
    <span className={`${className}`}>
      <span className="text-md mr-1 font-bold">{roundCurrency(Number(children))}</span>
      <span className="text-sm font-light">{unit}</span>
    </span>
  );
};
