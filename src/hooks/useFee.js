import { useQuery } from '@tanstack/react-query';
import { fetchFee } from '../services/feeService';

const useFee = () => {
  const { data: fee, isLoading, error: isError } = useQuery({
    queryKey: ['fee'],
    queryFn: fetchFee,
    retry: 3,
    staleTime: 30 * 60 * 1000,
  });

  return { fee, isLoading, isError };
};

export default useFee;