import React, { useCallback, useState } from 'react';
import { Button, Input } from 'components';
import { useDataContext } from 'context/DataContextProvider';

export const Controls: React.FC = (): JSX.Element => {
  const [columnsCount, setColumnsCount] = useState<number>(1);
  const [rowsCount, setRowsCount] = useState<number>(1);
  const { generateData, sortData } = useDataContext();

  const handleClick = useCallback(() => {
    generateData(rowsCount, columnsCount);
  }, [generateData, rowsCount, columnsCount]);

  const handleColumnsInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (value < 1) {
        return;
      }

      setColumnsCount(value);
    },
    [setColumnsCount]
  );

  const handleRowsInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (value < 1) {
        return;
      }

      setRowsCount(value);
    },
    [setRowsCount]
  );

  const handleSort = useCallback(
    (order: 'ASC' | 'DESC' | 'DEFAULT') => () => {
      sortData(order);
    },
    [sortData]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <Input
        label="Number of columns:"
        onChange={handleColumnsInput}
        value={columnsCount}
        type="number"
        name="columns"
        id="columns"
      />

      <Input
        label="Number of rows:"
        onChange={handleRowsInput}
        value={rowsCount}
        type="number"
        name="rows"
        id="rows"
      />

      <Button onClick={handleClick}>Create table</Button>

      <div className="text-center space-x-4 space-y-2 mt-4">
        <h4 className="font-semibold">Sort table by row total</h4>
        <Button onClick={handleSort('ASC')}>Ascending</Button>
        <Button onClick={handleSort('DESC')}>Descending</Button>
        <Button onClick={handleSort('DEFAULT')}>Reset</Button>
      </div>
    </div>
  );
};
