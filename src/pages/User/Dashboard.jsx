import React from 'react';
import { Outlet } from 'react-router-dom';
import useUserData from '../../hooks/useUserData';
import Loader from '../../components/Home/Loader';

const Dashboard = () => {
  const {isLoading} = useUserData()
  return (
    <>
    {isLoading ? (
      <Loader />
    ) : (
      <div>
      <Outlet />
    </div>
    )
    }
    </>
  );
};

export default Dashboard;
