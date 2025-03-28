import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import Loader from '../../components/Home/Loader';
import useAdminCal from '../../hooks/useAdminCal';

export default function MarketOverview() {
  const { 
    totalMarketOverviewAmount, 
    marketOverviewGraph, 
    loading: marketOverviewLoading 
  } = useAdminCal();

  const [previousAmount, setPreviousAmount] = useState(0); 
  const [percentageChange, setPercentageChange] = useState(0);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 300,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    if (totalMarketOverviewAmount !== null && totalMarketOverviewAmount !== undefined && previousAmount) {
      const change = totalMarketOverviewAmount - previousAmount;
      const percentage = (change / previousAmount) * 100;
      setPercentageChange(percentage.toFixed(2));
    }
  }, [totalMarketOverviewAmount, previousAmount]);

  useEffect(() => {
    setPreviousAmount(totalMarketOverviewAmount);
  }, [totalMarketOverviewAmount]);

  const percentageClassName = percentageChange >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Market Overview</h2>
        <button className="text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
          This month <FontAwesomeIcon icon={faEllipsisH} />
        </button>
      </div>
      <p className="text-gray-500 mb-6 text-xs">The values are subjected to change weekly as this is from the original data</p>
      <div className="text-3xl font-bold mb-2">
        ${totalMarketOverviewAmount} 
        <span className={`${percentageClassName} text-xs`}> 
          ({percentageChange >= 0 ? '+' : '-'}{Math.abs(percentageChange)}% )
        </span>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
          Last week
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-black mr-2"></span>
          This week
        </div>
      </div>
      <div className="h-64">
        {marketOverviewLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : (
          <Bar data={marketOverviewGraph} options={options} />
        )}
      </div>
    </div>
  );
}