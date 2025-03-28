import { useQuery } from '@tanstack/react-query';
import { fetchCryptoRates } from '../services/exchangeService';

const useCryptoRates = () => {
  const { data: exchangeRates, isLoading: loading, error } = useQuery({
    queryKey: ['cryptoExchangeRates'],
    queryFn: fetchCryptoRates,
    retry: 3,
    staleTime: 30 * 60 * 1000,
  });

  return { exchangeRates, loading, error };
};

export default useCryptoRates;