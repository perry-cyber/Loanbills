import api from './Api';
// import { useQuery, queryCache } from '@tanstack/react-query';

export const fetchUserDetails = async (userToken) => {
  try {
    const response = await api.get('/user-details', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log('Fetch User Details Response:', response);
    return response.data;
  } catch (error) {
    console.error('Fetch User Details Error:', error);
    throw error;
  }
};

export const getBalance = async (userId) => {
  try {
    const userToken = window.sessionStorage.getItem('userToken');
    const response = await api.get(`/user/${userId}/balance`, {
      headers: {
        'Authorization': `Bearer ${userToken}`, 
      }
    });
    return response.data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

export const updateBalance = async (userId, newBalance) => {
    try {
        await api.put(`/user/${userId}/balance`, { balance: newBalance }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Adjust as necessary
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error updating balance:", error);
        throw error;
    }
};

export const getNotifications = async () => {
  try {
    const userToken = window.sessionStorage.getItem('userToken');
    const response = await api.get('/notifications', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markAsRead = async (notificationId) => {
  try {
      await api.post(`/notifications/${notificationId}/read`);
  } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
  }
};

export const deleteNotification = async (notificationId) => {
  try {
      await api.delete(`/notifications/${notificationId}`);
  } catch (error) {
      throw new Error("Failed to delete notification: " + error.message);
  }
};

export const createDepositRequest = async (userToken, amount, paymentMethod, accountName, bankName) => {
  try {
    const response = await api.post('/createdeposit', {
      amount,
      payment_method: paymentMethod,
      account_name: accountName,
      bank_name: bankName,
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log('Create Deposit Request Response:', response);
    console.log({
      amount,
      payment_method: paymentMethod,
      account_name: accountName,
      bank_name: bankName,
    });
    return response.data;
  } catch (error) {
    console.error('Create Deposit Request Error:', error);
    throw error;
  }
};