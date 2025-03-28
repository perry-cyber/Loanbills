import React from 'react';
import logo from '../assets/loanbills-removebg-preview.png';

export default function DashboardFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-[#1F2937] text-gray-700 dark:text-white p-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm text-center md:text-left mb-2 md:mb-0">
          &copy; 2024 LoanBillsFx. All rights reserved.
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <a href="/privacy" className="hover:text-gray-900 text-[13px] underline dark:hover:text-gray-300">
            Privacy Policy
          </a>
          <span className="hidden md:inline-block">|</span>
          <span className="text-sm">  <img src={logo} alt="Company Logo" className="h-8 w-8 sm:h-10 sm:w-10 mr-3" /></span>
        </div>
      </div>
    </footer>
  );
}
