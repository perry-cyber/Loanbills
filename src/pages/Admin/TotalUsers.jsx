// ... other imports
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faTimes,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import useRegister from "../../hooks/useRegister";
import { toast } from "react-toastify";

export default function TotalUsers() {
  const {
    users,
    error,
    isLoading,
    isError,
    handleDeleteUser,
    handleUpdateUserBalance,
    isUpdatingBalance,
    delText,
    isDeletingUser,
  } = useGetAllUsers();

  const { formData, adminButtonText, handleInputChange, handleSubmit } = useRegister();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [buttonText, setButtonText] = useState("");
  const [amount, setAmount] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const openModal = (user, type) => {
    setSelectedUser(user);
    setTransactionType(type);
    setAmount("");
    setButtonText(type === "add" ? "Add" : "Subtract");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setTransactionType(null);
    setIsModalOpen(false);
  };

  const handleTransaction = async () => {
    // Check if amount is a valid number and greater than zero
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount greater than zero."); // Show an alert for invalid input
      return;
    }

    const transactionData = {
      type: transactionType === "add" ? "credit" : "debit", // Using 'type'
      amount: parseFloat(amount), // Using 'balance' with valid amount
    };

    console.log("Transaction Data:", transactionData);

    try {
      setButtonText(transactionType === "add" ? "Adding..." : "Deducting...");
      await handleUpdateUserBalance(
        selectedUser.id,
        transactionData.type,
        transactionData.amount
      ); // Pass 'type' and 'balance'
      toast.success(`${selectedUser.name}'s balance has been uodated`);
      setUpdateMessage(`${selectedUser.name}'s balance has been updated.`);
      setTimeout(() => {
        setUpdateMessage("");
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  const openDeletePopup = (user) => {
    setSelectedUser(user);
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setSelectedUser(null);
    setIsDeletePopupOpen(false);
  };

  const handleDelete = async () => {
    await handleDeleteUser(selectedUser.id);
    closeDeletePopup();
  };

  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading users...</div>; // Custom loading message
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  if (!users || users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">Total Users</h1>
      <div className="flex-1 overflow-y-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left">Users</th>
              <th className="py-3 px-6 text-left">Current Balance</th>
              <th className="py-3 px-6 text-center">Update Balance</th>
              <th className="py-3 px-6 text-center">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">
                  ${user.wallet_balance?.toLocaleString() || "0.00"}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => openModal(user, "add")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 mr-2"
                  >
                    Add Balance
                  </button>
                  <button
                    onClick={() => openModal(user, "subtract")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  >
                    Subtract Balance
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer hover:text-red-600 transition duration-200"
                    title="Delete User"
                    onClick={() => openDeletePopup(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Balance modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {transactionType === "add" ? "Add to" : "Subtract from"} Balance
              for {selectedUser.name}
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              Current Balance:{" "}
              <span className="font-medium">
                ${selectedUser.wallet_balance?.toLocaleString() || "0.00"}
              </span>
            </p>
            <input
              type="number"
              placeholder={`Enter the amount to ${transactionType}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleTransaction}
                className={`bg-${
                  transactionType === "add" ? "green" : "red"
                }-500 text-white px-4 py-2 rounded hover:bg-${
                  transactionType === "add" ? "green" : "red"
                }-600 transition duration-200 w-full`}
              >
                {buttonText || (transactionType === "add" ? "Add" : "Subtract")}
              </button>
              {isUpdatingBalance && (
                <div className="mt-4 text-center">Updating balance...</div>
              )}
            </div>

            {updateMessage && (
              <p className="mt-4 text-green-600 text-center">{updateMessage}</p>
            )}
          </div>
        </div>
      )}

      {/* Delete modal */}
      {isDeletePopupOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete {selectedUser.name}?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 w-full"
              >
                {delText}
              </button>
              <button
                onClick={closeDeletePopup}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200 w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={closeAddUserModal}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Fullname"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
                required
              />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded transition duration-200 w-full"
              >
                {adminButtonText}
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={openAddUserModal}
        className="fixed left-4 bottom-4 bg-black text-white p-4 rounded-full shadow-lg transition duration-200 z-50"
      >
        <FontAwesomeIcon icon={faUserPlus} size="lg" />
      </button>
    </div>
  );
}
