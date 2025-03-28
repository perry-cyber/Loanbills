import { useState } from "react";
import { createDepositRequest } from "../services/userService";

const useCreateDeposit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const userToken = window.sessionStorage.getItem("userToken");

  const createDeposit = async (amount, accountName, bankName) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await createDepositRequest(
        userToken,
        amount,
        "manual payment", // Default payment method
        accountName,
        bankName
      );
      setLoading(false);
      setSuccess("Deposit request created successfully!");
      return Promise.resolve();
    } catch (error) {
      setLoading(false);
      setError(error.message);
      return Promise.reject(error);
    }
  };

  return { createDeposit, loading, error, success };
};

export default useCreateDeposit;