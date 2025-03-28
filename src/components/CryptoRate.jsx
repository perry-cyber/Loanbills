import React, { useState, useEffect } from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import Select from 'react-select';
import useCryptoRates from '../hooks/useCryptoExchangeRates';
import useCryptoFee from '../hooks/useCryptoFee';
import useTransactionType from '../hooks/useCryptoTransactionType';
import { createTransaction } from '../services/transactionService';

const Rates = () => {
  const [amountToSend, setAmountToSend] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [sendCurrency, setSendCurrency] = useState({ value: 'BTC', label: 'BTC ₿' });
  const [receiveCurrency, setReceiveCurrency] = useState({ value: 'USD', label: 'USD $' });
  const {fee, isLoading, isError} = useCryptoFee();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { exchangeRates, loading, error } = useCryptoRates();
  const { transactionType, category } = useTransactionType(sendCurrency, receiveCurrency); // Use the hook

  const [sendFocus, setSendFocus] = useState(false);
  const [receiveFocus, setReceiveFocus] = useState(false);

  const cryptoCurrencies = [
    { value: 'BTC', label: 'BTC ₿' },
    { value: 'ETH', label: 'ETH Ξ' },
    { value: 'BNB', label: 'BNB ₿' },
    { value: 'USDT', label: 'USDT $' },
  ];

  const fiatCurrencies = [
    { value: 'USD', label: 'USD $' },
    { value: 'EUR', label: 'EUR €' },
    { value: 'GBP', label: 'GBP £' },
    { value: 'RUBY', label: 'RUBY ₽' },
    { value: 'NAIRA', label: 'NAIRA ₦' },
  ];

  useEffect(() => {
    if (amountToSend && exchangeRates[sendCurrency.value] && exchangeRates[sendCurrency.value][receiveCurrency.value]) {
      const rate = exchangeRates[sendCurrency.value][receiveCurrency.value];
      const calculatedAmountReceived = (amountToSend * rate).toFixed(2);
      setAmountReceived(calculatedAmountReceived);
    } else {
      setAmountReceived('');
    }
  }, [amountToSend, sendCurrency.value, receiveCurrency.value, exchangeRates]);

  const handleAmountToSendChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmountToSend(value);
  };

  const handleConfirmClick = () => {
    setShowBreakdown(true);
  };

  const handleSendClick = async () => {
    const transactionData = {
      name: transactionType, // Use the transaction type from the hook
      amount: amountToSend,
      fee: fee,
      currency: sendCurrency.label,
      date: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
      category: category, // Use the category from the hook
      account_number: "1234567890", // Placeholder for account number
      status: "Completed", // Placeholder for transaction status
    };

    try {
      const createdTransaction = await createTransaction(transactionData);
      alert('Transfer initiated successfully!');
      // Handle the success case
    } catch (error) {
      alert('Failed to initiate transfer. Please try again.');
      // Handle the error case
    }
  };

  return (
    <div className="flex flex-col h-full w-full md:w-[60%] rounded-2xl bg-gray-300 dark:bg-gray-700 p-4 shadow-white-glow">
      <h1 className="text-[14px] md:text-[18px] font-semibold text-black dark:text-white leading-tight mb-2">
        Enter amount to send
      </h1>
      <div className="flex-1 flex flex-col gap-2">
        <div
          className={`flex-1 border-2 rounded-xl px-2 py-1 transition-all ${
            sendFocus ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-700 border-white'
          }`}
          onFocus={() => setSendFocus(true)}
          onBlur={() => setSendFocus(false)}
        >
          <h3 className="text-[12px] dark:text-white mb-1">You're sending</h3>
          <div className="flex items-center gap-2">
            <Select
              value={sendCurrency}
              onChange={(selectedOption) => setSendCurrency(selectedOption)}
              options={cryptoCurrencies}
              styles={{ control: (provided) => ({ ...provided, borderRadius: '0.375rem' }) }}
              className="text-[25px] rounded-md w-full"
            />
            <input
              type="text"
              value={amountToSend}
              onChange={handleAmountToSendChange}
              className="w-full p-1 rounded-md text-[25px]"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-7 w-7 rounded-full bg-black text-white flex items-center justify-center shadow-white-glow">
            <CgArrowsExchangeAltV size={24} />
          </div>
        </div>
        <div
          className={`flex-1 border-2 rounded-xl px-2 py-1 transition-all ${
            receiveFocus ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700 border-white'
          }`}
          onFocus={() => setReceiveFocus(true)}
          onBlur={() => setReceiveFocus(false)}
        >
          <h3 className="text-[12px] dark:text-white mb-1">The recipient gets</h3>
          <div className="flex items-center gap-2">
            <Select
              value={receiveCurrency}
              onChange={(selectedOption) => setReceiveCurrency(selectedOption)}
              options={fiatCurrencies}
              styles={{ control: (provided) => ({ ...provided, borderRadius: '0.375rem' }) }}
              className="text-[25px] rounded-md w-full"
            />
            <input
              type="text"
              value={amountReceived}
              readOnly
              className="w-full p-1 rounded-md text-[25px]"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleConfirmClick}
        className="mt-2 p-1 bg-black dark:bg-white text-white dark:text-black rounded-md hover:border-white text-[12px]"
      >
        Confirm
      </button>
      {showBreakdown && (
        <div className="mt-2 p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white w-full text-[12px]">
          <p>Our fee: {fee} {sendCurrency.value}</p>
          <p>Total amount we will send: {(amountToSend - fee).toFixed(2)} {sendCurrency.value}</p>
          <p>Our live rate: 1 {sendCurrency.value} = {exchangeRates[sendCurrency.value][receiveCurrency.value]} {receiveCurrency.value}</p>
          <button
            onClick={handleSendClick}
            className="mt-2 p-1 bg-black text-white rounded-md text-[12px]"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Rates;
