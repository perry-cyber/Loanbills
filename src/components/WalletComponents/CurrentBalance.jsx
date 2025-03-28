import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Ensure all required components of chart.js are imported
import Modal from "../../model/Modal"; // Import the Modal component
import useBalance from "../../hooks/useBalance";
import useCreateDeposit from "../../hooks/useCreateDeposit";

export default function CurrentBalance({ userId }) {
  const { balance } = useBalance(userId); // Initialize balance with bal[0].balance
  const [showBalance, setShowBalance] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing the first modal visibility
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false); // State for managing the second modal visibility
  const [showForm, setShowForm] = useState(false); // State for managing form visibility
  const { createDeposit, loading, error, success } = useCreateDeposit();

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const formattedBalance = balance
    ? balance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  const data = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Balance",
        data: [2.0, 2.5, 3.0, 257584.89, 3.2, 359.1, balance || 0],
        borderColor: balance > 50 ? "green" : "red",
        fill: false,
        borderWidth: 2,
        stepped: true,
        pointBackgroundColor: balance > 50 ? "green" : "red",
        spanGaps: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const openModal = () => {
    setIsModalOpen(true);
    setShowForm(false); // Reset form visibility when opening the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowForm(false); // Reset form visibility when closing the modal
  };

  const handleDepositClick = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  // // Open the second modal
  // };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const accountName = document.getElementById("accountName").value;
    const bankName = document.getElementById("bankName").value;
    const amount = document.getElementById("amount").value;

    createDeposit(amount, accountName, bankName).then(() => {
      closeModal();
      setIsProcessingModalOpen(true);
    }).catch((error) => {
      // Handle error
      setError(error.message);
    });
  };

  const closeProcessingModal = () => {
    setIsProcessingModalOpen(false); // Close the processing modal
  };

  return (
    <div className="flex flex-col lg:flex-row lg:w-[70%] sm:w-full mt-5 lg:space-x-4 bg-black gap-6 dark:bg-white rounded-lg shadow-md p-6">
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-gray-500 dark:text-gray-300 text-sm lg:text-[14px]">
              Available balance
            </p>
            <button
              onClick={toggleBalanceVisibility}
              className="ml-2 flex items-center"
            >
              {showBalance ? (
                <FaEye color="white" size={30} />
              ) : (
                <FaEyeSlash color="white" size={30} />
              )}
            </button>
          </div>
          <p className="text-sm lg:text-[13px] dark:text-black text-white underline">
            Transaction History
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <h1 className="text-2xl lg:text-4xl font-bold mb-1 dark:text-black text-white whitespace-nowrap overflow-hidden overflow-ellipsis">
              {showBalance && balance !== null && balance !== undefined
                ? `$${formattedBalance}`
                : "******"}
            </h1>

          </div>
          {/* Add Money Button */}
          <button
            onClick={openModal}
            className="bg-white text-black dark:bg-black dark:text-white py-1 px-4 text-xs lg:text-[12px] rounded-full whitespace-nowrap"
          >
            + Add Money
          </button>
        </div>
      </div>

      {/* Separate Chart Section with Reduced Height */}
      <div className="w-full lg:w-1/2 hidden lg:block">
        <div className="h-32">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Modal for Adding Money */}
      <Modal show={isModalOpen} onClose={closeModal}>
        <div className="max-h-96 overflow-y-auto">
          {" "}
          {/* Make modal content scrollable */}
          <h2 className="text-lg font-semibold dark:text-white text-gray-800">
            Fund your Wallet
          </h2>
          <p className="text-[10px]">
            Transfer to any of the accounts provided below.
          </p>
          <p className="text-[10px]">
            Each transaction usually takes up to 5 minutes before the account is
            updated.
          </p>
          <div className="rounded-lg border p-4 mt-4 dark:bg-white dark:text-black">
            <h1>
              Bank Name: <span>Wema Bank</span>
            </h1>
            <h1>
              Account Number: <span>88837373282822872</span>
            </h1>
            <h1>
              Account Name: <span>Oloade mi Asake</span>
            </h1>
          </div>
          <div className="rounded-lg border p-4 mt-4 dark:bg-white dark:text-black">
            <h1>
              Bank Name: <span>Wema Bank</span>
            </h1>
            <h1>
              Account Number: <span>88837373282822872</span>
            </h1>
            <h1>
              Account Name: <span>Oloade mi Asake</span>
            </h1>
          </div>
          <div className="rounded-lg border p-4 mt-4 dark:bg-white dark:text-black">
            <h1>
              Bank Name: <span>Wema Bank</span>
            </h1>
            <h1>
              Account Number: <span>88837373282822872</span>
            </h1>
            <h1>
              Account Name: <span>Oloade mi Asake</span>
            </h1>
          </div>
          <button
            className="text-white bg-green-500 p-3 mt-2 rounded-lg w-full"
            onClick={handleDepositClick}
          >
            I have deposited
          </button>
          {showForm && (
      <form className="flex flex-col mt-4" onSubmit={handleFormSubmit}>
        <label htmlFor="amount" className="text-gray-700 dark:text-gray-300">
          Enter Amount
        </label>
        <input
          type="number"
          id="amount"
          className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:text-white mb-4"
        />
        <label
          htmlFor="bankName"
          className="text-gray-700 dark:text-gray-300"
        >
          Enter Bank name
        </label>
        <input
          type="text"
          id="bankName"
          className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:text-white mb-4"
        />
        <label
          htmlFor="accountName"
          className="text-gray-700 dark:text-gray-300"
        >
          Enter Account name
        </label>
        <input
          type="text"
          id="accountName"
          className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
        {error && <p style={{ color: "red" }}>{getErrorMessage(error)}</p>}
        {success && <p style={{ color: "green" }}>{getSuccessMessage(success)}</p>}
      </form>
          )}
        </div>
      </Modal>

      {/* Modal for Transaction Processing */}
      <Modal show={isProcessingModalOpen} onClose={closeProcessingModal}>
        <div className="p-4 flex flex-col gap-5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.05"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10ZM7 13.5l2.25 2L17 9"
            />
          </svg>

          <div className="text-center">
            <h1 className="font-bold">We are processing your Transaction</h1>
            <p>Give us a moment. Your transaction is being processed.</p>
          </div>

          <button
            className="text-white bg-green-500 p-3 rounded-lg w-full"
            onClick={closeProcessingModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
  
}

const getErrorMessage = (error) => {
  if (error.includes("Network Error")) {
    return "Failed to connect to the server.";
  } else if (error.includes("422")) {
    return "Invalid request. Please check your input.";
  } else {
    return "An error occurred. Please try again.";
  }
};

const getSuccessMessage = (success) => {
  return success;
};