import React from 'react';
import type { Column } from 'types';

type TableHeaderProps = { columns: Column[]; } & React.ComponentProps<'thead'>;

export const TableHeader: React.FC<TableHeaderProps> = ({ columns, ...props }): JSX.Element => (
  <thead
    className="sticky top-0 left-0 z-10 bg-white"
    {...props}
  >
    <tr className="h-10 min-w-full flex">
      <th className="w-32" />
      {columns.map((col, index) => (
        <th
          key={`${col.name}-${index}`}
          className={`py-2 px-4 font-normal overflow-hidden whitespace-nowrap text-ellipsis`}
          style={{
            width: col.width
          }}
        >
          {col.name}
        </th>
      ))}
    </tr>
  </thead>
);
