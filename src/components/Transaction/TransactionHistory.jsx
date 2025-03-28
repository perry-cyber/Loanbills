import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import FilterButtons from './FilterButtons';
import { PiWarningCircleFill } from "react-icons/pi";
import useTransactions from '../../hooks/useTransaction';

const TransactionHistory = () => {
  const [startDate, setStartDate] = useState(null);
  const { transactions, loading } = useTransactions(startDate);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <>
      <h1 className="text-2xl mt-10 pl-10 dark:text-white font-bold mb-4">Transaction History</h1>
      <div className="container mx-auto p-4 border rounded-3xl border-[#1F2937] shadow-white-glow">
        <FilterButtons startDate={startDate} setStartDate={handleDateChange} handlePrint={handlePrint} />
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
          <table ref={componentRef} className="min-w-full bg-white dark:bg-[#000] dark:text-white">
            <TableHeader />
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center py-4">Loading transactions...</td>
                </tr>
              </tbody>
            ) : (
              <TableBody transactions={transactions} />
            )}
          </table>
        </div>
        {!loading && transactions.length === 0 && (
          <div className="text-center py-4 dark:text-white flex items-center justify-center gap-2">
            No transactions found <span><PiWarningCircleFill /></span>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionHistory;
