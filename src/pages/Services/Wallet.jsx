// src/pages/WalletPage.jsx
import React, { useState, useEffect } from 'react';
import CurrentBalance from '../../components/WalletComponents/CurrentBalance';
import UtilitiesBill from '../../components/WalletComponents/UtilitiesBill';
import PromotionSlide from '../../components/PromotionSlide';
import DashboardFooter from '../../components/DashboardFooter';
import useUserData from '../../hooks/useUserData';
// import Marquee from '../../components/Home/Marquee';
import Announcement from '../../components/Announcement';

const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 1200) {
    return 'Good Morning!';
  } else if (hours < 18) {
    return 'Good Afternoon!';
  } else {
    return 'Good Evening!';
  }
};

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function WalletPage() {
  const { userName, userId } = useUserData();
  // State for greeting
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const isGreeted = localStorage.getItem('isGreeted');

    if (!isGreeted) {
      const initialGreeting = getGreeting();
      setGreeting(initialGreeting);
      localStorage.setItem('isGreeted', 'true');
    } else {
      setGreeting('Welcome Back!');
    }
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-black md:mt-[5%] mt-[10%] text-black dark:text-white h-full">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-medium">
          {greeting}
        </h1>
        <h5 className="text-[13px] italic pl-2 flex items-center">
          {userName}
          {greeting === 'Welcome Back!' && (
            <span className="ml-2 text-[20px]">👋🏻</span>
          )}
        </h5>
        <p className="text-[12px] pl-2">{getFormattedDate()}</p>
      </div>
    
      <CurrentBalance userId={userId} />
      <UtilitiesBill />
      <PromotionSlide />

      <DashboardFooter />
    </div>
  );
}
