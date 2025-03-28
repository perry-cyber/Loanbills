import React from 'react';

export default function TableHeader() {
  return (
    <thead>
      <tr>
        <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-2 sm:text-sm md:text-base">Transaction Type</th>
        <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-2 sm:text-sm md:text-base">Amount</th>
        <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-2 sm:text-sm md:text-base">Date</th>
        <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-2 sm:text-sm md:text-base">Category</th>
        <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-2 sm:text-sm md:text-base">Recipient Account</th>
        <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-2 sm:text-sm md:text-base">Transaction Status</th>
      </tr>
    </thead>
  );
}
