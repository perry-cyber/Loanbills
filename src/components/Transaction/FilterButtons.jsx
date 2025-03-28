import React, { useState } from 'react';
import { TiPrinter } from "react-icons/ti";
import { LuCalendarDays } from "react-icons/lu";
import DatePickerComponent from '../DatePickerComponent';

const FilterButtons = ({ startDate, setStartDate, handlePrint }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div className="relative flex justify-end mb-4">
      <div className="flex items-center">
        <button 
          className="px-2 py-2 mx-2 bg-gray-200 rounded-full flex items-center gap-2" 
          onClick={toggleDatePicker}
        >
          <span><LuCalendarDays /></span>
          <span className="hidden sm:block">Choose Date</span>
        </button>
        {showDatePicker && (
          <div className="absolute top-0 right-0 z-10 mt-12">
            <DatePickerComponent startDate={startDate} setStartDate={setStartDate} />
          </div>
        )}
        <button 
          className="px-2 py-2 mx-2 bg-gray-200 rounded-full flex items-center gap-2" 
          onClick={handlePrint}
        >
          <span><TiPrinter /></span>
          <span className="hidden sm:block">Print</span>
        </button>
      </div>
    </div>
  );
};

export default FilterButtons;
