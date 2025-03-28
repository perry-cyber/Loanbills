import api from "./Api"

export const fetchFee = async () => {
    try {
      const response = await api.get('/fee');
      return response.data.fee_percentage;
    } catch (error) {
      console.error('Error fetching fee:', error);
      throw error;
    }
  };

  export const fetchCryptoFee = async () => {
    try {
      const response = await api.get('/crypto-fee');
      return response.data.crypto_fee_percentage;
    } catch (error){
      console.error('Error fetching cryptoFee:');
      throw error;
    }
  }