import { useVirtualizedScroll } from 'hooks';
import React, { useCallback } from 'react';
import type { Column, TableData } from 'types';
import { TableCell } from './TableCell';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';

export interface TableProps {
  data: TableData;
  columns: Column[];
  onCellDoubleClick?: (rowIndex: number, colIndex: number) => void;
  rowHeight?: number;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  onCellDoubleClick = () => {},
  rowHeight = 40
}): JSX.Element => {
  const { containerRef, visibleData, handleScroll, firstVisibleRow } = useVirtualizedScroll(data, { rowHeight });

  const handleCellDoubleClick = useCallback(
    (rowIndex: number, colIndex: number) => () => {
      onCellDoubleClick(rowIndex, colIndex);
    },
    [onCellDoubleClick]
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`relative overflow-auto h-[520px] mt-12`}
    >
      <table
        className={`h-[${rowHeight * data.length}px] w-full`}
        style={{
          height: rowHeight * data.length
        }}
      >
        <TableHeader columns={columns} />
        <tbody>
          {visibleData.map((row, rowIndex) => (
            <TableRow
              key={`row-${row.rowNumber}`}
              top={(rowIndex + firstVisibleRow + 1) * rowHeight}
            >
              <td className="py-2 px-4 w-32 flex-shrink-0">{`Row no. ${row.rowNumber}`}</td>
              {row.values.map((value, colIndex) => (
                <TableCell
                  key={`cell-${row.rowNumber}-${colIndex}`}
                  onDoubleClick={handleCellDoubleClick(rowIndex + firstVisibleRow, colIndex)}
                  style={{
                    color: value % 2 === 0 ? columns[colIndex].format.evenColor : columns[colIndex].format.oddColor,
                    width: columns[colIndex].width
                  }}
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};
