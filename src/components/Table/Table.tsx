import React, { useCallback } from 'react';
import { useVirtualizedScroll } from 'hooks';
import type { Column, TableData } from 'types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';

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
      className={`relative overflow-auto h-[520px] mt-12 w-fit max-w-full mx-auto`}
    >
      {data.length > 0 ? (
        <table style={{ height: rowHeight * data.length }}>
          <TableHeader columns={columns} />
          <tbody>
            {visibleData.map((row, rowIndex) => (
              <TableRow
                key={`row-${row.rowNumber}`}
                top={(rowIndex + firstVisibleRow + 1) * rowHeight}
              >
                {/* Title Column */}
                <td className="py-2 px-4 w-40 flex-shrink-0">{`Row no. ${row.rowNumber}`}</td>

                {/* Data columns */}
                {row.values.map((value, colIndex) => {
                  if (colIndex >= columns.length) return null;
                  return (
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
                  );
                })}
              </TableRow>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
