import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates } from '../services/exchangeService';

const useExchangeRates = () => {
  const { data: exchangeRates, isLoading: loading, error } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: fetchExchangeRates,
    retry: 3,
    staleTime: 30 * 60 * 1000,
  });

  return { exchangeRates, loading, error };
};

export default useExchangeRates;