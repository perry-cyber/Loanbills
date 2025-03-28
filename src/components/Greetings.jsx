import React, { useEffect, useState } from 'react'
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

  const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
export default function Greetings() {

    
  return (
    <div className="flex items-center space-x-4">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-black dark:text-white text-2xl font-medium">
            {greeting}
          </h1>
          <h5 className="text-black dark:text-white text-[13px] italic pl-2 flex items-center">
            Victor Tosin Simon 
            {greeting === 'Welcome Back!' && (
              <span className="ml-2 text-[20px]">👋🏻</span>
            )}
          </h5>
          <p className="text-black dark:text-white text-[12px] pl-2">{getFormattedDate()}</p>
        </div>
    </div>
  )
}
