import { useQuery } from '@tanstack/react-query';
import { getDepositRequest } from '../services/adminServices';

const usePendingDeposits = () => {
  const adminToken = sessionStorage.getItem('adminToken');

  if (!adminToken) {
    throw new Error('adminToken is required');
  }

  return useQuery({
    queryKey: ['pendingDeposits', adminToken],
    queryFn: async ({ queryKey }) => {
      try {
        const response = await getDepositRequest(queryKey[1]);

        console.log('API Response:', response);

        if (!response || !Array.isArray(response)) {
          throw new Error('Invalid response data structure');
        }

        // Filter and map response data
        const pendingDeposits = response.filter((deposit) => deposit.status === 'pending').map((deposit) => ({
          id: deposit.deposit_id,
          name: deposit.username,
          amount: deposit.amount,
          accountName: deposit.account_name,
          bankName: deposit.bank_name,
          depositID: deposit.deposit_id,
          userID: deposit.user_id
        }));

        return pendingDeposits.length > 0 ? pendingDeposits : { message: 'No pending deposits found' };
      } catch (error) {
        console.error('Error fetching pending deposits:', error);
        throw new Error(`API Error: ${error.message}`);
      }
    },
    cacheTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3, // Retry 3 times on failure
    onError: (error) => {
      console.error('Error fetching pending deposits:', error);
    },
  });
};

export default usePendingDeposits;