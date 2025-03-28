import { useQuery } from '@tanstack/react-query';
import { getBalance } from '../services/userService';

const useBalance = (userId) => {
  const { data: balance, isLoading: loading, error } = useQuery({
    queryKey: ['balance', userId],
    queryFn: () => getBalance(userId),
    retry: 3,
    staleTime: 30 * 60 * 1000,
  });
  const formatBalance = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(balance));
  return { balance : formatBalance, loading, error };
};

export default useBalance;