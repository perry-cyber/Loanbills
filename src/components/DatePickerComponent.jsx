import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerComponent.css';

const DatePickerComponent = ({ startDate, setStartDate }) => {
  return (
    <div className="datepicker-container">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="px-4 py-2 bg-gray-200 rounded-full"
        calendarClassName="rounded-xl shadow-lg"
        dateFormat="yyyy-MM-dd"
        isClearable // Allow the user to clear the date selection
      />
    </div>
  );
};

export default DatePickerComponent;
