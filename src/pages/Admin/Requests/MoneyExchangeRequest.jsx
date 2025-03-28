import React, { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const MoneyExchangeRequest = () => {
  // State to manage money exchange requests
  const [requests, setRequests] = useState([
    { id: 1, username: 'JohnDoe', amount: 500, type: 'crypto', cryptoType: 'Bitcoin', wallet: '1A2b3C4d5E6F7G8H9I0J', accountDetails: null },
    { id: 2, username: 'JaneSmith', amount: 1200, type: 'currency', accountDetails: { name: 'Jane Smith', accountNumber: '123456789', bank: 'Bank of Example' }, cryptoType: null, wallet: null },
    { id: 3, username: 'AlexBrown', amount: 750, type: 'crypto', cryptoType: 'Ethereum', wallet: '0xA1B2C3D4E5F6G7H8I9J0K', accountDetails: null },
  ]);

  // State to handle popup visibility and selected request
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [requestToReject, setRequestToReject] = useState(null);
  const [rejectedRequest, setRejectedRequest] = useState(null);
  const [undoVisible, setUndoVisible] = useState(false);
  const [countdown, setCountdown] = useState(8);

  // Initiate rejection process
  const initiateReject = (id) => {
    setRequestToReject(id);
    setPopupVisibility(true);
  };

  // Confirm rejection of a request
  const confirmReject = () => {
    const request = requests.find(r => r.id === requestToReject);
    if (request) {
      setRequests(requests.filter(r => r.id !== requestToReject));
      setRejectedRequest(request);
      setUndoVisible(true);
      
      // Start countdown for undo
      let countdownTimer = 8;
      setCountdown(countdownTimer);
      const intervalId = setInterval(() => {
        countdownTimer -= 1;
        setCountdown(countdownTimer);
        if (countdownTimer <= 0) {
          clearInterval(intervalId);
          setUndoVisible(false);
        }
      }, 1000);
    }
  };

  // Cancel rejection process
  const cancelReject = () => {
    setPopupVisibility(false);
    setRequestToReject(null);
  };

  // Undo rejection of a request
  const undoReject = () => {
    if (rejectedRequest) {
      setRequests([...requests, rejectedRequest]);
      setUndoVisible(false);
      setRejectedRequest(null);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg text-gray-800 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 relative">
        <h2 className="text-2xl font-bold text-black">Money Exchange Requests</h2>
        {undoVisible && (
          <div className="absolute top-0 right-0 flex items-center space-x-4 mt-4 mr-4">
            <p className="text-red-500 font-semibold text-xs">{countdown}s</p>
            <button
              onClick={undoReject}
              className="px-2 py-2 bg-black text-white rounded-lg shadow text-xs transition duration-200"
            >
              Undo
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="p-4 bg-gray-900 rounded-lg shadow-md text-white"
          >
            <div className="mb-4">
              <h4 className="text-lg font-semibold">{request.username}</h4>
              <p className="text-sm text-gray-400">Requested Amount: ${request.amount}</p>
              {request.type === 'crypto' ? (
                <>
                  <p className="text-sm text-gray-400">Crypto Type: {request.cryptoType}</p>
                  <p className="text-sm text-gray-400">Wallet: 
                    <span className="ml-2 text-blue-300 cursor-pointer" onClick={() => navigator.clipboard.writeText(request.wallet)}>
                      {request.wallet}
                    </span>
                  </p>
                </>
              ) : (
                request.accountDetails && (
                  <div>
                    <p className="text-sm text-gray-400">Name: {request.accountDetails.name}</p>
                    <p className="text-sm text-gray-400">Account Number: {request.accountDetails.accountNumber}</p>
                    <p className="text-sm text-gray-400">Bank: {request.accountDetails.bank}</p>
                  </div>
                )
              )}
            </div>
            <button
              onClick={() => initiateReject(request.id)}
              className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
            >
              <FaTimesCircle className="mr-1" />
              Reject
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">Confirm Rejection</h3>
            <p className="mb-4">Are you sure you want to reject this money exchange request?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmReject}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
              >
                Yes
              </button>
              <button
                onClick={cancelReject}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoneyExchangeRequest;
