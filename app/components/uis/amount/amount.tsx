import { roundCurrency } from '~/utils';

type Props = {
  children: number | string;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export const Amount = ({ children, size = 'md', unit = 'USD', className }: Props) => {
  const SIZE = {
    sm: ['text-sm', 'text-xs'],
    md: ['text-md', 'text-sm'],
    lg: ['text-lg', 'text-md'],
  };

  return (
    <span className={`${className}`}>
      <span className={`${SIZE[size][0]} mr-1 font-bold`}>{roundCurrency(Number(children))}</span>
      <span className={`${SIZE[size][1]} font-light`}>{unit}</span>
    </span>
  );
};
