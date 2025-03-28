import axios from 'axios';
import api from './Api';

export const fetchExchangeRates = async () => {
  try {
    const response = await api.get('/exchange-rates');
    // Transform the data into a usable format
    const rates = response.data.reduce((acc, rate) => {
      if (!acc[rate.from_currency]) {
        acc[rate.from_currency] = {};
      }
      acc[rate.from_currency][rate.to_currency] = parseFloat(rate.rate); 
      return acc;
    }, {});
    console.log(rates); 
    return rates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    throw error;
  }
};

export const fetchCryptoRates = async () => {
  try {
    const response = await api.get('/crypto-exchange-rates');
    const rates = response.data.reduce((acc, rate) => {
      if (!acc[rate.from_currency]) {
        acc[rate.from_currency] = {}
      }
      acc[rate.from_currency][rate.to_currency] = parseFloat(rate.rate);
      return acc;
    }, {});
    console.log(rates);
    return rates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    throw error;        
  }
}