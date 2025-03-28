import { useMemo } from 'react';

const useTransactionType = (sendCurrency, receiveCurrency) => {
  const { transactionType, category } = useMemo(() => {
    let transactionType, category;

    const currencyPairs = [
      { from: 'USD', to: 'EUR' },
      { from: 'EUR', to: 'USD' },
      { from: 'USD', to: 'GBP' },
      { from: 'GBP', to: 'USD' },
      { from: 'EUR', to: 'GBP' },
      { from: 'GBP', to: 'EUR' },
    ];

    const cryptoPairs = [
      { from: 'BTC', to: 'USD' },
      { from: 'USD', to: 'BTC' },
      { from: 'BTC', to: 'EUR' },
      { from: 'EUR', to: 'BTC' },
      { from: 'BTC', to: 'GBP' },
      { from: 'GBP', to: 'BTC' },
    ];

    if (currencyPairs.some(pair => (pair.from === sendCurrency && pair.to === receiveCurrency))) {
      transactionType = 'Money Exchange';
      category = 'Currency Exchange';
    } else if (cryptoPairs.some(pair => (pair.from === sendCurrency && pair.to === receiveCurrency))) {
      transactionType = 'Cryptocurrency Exchange';
      category = 'Cryptocurrency Exchange';
    } else {
      transactionType = 'Wallet Deposit';
      category = 'Deposit';
    }

    return { transactionType, category };
  }, [sendCurrency, receiveCurrency]);

  return { transactionType, category };
};

export default useTransactionType;
