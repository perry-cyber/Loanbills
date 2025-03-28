import { useQuery } from '@tanstack/react-query';
import { fetchAllTransactions } from '../services/adminServices';

const useAdminTransactions = () => {
  const adminToken = window.sessionStorage.getItem('adminToken');
  if (!adminToken) {
    return {
      transactions: null,
      loading: false,
      error: 'No admin token found',
      totalTransactions: 0,
      completedTransactions: 0,
      transactionPercentage: 0,
    };
  }

  const { data: transactions, isLoading: loading, error } = useQuery({
    queryKey: ['adminTransactions'],
    queryFn: () => fetchAllTransactions(adminToken),
    enabled: !!adminToken,
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const totalTransactions = transactions?.length || 0;
  const completedTransactions = transactions?.filter((transaction) => transaction.status === 'Completed').length || 0;
  const transactionPercentage = totalTransactions > 0 ? 
    parseFloat((completedTransactions / totalTransactions) * 100).toFixed(4) : 
    0;

  return {
    transactions,
    loading,
    error,
    totalTransactions,
    completedTransactions,
    transactionPercentage,
  };
};

export default useAdminTransactions;