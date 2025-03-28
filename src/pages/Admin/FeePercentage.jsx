import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { updateCryptoFee, updateFee } from '../../services/adminServices'; // Adjust this import path as needed

export default function FeePercentage({ adminToken }) {
  const [currencyFee, setCurrencyFee] = useState('');
  const [cryptoFee, setCryptoFee] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUpdateType, setCurrentUpdateType] = useState('');

  const handleCurrencyFeeChange = (e) => {
    setCurrencyFee(e.target.value);
  };

  const handleCryptoFeeChange = (e) => {
    setCryptoFee(e.target.value);
  };

  const requestCurrencyFeeUpdate = async () => {
    setIsLoading(true);
    const adminToken = sessionStorage.getItem('adminToken');
    try {
      await updateFee(adminToken, { fee_percentage: parseInt(currencyFee, 10) });
      setShowSuccessModal(true);
      setCurrencyFee(''); // Clear input field after successful update
      setTimeout(() => {
        setShowSuccessModal(false); // Hide success modal after 3 seconds
      }, 3000);
    } catch (error) {
      console.error('Error updating fee:', error);
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  };
  
  const requestCryptoFeeUpdate = async () => {
    setIsLoading(true);
    const adminToken = sessionStorage.getItem('adminToken');
    try {
      await updateCryptoFee(adminToken, { crypto_fee_percentage: parseInt(cryptoFee, 10) });
      setShowSuccessModal(true);
      setCryptoFee(''); // Clear input field after successful update
      setTimeout(() => {
        setShowSuccessModal(false); // Hide success modal after 3 seconds
      }, 3000);
    } catch (error) {
      console.error('Error updating fee:', error);
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  };

  const handleUpdateClick = (type) => {
    setCurrentUpdateType(type);
    setShowConfirmModal(true);
  };

  const confirmUpdate = () => {
    if (currentUpdateType === 'currency') {
      requestCurrencyFeeUpdate();
    } else if (currentUpdateType === 'crypto') {
      requestCryptoFeeUpdate();
    }
  };

  return (
    <div className='bg-black h-screen py-4 px-4'>
      <h1 className="text-2xl font-bold mb-8 text-left text-white">Fee Percentage</h1>
      <div className="flex justify-center space-x-4">
        {/* Currency Fee Section */}
        <div className="bg-white p-6 rounded-lg w-1/2">
          <h2 className="text-xl font-bold mb-4">Fee for Currency to Currency Exchange</h2>
          <input
            type="number"
            placeholder="Set Fee"
            value={currencyFee}
            onChange={handleCurrencyFeeChange}
            className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={() => handleUpdateClick('currency')}
            className="mt-4 w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            Update Fee
          </button>
        </div>

        {/* Cryptocurrency Fee Section */}
        <div className="bg-white p-6 rounded-lg w-1/2">
          <h2 className="text-xl font-bold mb-4">Fee for Cryptocurrency to Currency Exchange</h2>
          <input
            type="number"
            placeholder="Set Fee"
            value={cryptoFee}
            onChange={handleCryptoFeeChange}
            className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={() => handleUpdateClick('crypto')}
            className="mt-4 w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            Update Fee
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
            <h2 className="text-xs mb-4">Confirm Update</h2>
            <p className='text-xs'>Are you sure you want to update the fee?</p>
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
              <p className='text-xs'>You have successfully updated the fee.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
