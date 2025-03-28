import React, { useState, useRef, useEffect } from 'react';
import DepositRequest from './Requests/DepositRequest';
import WithdrawalRequest from './Requests/WithdrawalRequest';
import MoneyExchangeRequest from './Requests/MoneyExchangeRequest';

export default function RequestPage() {
  const [activeRequest, setActiveRequest] = useState('deposit');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const renderRequestForm = () => {
    switch (activeRequest) {
      case 'deposit':
        return <DepositRequest />;
      case 'withdrawal':
        return <WithdrawalRequest />;
      case 'moneyExchange':
        return <MoneyExchangeRequest />;
      default:
        return <DepositRequest />;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Requests</h2>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center px-4 py-2 bg-black text-white rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 "
          >
            {activeRequest === 'deposit' && 'Deposit Request'}
            {activeRequest === 'withdrawal' && 'Withdrawal Request'}
            {activeRequest === 'moneyExchange' && 'Exchange Request'}
            <svg
              className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                isDropdownOpen ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              {/* Arrow */}
              <div className="absolute top-0 right-4 -mt-2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200"></div>

              <ul className="py-2">
                <li
                  onClick={() => {
                    setActiveRequest('deposit');
                    setIsDropdownOpen(false);
                  }}
                  className={`px-4 py-2  hover:text-gray-600 cursor-pointer ${
                    activeRequest === 'deposit' ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  Deposit Request
                </li>
                <li
                  onClick={() => {
                    setActiveRequest('withdrawal');
                    setIsDropdownOpen(false);
                  }}
                  className={`px-4 py-2  hover:text-gray-600 cursor-pointer ${
                    activeRequest === 'withdrawal' ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  Withdrawal Request
                </li>
                <li
                  onClick={() => {
                    setActiveRequest('moneyExchange');
                    setIsDropdownOpen(false);
                  }}
                  className={`px-4 py-2 hover:text-gray-600 cursor-pointer ${
                    activeRequest === 'moneyExchange' ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  Exchange Request
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        {renderRequestForm()}
      </div>
    </div>
  );
}
