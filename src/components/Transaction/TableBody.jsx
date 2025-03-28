import React from 'react';
import TableRow from './TableRow';  // Import TableRow

const TableBody = ({ transactions }) => {
  return (
    <tbody>
      {transactions.map(transaction => (
        <TableRow key={transaction.id} transaction={transaction} />
      ))}
    </tbody>
  );
};

export default TableBody;
