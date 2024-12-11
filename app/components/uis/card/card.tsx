import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Card = ({ children }: Props) => {
  return (
    <div className="shadow-inner-diagonal-lg inline-block transform rounded-lg bg-slate-900 p-6 transition-transform hover:scale-105">
      {children}
    </div>
  );
};
