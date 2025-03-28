import { useQuery } from '@tanstack/react-query';
import { fetchUserDetails } from '../services/userService';

const useUserData = () => {
  const userToken = window.sessionStorage.getItem('userToken');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userDetails'],
    queryFn: () => fetchUserDetails(userToken),
    enabled: !!userToken, // Only fetch if token exists
    retry: 3,
    staleTime: 30 * 60 * 1000, 
  });

  const userName = data?.name;
  const userId = data?.id;

  return { userName, userId, isLoading, error };
};

export default useUserData;