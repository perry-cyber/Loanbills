// src/pages/ExchangePage.jsx
import React, { useState, useEffect } from 'react';
// import Marquee from '../../components/Home/Marquee';
import Rates from '../../components/Rates';
import CryptoRates from '../../components/CryptoRate';
import TransactionHistory from '../../components/Transaction/TransactionHistory';
import DashboardFooter from '../../components/DashboardFooter';
import useUserData from '../../hooks/useUserData';
import RussiaFlag from '../../assets/flags/twemoji--flag-russia.png'

const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return 'Good Morning!';
  } else if (hours < 18) {
    return 'Good Afternoon!';
  } else {
    return 'Good Evening!';
  }
};

const images = [
  'https://harlequin-legal-ox-300.mypinata.cloud/files/bafkreidpfybm4oeodpgqedf3oaafmzmboo4j5aennvnkf5qyeqvrownfla?X-Algorithm=PINATA1&X-Date=1738094133&X-Expires=30&X-Method=GET&X-Signature=e228559c92bcf5b7b38c4777be2ba69337ab67bdf393758413f1f256a8ea8251',
  'https://harlequin-legal-ox-300.mypinata.cloud/files/bafkreidpfybm4oeodpgqedf3oaafmzmboo4j5aennvnkf5qyeqvrownfla?X-Algorithm=PINATA1&X-Date=1738094133&X-Expires=30&X-Method=GET&X-Signature=e228559c92bcf5b7b38c4777be2ba69337ab67bdf393758413f1f256a8ea8251',
  'https://harlequin-legal-ox-300.mypinata.cloud/files/bafkreidpfybm4oeodpgqedf3oaafmzmboo4j5aennvnkf5qyeqvrownfla?X-Algorithm=PINATA1&X-Date=1738094133&X-Expires=30&X-Method=GET&X-Signature=e228559c92bcf5b7b38c4777be2ba69337ab67bdf393758413f1f256a8ea8251',
  'https://harlequin-legal-ox-300.mypinata.cloud/files/bafkreidpfybm4oeodpgqedf3oaafmzmboo4j5aennvnkf5qyeqvrownfla?X-Algorithm=PINATA1&X-Date=1738094133&X-Expires=30&X-Method=GET&X-Signature=e228559c92bcf5b7b38c4777be2ba69337ab67bdf393758413f1f256a8ea8251',
  'https://harlequin-legal-ox-300.mypinata.cloud/files/bafkreidpfybm4oeodpgqedf3oaafmzmboo4j5aennvnkf5qyeqvrownfla?X-Algorithm=PINATA1&X-Date=1738094133&X-Expires=30&X-Method=GET&X-Signature=e228559c92bcf5b7b38c4777be2ba69337ab67bdf393758413f1f256a8ea8251',
  'https://harlequin-legal-ox-300.mypinata.cloud/files/bafkreidpfybm4oeodpgqedf3oaafmzmboo4j5aennvnkf5qyeqvrownfla?X-Algorithm=PINATA1&X-Date=1738094133&X-Expires=30&X-Method=GET&X-Signature=e228559c92bcf5b7b38c4777be2ba69337ab67bdf393758413f1f256a8ea8251',
  'https://harlequin-legal-ox-300.mypinata.cloud/files/bafkreidpfybm4oeodpgqedf3oaafmzmboo4j5aennvnkf5qyeqvrownfla?X-Algorithm=PINATA1&X-Date=1738094133&X-Expires=30&X-Method=GET&X-Signature=e228559c92bcf5b7b38c4777be2ba69337ab67bdf393758413f1f256a8ea8251',
  'https://harlequin-legal-ox-300.mypinata.cloud/files/bafkreidpfybm4oeodpgqedf3oaafmzmboo4j5aennvnkf5qyeqvrownfla?X-Algorithm=PINATA1&X-Date=1738094133&X-Expires=30&X-Method=GET&X-Signature=e228559c92bcf5b7b38c4777be2ba69337ab67bdf393758413f1f256a8ea8251',
  
];

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function ExchangePage() {
  const { userName } = useUserData();
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
    <div className="p-4 bg-white dark:bg-black md:mt-[5%] mt-[10%] h-auto md:h-auto w-full">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-black dark:text-white text-2xl font-medium">
            {greeting}
          </h1>
          <h5 className="text-black dark:text-white text-[13px] italic pl-2 flex items-center">
          {userName}
            {greeting === 'Welcome Back!' && (
              <span className="ml-2 text-[20px]">👋🏻</span>
            )}
          </h5>
          <p className="text-black dark:text-white text-[12px] pl-2">{getFormattedDate()}</p>
        </div>
      </div>

      <main className="flex flex-col gap-6 items-center h-full md:h-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-7 space-y-6 md:space-y-0 md:space-x-6">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-2xl md:text-4xl lg:text-[40px] font-extrabold text-black pt-5 dark:text-white leading-tight lg:leading-normal">
              Seamless currency transfers made easy.
            </h1>
            <p className="text-gray-800 dark:text-slate-600 text-sm md:text-base lg:text-lg mt-4">
              We help you make fast and secure transfers efficiently in the shortest possible time.
              <span className='italic text-[12px] text-[#d7d7d7] pl-2'>RUBY . NAIRA . POUNDS . EUROS . DOLLARS</span>
            </p>
          </div>
          <Rates />
        </div>
        {/* <Marquee images={images} /> */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-7 space-y-6 md:space-y-0 md:space-x-6">
          <CryptoRates />
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-2xl md:text-4xl lg:text-[40px] font-extrabold text-black pt-5 dark:text-white leading-tight lg:leading-normal">
              Exchange/Swap cryptocurrencies in short time fast and secured.
            </h1>
            <p className="text-gray-800 dark:text-slate-600 text-sm md:text-base lg:text-lg mt-4">
              We help you make fast and secure cryptocurrency exchange in the shortest possible time.
            </p>
          </div>
        </div>
      </main>


      <div className='mt-9 flex flex-col items-start justify-center px-12'>
        <TransactionHistory/>
      </div>
      <DashboardFooter />
    </div>
  );
}
