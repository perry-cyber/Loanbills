import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { US, EU, GB, } from 'country-flag-icons/react/3x2';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import useExchangeRates from '../hooks/useExchangeRates';
import useFee from '../hooks/useFee';
import useTransactionType from '../hooks/useTransactionType';
import { createTransaction } from '../services/transactionService';

const flagIcons = {
  USD: <US className="w-5 h-5 rounded-full inline-block mr-2" />,
  EUR: <EU className="w-5 h-5 rounded-full inline-block mr-2" />,
  GBP: <GB className="w-5 h-5 rounded-full inline-block mr-2" />,
  RUBY: <span className="w-5 h-5 rounded-full bg-red-500 inline-block mr-2" />, // Placeholder for RUBY
  NAIRA: <span className="w-5 h-5 rounded-full bg-green-500 inline-block mr-2" />, // Placeholder for NAIRA
};

const currencies = ['USD', 'EUR', 'GBP', 'RUBY', 'NAIRA'];

const currencyOptions = currencies.map((currency) => ({
  value: currency,
  label: (
    <div className="flex items-center">
      {flagIcons[currency]}
      {currency}
    </div>
  ),
}));

export default function Rates() {
  const [amountToSend, setAmountToSend] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [sendCurrency, setSendCurrency] = useState('USD');
  const [receiveCurrency, setReceiveCurrency] = useState('EUR');
  const { fee, isLoading, isError } = useFee(); // Example fee
  const [showBreakdown, setShowBreakdown] = useState(false);

  const { exchangeRates, loading, error } = useExchangeRates();
  const { transactionType, category } = useTransactionType(sendCurrency, receiveCurrency); // Use the hook
  const [sendFocus, setSendFocus] = useState(false);
  const [receiveFocus, setReceiveFocus] = useState(false);

  const formatCurrency = (value, currency) => {
    if (!value) return '';
    switch (currency) {
      case 'RUBY':
        return `₽${value}`;
      case 'NAIRA':
        return `₦${value}`;
      default:
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
    }
  };

  const handleAmountToSendChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmountToSend(value);
  };

  useEffect(() => {
    if (amountToSend && exchangeRates[sendCurrency] && exchangeRates[sendCurrency][receiveCurrency]) {
      const rate = exchangeRates[sendCurrency][receiveCurrency];
      const calculatedAmountReceived = (amountToSend * rate).toFixed(2);
      setAmountReceived(calculatedAmountReceived);
    } else {
      setAmountReceived('');
    }
  }, [amountToSend, sendCurrency, receiveCurrency, exchangeRates]);

  const handleConfirmClick = () => {
    setShowBreakdown(true);
  };

  const handleSendClick = async () => {
    // Determine transaction type and category
    const transactionData = {
      name: transactionType, // Use the transaction type from the hook
      amount: amountToSend,
      fee: fee,
      currency: sendCurrency,
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
      console.log(error.message)
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
          className={`flex-1 border-2 rounded-xl px-2 py-1 transition-all ${sendFocus ? 'bg-gray-100 dark:bg-gray-800 border-black' : 'bg-gray-300 dark:bg-gray-700 border-white'}`}
          onFocus={() => setSendFocus(true)}
          onBlur={() => setSendFocus(false)}
        >
          <h3 className="text-[12px] dark:text-white mb-1">You're sending</h3>
          <div className="flex items-center gap-2">
            <Select
              value={currencyOptions.find(option => option.value === sendCurrency)}
              onChange={(selectedOption) => setSendCurrency(selectedOption.value)}
              options={currencyOptions}
              className="w-full text-[25px]"
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderRadius: '0.75rem',
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: '0.75rem',
                }),
              }}
            />
            <input 
              type="text" 
              value={amountToSend} 
              onChange={handleAmountToSendChange} 
              className="w-full p-1 rounded-md text-[25px]"
              onFocus={() => setSendFocus(true)}
              onBlur={() => setSendFocus(false)}
            />
          </div>
          
        </div>
        <div className="flex items-center justify-center">
          <div className="h-7 w-7 rounded-full bg-black text-white  flex items-center justify-center shadow-white-glow">
            <CgArrowsExchangeAltV size={24} />
          </div>
        </div>
        
        <div
          className={`flex-1 border-2 rounded-xl px-2 py-1 transition-all ${receiveFocus ? 'bg-gray-100 dark:bg-gray-800 border-black' : 'bg-gray-300 dark:bg-gray-700 border-white'}`}
          onFocus={() => setReceiveFocus(true)}
          onBlur={() => setReceiveFocus(false)}
        >
          <h3 className="text-[12px] dark:text-white mb-1">The recipient gets</h3>
          <div className="flex items-center gap-2">
            <Select
              value={currencyOptions.find(option => option.value === receiveCurrency)}
              onChange={(selectedOption) => setReceiveCurrency(selectedOption.value)}
              options={currencyOptions}
              className="w-full text-[25px]"
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderRadius: '0.75rem',
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: '0.75rem',
                }),
              }}
            />
            <input 
              type="text" 
              value={formatCurrency(amountReceived, receiveCurrency)} 
              readOnly 
              className="w-full p-1 rounded-md text-[25px]"
              onFocus={() => setReceiveFocus(true)}
              onBlur={() => setReceiveFocus(false)}
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
          <p>Our fee: {formatCurrency(fee, sendCurrency)}</p>
          <p>Total amount we will send: {formatCurrency(amountToSend - fee, sendCurrency)}</p>
          <p>Our live rate: 1 {sendCurrency} = {exchangeRates[sendCurrency][receiveCurrency]} {receiveCurrency}</p>
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
}
