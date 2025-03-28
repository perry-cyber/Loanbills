import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../services/transactionService';

const useTransactions = (initialDate = null) => {
  const { data: transactions, isLoading: loading, error } = useQuery({
    queryKey: ['transactions', initialDate],
    queryFn: () => fetchTransactions(initialDate),
    retry: 3,
    staleTime: 30 * 60 * 1000,
  });

  return { transactions, loading, error };
};

export default useTransactions;