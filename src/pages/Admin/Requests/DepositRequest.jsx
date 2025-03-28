import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import usePendingDeposits from "../../../hooks/useAdminDeposit";
import useUpdateDepositAndBalance from "../../../hooks/useUpdateStatus";
import { useQueryClient } from '@tanstack/react-query';

const DepositRequest = () => {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [requestToReject, setRequestToReject] = useState(null);
  const [isApprovalPopupVisible, setApprovalPopupVisibility] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectedRequest, setRejectedRequest] = useState(null);
  const [undoVisible, setUndoVisible] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const { data, isLoading, error } = usePendingDeposits();
  const queryClient = useQueryClient();
  const {
    handleUpdate,
    handleReject,
    isLoading: isUpdating,
    error: updateError,
    success,
  } = useUpdateDepositAndBalance();

  useEffect(() => {
    let countdownTimer = countdown;
    const intervalId = setInterval(() => {
      countdownTimer -= 1;
      setCountdown(countdownTimer);
      if (countdownTimer <= 0) {
        clearInterval(intervalId);
        setUndoVisible(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown, undoVisible]);

  const approveRequest = (request) => {
    setSelectedRequest(request);
    setApprovalPopupVisibility(true);
  };

  const handleApproval = async () => {
    const amountToCredit = document.getElementById("amountToCredit").value;
    if (!amountToCredit) return;
  
    const updateDepositData = {
      status: "approved",
    };
  
    const updateBalanceData = {
      balance: parseInt(amountToCredit),
    };
  
    try {
      await handleUpdate(
        selectedRequest.depositID, 
        selectedRequest.userID,
        updateDepositData,
        updateBalanceData
      );
      setApprovalPopupVisibility(false);
      document.getElementById("amountToCredit").value = "";
      setSelectedRequest(null);
      alert("Deposit approved. The user has been notified.");
      queryClient.invalidateQueries(['pendingDeposits', sessionStorage.getItem('adminToken')]);
    } catch (error) {
      console.error(error);
      setError(error); // Display error to the user
    }
  };

  const initiateReject = (id) => {
    setRequestToReject(id);
    setPopupVisibility(true);
  };

  const confirmReject = async () => {
    const request = data.find((r) => r.id === requestToReject);
    if (request) {
      const updateDepositData = {
        status: "rejected",
      };

      try {
        await handleReject(request.depositID, updateDepositData);
        setUndoVisible(true);
        setCountdown(8);
        setPopupVisibility(false);
        setRequestToReject(null);
        alert("Deposit rejected. The user has been notified.");
        queryClient.invalidateQueries(['pendingDeposits', sessionStorage.getItem('adminToken')]);
      } catch (error) {
        console.error(error);
        setError(error); // Display error to the user
      }
    }
  };

  const cancelReject = () => {
    setPopupVisibility(false);
    setRequestToReject(null);
  };

  const undoReject = () => {
    setUndoVisible(false);
    setRejectedRequest(null);
  };

  if (error) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg text-gray-800">
        <h2 className="text-2xl font-bold text-black">Error</h2>
        <p className="text-lg text-red-500">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg text-gray-800">
        <h2 className="text-2xl font-bold text-black">Loading...</h2>
      </div>
    );
  }

  if (typeof data === 'object' && data.message) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg text-gray-800">
        <h2 className="text-2xl font-bold text-black">Deposit Requests</h2>
        <p className="text-lg text-gray-500">{data.message}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg text-gray-800 relative">
      <div className="flex justify-between items-center mb-6 relative">
        <h2 className="text-2xl font-bold text-black">Deposit Requests</h2>
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
        {data.map((request, index) => (
          <div key={request.id} className="p-4 bg-gray-900 rounded-lg shadow-md text-white flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold">{request.name}</h4>
              <p className="text-sm text-gray-400">
                Requested an Amount of ${request.amount}{" "}
              </p>
            </div>  
            <div>
              <h4 className="text-lg font-semibold">Bank Name</h4>
              <p className="text-sm text-gray-400">
              {request.bankName}{" "}
              </p>
            </div>  
            <div>
              <h4 className="text-lg font-semibold">Account Name</h4>
              <p className="text-sm text-gray-400">
              {request.accountName}{" "}
              </p>
            </div>  
            <div className="flex space-x-3">
              <button
                onClick={() => approveRequest(request)}
                className="flex items-center px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200"
              >
                <FaCheckCircle className="mr-1" />
                Approve
              </button>
              <button
                onClick={() => initiateReject(request.id)}
                className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
              >
                <FaTimesCircle className="mr-1" />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Approval Popup */}
      {isApprovalPopupVisible && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Approve Deposit for {selectedRequest.name}
            </h3>
            <p className="mb-4">
              Requested Amount:{" "}
              <span className="font-medium">${selectedRequest.amount}</span>
            </p>
            <input
              id="amountToCredit"
              type="number"
              placeholder="Enter amount to credit"
              className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleApproval}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200 w-full mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => setApprovalPopupVisibility(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition duration-200 w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">Confirm Rejection</h3>
            <p className="mb-4">
              Are you sure you want to reject this deposit request?
            </p>
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

export default DepositRequest;