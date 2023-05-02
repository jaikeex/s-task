import React from 'react';

type TableCellProps = React.ComponentProps<'td'>;

export const TableCell: React.FC<TableCellProps> = ({ children = null, ...props }): JSX.Element => (
  <td
    className="py-2 cursor-pointer hover:bg-gray-200 active:select-none text-center"
    {...props}
  >
    {children}
  </td>
);
