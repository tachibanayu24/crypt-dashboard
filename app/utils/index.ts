import lodash from 'lodash';

const roundCurrency = (value: number | string) => {
  return lodash.round(Number(value), 2);
};

const isSmallCurrency = (value: number | string) => {
  return lodash.round(Number(value), 2) < 0.01;
};

export { isSmallCurrency, lodash, roundCurrency };
