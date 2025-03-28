const TableRow = ({ transaction }) => {
  console.log(transaction);
    return (
      <tr className="border-t border-[#1F2937]">
        <td className="px-2 py-1 sm:px-4 sm:py-2 flex items-center text-xs sm:text-sm md:text-base">
          {transaction.name}
        </td>
        <td className={`px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {transaction.amount}
        </td>
        <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">{transaction.date}</td>
        <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">{transaction.category}</td>
        <td className="px-2 py-1 sm:px-4 sm:py-2 flex items-center text-xs sm:text-sm md:text-base">
         <p>{transaction.account_number}</p> 
        </td>
        <td className="px-2 py-1 sm:px-4 sm:py-2">
        <button className={`text-xs sm:text-sm md:text-base font-semibold ${transaction.status === 'Completed' ? 'text-green-500' : transaction.status === 'Canceled' ? 'text-red-500' : 'text-yellow-500'}`}>
          {transaction.status}
        </button>
        </td>
      </tr>
    );
  };
  
  export default TableRow;
  