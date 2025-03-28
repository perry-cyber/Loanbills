import { useQuery } from '@tanstack/react-query';
import { fetchAdminDetails } from '../services/adminServices';

const useAdminData = () => {
  const adminToken = window.sessionStorage.getItem('adminToken');
  if (!adminToken) {
    return { adminData: null, loading: false, error: 'No admin token found' };
  }

  const { data: adminData, isLoading: loading, error } = useQuery({
    queryKey: ['adminData'],
    queryFn: () => fetchAdminDetails(adminToken),
    enabled: !!adminToken,
    retry: 3,
    staleTime: 30 * 60 * 1000,
  });

  return { adminData, loading, error };
};

export default useAdminData;