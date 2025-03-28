import React, { useState } from 'react';
import { FaPoundSign, FaEuroSign, FaDollarSign, FaBitcoin,  FaEthereum, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { TbCurrencyRubel, TbCurrencyTugrik, TbCurrencyNaira, } from 'react-icons/tb';
import { RiBnbFill } from "react-icons/ri";
import { SiTether } from 'react-icons/si';
import { updateLiveExchangeRates, updateCryptoRates } from '../../services/adminServices';

export default function LiveRates() {
  const [selectedPair, setSelectedPair] = useState(null);
  const [rates, setRates] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currencyPairs = [
    { id: 1, from: 'USD', to: 'EUR', fromKey: 'USD', toKey: 'EUR', fromSymbol: <FaDollarSign />, toSymbol: <FaEuroSign /> },
    { id: 3, from: 'USD', to: 'GBP', fromKey: 'USD', toKey: 'GBP', fromSymbol: <FaDollarSign />, toSymbol: <FaPoundSign /> },
    { id: 4, from: 'USD', to: 'RUBY', fromKey: 'USD', toKey: 'RUBY', fromSymbol: <FaDollarSign />, toSymbol: <TbCurrencyRubel /> },
    { id: 5, from: 'USD', to: 'NAIRA', fromKey: 'USD', toKey: 'NAIRA', fromSymbol: <FaDollarSign />, toSymbol: <TbCurrencyNaira /> },
    { id: 6, from: 'EUR', to: 'USD', fromKey: 'EUR', toKey: 'USD', fromSymbol: <FaEuroSign />, toSymbol: <FaDollarSign /> },
    { id: 7, from: 'EUR', to: 'GBP', fromKey: 'EUR', toKey: 'GBP', fromSymbol: <FaEuroSign />, toSymbol: <FaPoundSign /> },
    { id: 8, from: 'EUR', to: 'RUBY', fromKey: 'EUR', toKey: 'RUBY', fromSymbol: <FaEuroSign />, toSymbol: <TbCurrencyRubel /> },
    { id: 9, from: 'EUR', to: 'NAIRA', fromKey: 'EUR', toKey: 'NAIRA', fromSymbol: <FaEuroSign />, toSymbol: <TbCurrencyNaira /> },
    { id: 10, from: 'GBP', to: 'USD', fromKey: 'GBP', toKey: 'USD', fromSymbol: <FaPoundSign />, toSymbol: <FaDollarSign /> },
    { id: 11, from: 'GBP', to: 'EUR', fromKey: 'GBP', toKey: 'EUR', fromSymbol: <FaPoundSign />, toSymbol: <FaEuroSign /> },
    { id: 2, from: 'GBP', to: 'RUBY', fromKey: 'GBP', toKey: 'RUBY', fromSymbol: <FaPoundSign />, toSymbol: <TbCurrencyRubel /> },
    { id: 12, from: 'GBP', to: 'NAIRA', fromKey: 'GBP', toKey: 'NAIRA', fromSymbol: <FaPoundSign />, toSymbol: <TbCurrencyNaira /> },
    { id: 13, from: 'RUBY', to: 'USD', fromKey: 'RUBY', toKey: 'USD', fromSymbol: <TbCurrencyRubel />, toSymbol: <FaDollarSign /> },
    { id: 14, from: 'RUBY', to: 'EUR', fromKey: 'RUBY', toKey: 'EUR', fromSymbol: <TbCurrencyRubel />, toSymbol: <FaEuroSign /> },
    { id: 15, from: 'RUBY', to: 'GBP', fromKey: 'RUBY', toKey: 'GBP', fromSymbol: <TbCurrencyRubel />, toSymbol: <FaPoundSign /> },
    { id: 16, from: 'RUBY', to: 'NAIRA', fromKey: 'RUBY', toKey: 'NAIRA', fromSymbol: <TbCurrencyRubel />, toSymbol: <TbCurrencyNaira /> },
    { id: 17, from: 'NAIRA', to: 'USD', fromKey: 'NAIRA', toKey: 'USD', fromSymbol: <TbCurrencyNaira />, toSymbol: <FaDollarSign /> },
    { id: 18, from: 'NAIRA', to: 'EUR', fromKey: 'NAIRA', toKey: 'EUR', fromSymbol: <TbCurrencyNaira />, toSymbol: <FaEuroSign /> },
    { id: 19, from: 'NAIRA', to: 'GBP', fromKey: 'NAIRA', toKey: 'GBP', fromSymbol: <TbCurrencyNaira />, toSymbol: <FaPoundSign /> },
    { id: 20, from: 'NAIRA', to: 'RUBY', fromKey: 'NAIRA', toKey: 'RUBY', fromSymbol: <TbCurrencyNaira />, toSymbol: <TbCurrencyRubel /> },
  ];
  

  const cryptoPairs = [
    { id: 13, from: 'BTC', to: 'USD', fromKey: 'BTC', toKey: 'USD', fromSymbol: <FaBitcoin />, toSymbol: <FaDollarSign /> },
    { id: 14, from: 'BTC', to: 'EUR', fromKey: 'BTC', toKey: 'EUR', fromSymbol: <FaBitcoin />, toSymbol: <FaEuroSign /> },
    { id: 15, from: 'BTC', to: 'GBP', fromKey: 'BTC', toKey: 'GBP', fromSymbol: <FaBitcoin />, toSymbol: <FaPoundSign /> },
    { id: 16, from: 'BTC', to: 'RUBY', fromKey: 'BTC', toKey: 'RUBY', fromSymbol: <FaBitcoin />, toSymbol: <TbCurrencyRubel /> },
    { id: 17, from: 'BTC', to: 'NAIRA', fromKey: 'BTC', toKey: 'NAIRA', fromSymbol: <FaBitcoin />, toSymbol: <TbCurrencyNaira /> },
    { id: 18, from: 'ETH', to: 'USD', fromKey: 'ETH', toKey: 'USD', fromSymbol: <FaEthereum />, toSymbol: <FaDollarSign /> },
    { id: 19, from: 'ETH', to: 'EUR', fromKey: 'ETH', toKey: 'EUR', fromSymbol: <FaEthereum />, toSymbol: <FaEuroSign /> },
    { id: 20, from: 'ETH', to: 'GBP', fromKey: 'ETH', toKey: 'GBP', fromSymbol: <FaEthereum />, toSymbol: <FaPoundSign /> },
    { id: 21, from: 'ETH', to: 'RUBY', fromKey: 'ETH', toKey: 'RUBY', fromSymbol: <FaEthereum />, toSymbol: <TbCurrencyRubel /> },
    { id: 22, from: 'ETH', to: 'NAIRA', fromKey: 'ETH', toKey: 'NAIRA', fromSymbol: <FaEthereum />, toSymbol: <TbCurrencyNaira /> },
    { id: 25, from: 'BNB', to: 'USD', fromKey: 'BNB', toKey: 'USD', fromSymbol: <RiBnbFill />, toSymbol: <FaDollarSign /> },
    { id: 26, from: 'BNB', to: 'EUR', fromKey: 'BNB', toKey: 'EUR', fromSymbol: <RiBnbFill />, toSymbol: <FaEuroSign /> },
    { id: 27, from: 'BNB', to: 'GBP', fromKey: 'BNB', toKey: 'GBP', fromSymbol: <RiBnbFill />, toSymbol: <FaPoundSign /> },
    { id: 28, from: 'BNB', to: 'RUBY', fromKey: 'BNB', toKey: 'RUBY', fromSymbol: <RiBnbFill />, toSymbol: <TbCurrencyRubel /> },
    { id: 29, from: 'BNB', to: 'NAIRA', fromKey: 'BNB', toKey: 'NAIRA', fromSymbol: <RiBnbFill />, toSymbol: <TbCurrencyNaira /> },
    { id: 30, from: 'USDT', to: 'USD', fromKey: 'USDT', toKey: 'USD', fromSymbol: <SiTether />, toSymbol: <FaDollarSign /> },
    { id: 31, from: 'USDT', to: 'EUR', fromKey: 'USDT', toKey: 'EUR', fromSymbol: <SiTether />, toSymbol: <FaEuroSign /> },
    { id: 32, from: 'USDT', to: 'GBP', fromKey: 'USDT', toKey: 'GBP', fromSymbol: <SiTether />, toSymbol: <FaPoundSign /> },
    { id: 33, from: 'USDT', to: 'RUBY', fromKey: 'USDT', toKey: 'RUBY', fromSymbol: <SiTether />, toSymbol: <TbCurrencyRubel /> },
    { id: 34, from: 'USDT', to: 'NAIRA', fromKey: 'USDT', toKey: 'NAIRA', fromSymbol: <SiTether />, toSymbol: <TbCurrencyNaira /> },
  ];
  

  const handleRateChange = (e, pairId) => {
    setRates((prevRates) => ({ ...prevRates, [pairId]: e.target.value })); // Update specific rate based on pairId
  };

  const handleUpdate = (pair) => {
    // Check if the rate for the selected pair is defined
    const newRate = rates[pair.id]; // Get the specific rate for the pair
    if (newRate === undefined || newRate === '') {
      setShowWarningModal(true);
      setTimeout(() => {
        setShowWarningModal(false);
      }, 2000);
      return;
    }
    setSelectedPair(pair);
    setShowConfirmModal(true);
  };

  const confirmUpdate = async () => {
    setIsLoading(true);
    const adminToken = sessionStorage.getItem('adminToken');

    if (!adminToken) {
      setIsLoading(false);
      alert('Admin token not found. Please log in.');
      return;
    }

    const data = {
      from_currency: selectedPair.fromKey.toUpperCase(),
      to_currency: selectedPair.toKey.toUpperCase(),
      rate: parseFloat(rates[selectedPair.id]), // Use the specific rate from state
    };

    try {
      const isCurrencyPair = currencyPairs.some(
        (pair) => pair.fromKey === selectedPair.fromKey && pair.toKey === selectedPair.toKey
      );

      if (isCurrencyPair) {
        await updateLiveExchangeRates(adminToken, selectedPair.id, data);
        console.log('Currency pair updated:', data);
      } else {
        await updateCryptoRates(adminToken, selectedPair.id, data);
        console.log('Crypto pair updated:', data);
      }

      setRates((prevRates) => ({ ...prevRates, [selectedPair.id]: '' })); // Clear the input for the updated pair
      setSelectedPair(null); 

      setIsLoading(false);
      setShowConfirmModal(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error updating rate:', error);
      alert('Failed to update rate. Please try again.');
    }
  };

  const newRate = selectedPair ? rates[selectedPair.id] : '';
  

  return (
    <div className="min-h-screen h-screen flex flex-col bg-black text-white p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8 text-left">Live Currency Rates</h1>

      {/* Currency Pairs Section */}
      <h2 className="text-xl font-semibold mb-4">Currency Exchange Rates</h2>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto mb-8">
        {currencyPairs.map((pair) => (
          <div key={`${pair.fromKey}-${pair.toKey}`} className="bg-white text-black p-6 rounded-lg shadow-lg h-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {pair.fromSymbol}
                <span className="text-lg font-semibold">{pair.from}</span>
                <span className="text-lg font-semibold">to</span>
                {pair.toSymbol}
                <span className="text-lg font-semibold">{pair.to}</span>
              </div>
            </div>
            <input
              type="number"
              value={rates[pair.id] || ''} // Set value for each specific input
              onChange={(e) => handleRateChange(e, pair.id)} // Pass the pair id to the handler
              className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={`Set rate for ${pair.from} to ${pair.to}`}
            />
            <button
              onClick={() => handleUpdate(pair)}
              className="mt-4 w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-black"
            >
              Update Rate
            </button>
          </div>
        ))}
      </div>

      {/* Crypto Pairs Section */}
      <h2 className="text-xl font-semibold mb-4">Crypto Exchange Rates</h2>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto mb-24">
        {cryptoPairs.map((pair) => (
          <div key={`${pair.fromKey}-${pair.toKey}`} className="bg-white text-black p-6 rounded-lg shadow-lg h-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {pair.fromSymbol}
                <span className="text-lg font-semibold">{pair.from}</span>
                <span className="text-lg font-semibold">to</span>
                {pair.toSymbol}
                <span className="text-lg font-semibold">{pair.to}</span>
              </div>
            </div>
            <input
              type="number"
              value={rates[pair.id] || ''} // Set value for each specific input
              onChange={(e) => handleRateChange(e, pair.id)} // Pass the pair id to the handler
              className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={`Set rate for ${pair.from} to ${pair.to}`}
            />
            <button
              onClick={() => handleUpdate(pair)}
              className="mt-4 w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-black"
            >
              Update Rate
            </button>
          </div>
        ))}
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
            <h2 className="text-xs mb-4">Confirm Update</h2>
            <p className='text-xs'>Are you sure you want to change the rate for {selectedPair?.from} to {selectedPair?.to} to {newRate}?</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={confirmUpdate}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                {isLoading ? (
                  <div className="loader border-t-4 border-white border-solid rounded-full w-6 h-6 animate-spin mx-auto"></div>
                ) : (
                  'Yes'
                )}
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96 flex items-center space-x-4">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <div>
              <h2 className="text-xs mb-2">Success</h2>
              <p className='text-xs'>You have successfully updated the live rate for {selectedPair?.from} to {selectedPair?.to} at {newRate}</p>
            </div>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96 flex items-center space-x-4">
            <FaTimesCircle className="text-red-500 text-2xl" />
            <div>
              <h2 className="text-xs mb-2">Warning</h2>
              <p className='text-xs'>Please enter a valid rate before updating.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
