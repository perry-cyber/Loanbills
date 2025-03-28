import api from './Api'

export const fetchTransactions = async (date = null) => {
  const userToken = window.sessionStorage.getItem('userToken');
  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
  };

  const response = await api.get('/transactions', {
    params: date ? { date } : {},
    ...config
  });

  return response.data;
};
  
  export const createTransaction = async (transactionData) => {
    const token = window.sessionStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (!token) {
      throw new Error('User token not found');
    }
    const response = await api.post('/transactions', transactionData, config);
    return response.data;
  };
