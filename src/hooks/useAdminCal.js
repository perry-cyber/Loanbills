import { useQuery } from '@tanstack/react-query';
import useAdminTransactions from './useAdminTransactions';
import useFee from './useFee';
import useCryptoFee from './useCryptoFee';
import { getMarketOverview } from '../services/adminServices';

const useAdminCal = () => {
  const adminToken = window.sessionStorage.getItem('adminToken');

  if (!adminToken) {
    return {
      totalRevenuePercentage: null,
      totalTransactionAmount: null,
      totalRevenue: null,
      totalMarketOverviewAmount: null,
      marketOverviewGraph: null,
      loading: false,
      error: 'No admin token found',
    };
  }

  const { transactions, loading: transactionsLoading, error: transactionsError } = useAdminTransactions();
  const { fee, isLoading: feeLoading } = useFee();
  const { fee: cryptoFee, isLoading: cryptoFeeLoading } = useCryptoFee();

  const { 
    data: marketOverviewGraph, 
    isLoading: marketOverviewLoading, 
    error: marketOverviewError 
  } = useQuery({
    queryKey: ['marketOverviewGraph'],
    queryFn: () => getMarketOverview(adminToken),
    enabled: !!adminToken,
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['totalRevenue'],
    queryFn: async () => {
      if (!transactions || transactionsLoading || feeLoading || cryptoFeeLoading || marketOverviewLoading) {
        return { 
          totalRevenuePercentage: 0, 
          totalTransactionAmount: 0, 
          totalRevenue: 0 
        };
      }

      let totalTransactionAmount = 0;
      let totalRevenue = 0;

      transactions.forEach((transaction) => {
        totalTransactionAmount += Number(transaction.amount); 

        if (transaction.category === "Money Exchange" || transaction.category === "Currency Exchange") {
          totalRevenue += Number(fee); 
        } else {
          totalRevenue += Number(cryptoFee); 
        }
      });

      const totalRevenuePercentage = totalTransactionAmount > 0 ? 
        parseFloat((totalRevenue / totalTransactionAmount) * 100).toFixed(4) : 
        0;

      const totalMarketOverviewAmount = marketOverviewGraph?.datasets[1].data.reduce((a, b) => a + b, 0) || 0;

      return { 
        totalRevenuePercentage, 
        totalTransactionAmount, 
        totalRevenue, 
        totalMarketOverviewAmount 
      };
    },
    enabled: !transactionsLoading && !feeLoading && !cryptoFeeLoading && !!transactions && !!adminToken,
  });

  const formatMarket = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(data?.totalMarketOverviewAmount));

  return { 
    totalRevenuePercentage: data?.totalRevenuePercentage, 
    totalTransactionAmount: data?.totalTransactionAmount, 
    totalRevenue: data?.totalRevenue, 
    totalMarketOverviewAmount: formatMarket,
    marketOverviewGraph,
    loading: isLoading || marketOverviewLoading, 
    error: error || marketOverviewError 
  };
};

export default useAdminCal;