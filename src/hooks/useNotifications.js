import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markAsRead, deleteNotification as deleteNotificationService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import  useUserData  from './useUserData'; 


const useNotifications = () => {
  const { userId, loading: userLoading, error: userError } = useUserData();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading: loading, error } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => getNotifications(), // Removed userId parameter
    retry: 3,
    staleTime: 30 * 60 * 1000,
    enabled: !!userId, // Added enabled option
  });

  const hasNewNotifications = notifications?.some(notification => !notification.read);

  const navigate = useNavigate();

  const { mutateAsync: markAsReadMutate, isLoading: markAsReadLoading } = useMutation({
    mutationKey: ['markAsRead', userId],
    mutationFn: (notificationId) => markAsRead(notificationId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications', userId] }),
  });

  const { mutateAsync: deleteNotificationMutate, isLoading: deleteNotificationLoading } = useMutation({
    mutationKey: ['deleteNotification', userId],
    mutationFn: (notificationId) => deleteNotificationService(notificationId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications', userId] }),
  });

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsReadMutate(notificationId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteNotificationMutate(notificationId);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    notifications,
    loading: loading || markAsReadLoading || deleteNotificationLoading || userLoading,
    error: error || userError,
    hasNewNotifications,
    handleMarkAsRead,
    handleDeleteNotification
  };
};

export default useNotifications;