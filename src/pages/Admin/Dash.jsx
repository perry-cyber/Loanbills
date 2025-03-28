import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faShareAlt, faPrint, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FaWhatsapp, FaEnvelope, FaBluetooth, FaShare } from 'react-icons/fa';
import MarketOverview from './MarketOverview';
import Requests from './Requests';
import { WhatsappShareButton, EmailShareButton } from 'react-share';
import Loader from '../../components/Home/Loader';
import useAdminData from '../../hooks/useAdminData';
import useAdminCal from '../../hooks/useAdminCal';
import useAdminTransactions from '../../hooks/useAdminTransactions';

export default function Dash() {
  const [dataLoading, setDataLoading] = useState(true)
  const [data, setData] = useState({
    revenuePercentage: 0,
    transactions: 0,
    newUsers: 0,
    requests: 0,
    flightBookings: 0,
  });
  const [previousRevenuePercentage, setPreviousRevenuePercentage] = useState(null);
  const [previousTransactionPercentage, setPreviousTransactionPercentage] = useState(null);
  const { totalRevenuePercentage } = useAdminCal();
  const {transactionPercentage} = useAdminTransactions();
  const [showDropdown, setShowDropdown] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  console.log(totalRevenuePercentage)
  console.log(transactionPercentage)
  const { adminData, loading } = useAdminData()

  useEffect(() => {
    setPreviousRevenuePercentage(totalRevenuePercentage);
  }, [totalRevenuePercentage]);

  useEffect(() => {
    setPreviousTransactionPercentage(transactionPercentage);
  }, [transactionPercentage]);

  useEffect(() => {
    setTimeout(() => {
      const fetchedData = {
        revenuePercentage: 32.53,
        transactions: 7682,
        newUsers: 68,
        requests: 235,
        flightBookings: 14,
      };
      setData(fetchedData);
      setDataLoading(false);
    }, 2000);
  }, []);

  const handleShare = () => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const file = new File([blob], 'dashboard_data.json', { type: 'application/json' });
    
    if (navigator.share) {
      navigator.share({
        title: 'Dashboard Data',
        files: [file],
      }).catch(console.error);
    } else {
      alert('Web Share API not supported.');
    }
  };

  const handleBluetoothShare = () => {
    alert('Bluetooth share is not supported in the browser.');
  };


  
  return (
    <>
    {loading ? (
      <Loader />
    ) : (

   
      <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-xl font-semibold text-gray-700 pb-6">{getGreeting()}, {adminData.name}</div>

      <div className="flex items-center justify-between border-b pb-3 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-2">Overview</button>
            <button className="text-gray-500">Audiences</button>
            <button className="text-gray-500">Demographics</button>
            <button className="text-gray-500">More</button>
          </div>
        </div>

        <div className="relative flex space-x-4">
          <button
            className="text-gray-500 flex items-center relative"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FontAwesomeIcon icon={faShareAlt} className="mr-2" /> Share
          </button>
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 flex justify-around">
              <WhatsappShareButton url={window.location.href} className="w-full">
                <FaWhatsapp className="text-black hover:text-gray-700 text-xl" />
              </WhatsappShareButton>
              <EmailShareButton subject="Dashboard Data" body="Here is the dashboard data." className="w-full">
                <FaEnvelope className="text-black hover:text-gray-700 text-xl" />
              </EmailShareButton>
              <button onClick={handleBluetoothShare} className="w-full">
                <FaBluetooth className="text-black hover:text-gray-700 text-xl" />
              </button>
              <button onClick={handleShare} className="w-full">
                <FaShare className="text-black hover:text-gray-700 text-xl" />
              </button>
            </div>
          )}
          <button className="text-gray-500 flex items-center">
            <FontAwesomeIcon icon={faPrint} className="mr-2" /> Print
          </button>
          <button className="text-gray-500 flex items-center">
            <FontAwesomeIcon icon={faFileExport} className="mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-xs">Revenue Percentage</div>
        <div className="text-xl font-bold">{totalRevenuePercentage}%</div>
        {previousRevenuePercentage !== null && (
          <div className={`text-sm flex items-center ${parseFloat(previousRevenuePercentage) > parseFloat(totalRevenuePercentage) ? 'text-red-500' : 'text-green-500'}`}>
            <FontAwesomeIcon icon={parseFloat(previousRevenuePercentage) > parseFloat(totalRevenuePercentage) ? faArrowDown : faArrowUp} className="mr-1" /> {totalRevenuePercentage}%
          </div>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-xs">Transactions</div>
        <div className="text-xl font-bold">{transactionPercentage}%</div>
        {previousTransactionPercentage !== null && (
          <div className={`text-sm flex items-center ${parseFloat(previousTransactionPercentage) > parseFloat(transactionPercentage) ? 'text-red-500' : 'text-green-500'}`}>
            <FontAwesomeIcon icon={parseFloat(previousTransactionPercentage) > parseFloat(transactionPercentage) ? faArrowDown : faArrowUp} className="mr-1" /> {transactionPercentage}%
          </div>
        )}
      </div>
        {/* Add more metric cards as needed */}
      </div>

      <div className="space-y-4">
        <div className="w-full">
          <MarketOverview />
        </div>

          <Requests />
      </div>
    </div>
     )
    }
    
    </>
  );
}
