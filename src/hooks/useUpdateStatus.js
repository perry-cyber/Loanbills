import { useState } from "react";
import { updateDepositStatus, updateUserBalance } from "../services/adminServices";

const useUpdateDepositAndBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async (depositId, userId, updateDepositData, updateBalanceData) => {
    setIsLoading(true);
    try {
      const adminToken = sessionStorage.getItem("adminToken");

      const depositResponse = await updateDepositStatus(adminToken, depositId, updateDepositData);
      const balanceResponse = await updateUserBalance(adminToken, userId, updateBalanceData);

      setIsLoading(false);
      setSuccess(true);
      return { depositResponse, balanceResponse };
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const handleReject = async (depositId, updateDepositData) => {
    setIsLoading(true);
    try {
      const adminToken = sessionStorage.getItem("adminToken");

      const depositResponse = await updateDepositStatus(adminToken, depositId, updateDepositData);

      setIsLoading(false);
      setSuccess(true);
      return depositResponse;
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return {
    handleUpdate,
    handleReject,
    isLoading,
    error,
    success,
  };
};

export default useUpdateDepositAndBalance;