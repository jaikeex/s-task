import React from 'react';
import type { Column } from 'types';

type TableHeaderProps = { columns: Column[]; } & React.ComponentProps<'thead'>;

export const TableHeader: React.FC<TableHeaderProps> = ({ columns, ...props }): JSX.Element => (
  <thead
    className="sticky top-0 left-0 z-10 bg-white h-10"
    {...props}
  >
    <tr className="min-w-full flex">
      {/* First column, intentionally left blank */}
      <th className="w-40" />

      {/* Named data columns */}
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
