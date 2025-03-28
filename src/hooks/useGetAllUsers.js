import { useEffect, useState } from 'react';
import { fetchAllUsers, deleteUser, updateUserBalance } from '../services/adminServices';

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [delText, setDelText] = useState('Delete')
  const [userFriendlyError, setUserFriendlyError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch users
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    setUserFriendlyError(null);
    
    try {
      const adminToken = window.sessionStorage.getItem('adminToken');
      const response = await fetchAllUsers(adminToken);
      console.log("Fetched users response: ", response); // Log the response

      // Check response structure
      if (response && Array.isArray(response.users)) {
        setUsers(response.users);
        console.log("Users data set in state: ", response.users);
      } else {
        setUsers([]);
        console.log("No users found or data structure unexpected.");
      }
    } catch (err) {
      setError(err);
      setUserFriendlyError("Failed to load users. Please try again later.");
      console.error("Error fetching users: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array means this runs on mount only

  // Handle updating user balance
  const handleUpdateUserBalance = async (userId, type, amount) => {
    const data = {
      type,
      amount,
    };

    try {
      const adminToken = window.sessionStorage.getItem('adminToken');
      const result = await updateUserBalance(adminToken, userId, data);
      console.log("Updated user balance result: ", result);
      // Refetch users after updating balance
      await fetchUsers();
    } catch (error) {
      console.error('Failed to update user balance:', error);
      setError(error);
      setUserFriendlyError("Failed to update user balance. Please try again.");
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      setDelText('Removing User...')
      const adminToken = window.sessionStorage.getItem('adminToken');
      await deleteUser(adminToken, userId);
      // Refetch users after deleting
      await fetchUsers();
    } catch (error) {
        setDelText('Delete')
      console.error('Failed to delete user:', error);
      setError(error);
      setUserFriendlyError("Failed to delete user. Please try again.");
    }
  };

  return {
    users,
    isLoading,
    error,
    delText,
    userFriendlyError,
    handleDeleteUser,
    handleUpdateUserBalance,
  };
};

export default useGetAllUsers;
