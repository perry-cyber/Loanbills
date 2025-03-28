import { useQuery } from '@tanstack/react-query';
import { fetchCryptoFee } from '../services/feeService';

const useCryptoFee = () => {
  const { data: fee, isLoading, error: isError } = useQuery({
    queryKey: ['cryptoFee'],
    queryFn: fetchCryptoFee,
    retry: 3,
    staleTime: 30 * 60 * 1000,
  });

  return { fee, isLoading, isError };
};

export default useCryptoFee;