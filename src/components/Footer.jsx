import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import DashboardFooter from "./DashboardFooter";
import logo from '../assets/loanbills-removebg-preview.png';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white text-white px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
             <img src={logo} alt="Company Logo" className="h-8 w-8 sm:h-10 sm:w-10 mr-3" />
            <h1 className="text-2xl font-bold">
              LoanBills<span className="tracking-wide">FX</span>
            </h1>
          </div>
          <p className="text-sm text-gray-300">
          At Loanbillsfx, we believe that the right financial tools empower everyone to stay connected, secure, and in control. Whether you're sending money across borders, booking international flights, or managing your bills and utilities, our seamless solutions help you achieve your goals efficiently and effortlessly.
          </p>
        </div>

        {/* Utility Page */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Bills Payment</li>
            <li>Flight</li>
            <li>Currency Exchange</li>
            <li>International Transfers</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Address: plot 12 bannex plaza, Kubwa abuja</li>
            
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">
          © 2025 Loanbillsfx. All Rights Reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
        <a href="/privacy" className="hover:text-gray-900 text-[13px] underline dark:hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="#" className="bg-white text-black p-2 rounded-full">
            <FaFacebookF />
          </a>
          <a href="#" className="bg-white text-black p-2 rounded-full">
            <FaTwitter />
          </a>
          <a href="#" className="bg-white text-black p-2 rounded-full">
            <FaInstagram />
          </a>
          <a href="#" className="bg-white text-black p-2 rounded-full">
            <FaLinkedinIn />
          </a>
          
        </div>
      </div>
    
    </footer>
    
  );
};

export default Footer;

