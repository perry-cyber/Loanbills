import { useState, useEffect } from 'react';

const useTransactionType = (sendCurrency, receiveCurrency) => {
  const [transactionType, setTransactionType] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const determineTransactionType = () => {
      const cryptoCurrencies = ['BTC', 'ETH', 'BNB', 'USDT'];
      const fiatCurrencies = ['USD', 'EUR', 'GBP', 'RUBY', 'NAIRA'];

      if (cryptoCurrencies.includes(sendCurrency.value) && fiatCurrencies.includes(receiveCurrency.value)) {
        setTransactionType('Crypto to Currency');
        setCategory('Cryptocurrency Exchange');
      } else if (fiatCurrencies.includes(sendCurrency.value) && cryptoCurrencies.includes(receiveCurrency.value)) {
        setTransactionType('Currency to Crypto');
        setCategory('Cryptocurrency Purchase');
      } else if (cryptoCurrencies.includes(sendCurrency.value) && cryptoCurrencies.includes(receiveCurrency.value)) {
        setTransactionType('Crypto to Currency');
        setCategory('Cryptocurrency Exchange');
      } else if (fiatCurrencies.includes(sendCurrency.value) && fiatCurrencies.includes(receiveCurrency.value)) {
        setTransactionType('Currency to Currency');
        setCategory('Crypto Currency Exchange');
      } else {
        setTransactionType('Unknown');
        setCategory('Unknown');
      }
    };

    determineTransactionType();
  }, [sendCurrency, receiveCurrency]);

  return { transactionType, category };
};

export default useTransactionType;
