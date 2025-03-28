import api from './Api';

export const fetchAdminDetails = async (adminToken) => {
    try {
      const response = await api.get('/admin/details', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data
    } catch (error) {
      throw error;
    }
  };

  export const fetchAllTransactions = async (adminToken) => {
    try {
      const response = await api.get('/admin/transactions', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getMarketOverview = async (adminToken, month, year) => {
    try {
      const params = {};
      if (month && year && week) {
        params.month = month;
        params.year = year;
        params.week = week;
      }
  
      const response = await api.get('/admin/market-overview', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const getDepositRequest = async (adminToken) => {
    try {
      const response = await api.get('/admin/getdeposits', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  export const updateDepositStatus = async (adminToken, depositId, data) => {
    try {
      const response = await api.put(`/admin/updatedeposit/${depositId}`, data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateUserBalance = async (adminToken, userId, data) => {
    try {
      const response = await api.put(`/admin/user/${userId}/balance`, data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateDepositAndBalance = async (adminToken, depositData, balanceData) => {
    try {
      const [depositResponse, balanceResponse] = await Promise.all([
        updateDepositStatus(adminToken, depositData),
        updateUserBalance(adminToken, balanceData),
      ]);
      return { depositResponse, balanceResponse };
    } catch (error) {
      throw error;
    }
  }

  export const fetchAllUsers = async (adminToken) => {
    try {
      const response = await api.get('/admin/users', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      console.log("API response:", response); // Log the entire response
      return response.data; // Ensure this returns the expected data structure
    } catch (error) {
      throw error;
    }
  };
  

  export const deleteUser = async (adminToken, userId) => {
    try {
      const response = await api.delete(`/admin/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateLiveExchangeRates = async (adminToken, id, data) => {
    try {
      const response = await api.put(`/admin/exchange-rates/${id}`, data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateCryptoRates = async (adminToken, id, data) => {
    try {
      const response = await api.put(`/admin/crypto-exchange-rate/${id}`, data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateCryptoFee = async (adminToken, data) => {
    try {
      const response = await api.put('/admin/crypto-fee', data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateFee = async (adminToken, data) => {
    try {
      const response = await api.put('/admin/fee', data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  





