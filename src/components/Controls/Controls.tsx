import React, { useCallback, useState } from 'react';
import { Button, Input } from 'components';

type ControlsProps = {
  onFormSubmit: (rows: number, columns: number) => void;
  onSort: (order: 'ASC' | 'DESC' | 'DEFAULT') => void;
};

export const Controls: React.FC<ControlsProps> = ({ onFormSubmit, onSort }): JSX.Element => {
  const [columnsCount, setColumnsCount] = useState<number>(10);
  const [rowsCount, setRowsCount] = useState<number>(10);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onFormSubmit(rowsCount, columnsCount);
    },
    [onFormSubmit, rowsCount, columnsCount]
  );

  const handleColumnsInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setColumnsCount(value);
    },
    [setColumnsCount]
  );

  const handleRowsInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setRowsCount(value);
    },
    [setRowsCount]
  );

  const handleSort = useCallback(
    (order: 'ASC' | 'DESC' | 'DEFAULT') => () => {
      onSort(order);
    },
    [onSort]
  );

  return (
    <React.Fragment>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          label="Number of columns:"
          onChange={handleColumnsInput}
          value={columnsCount}
          type="number"
          min="1"
          name="columns"
          id="columns"
          required
        />

        <Input
          label="Number of rows:"
          onChange={handleRowsInput}
          value={rowsCount}
          type="number"
          min="1"
          name="rows"
          id="rows"
          required
        />

        <Button type="submit">Create table</Button>
      </form>

      <div className="text-center space-x-4 space-y-2 mt-4">
        <h4 className="font-semibold">Sort table by row total</h4>
        <Button onClick={handleSort('ASC')}>Ascending</Button>
        <Button onClick={handleSort('DESC')}>Descending</Button>
        <Button onClick={handleSort('DEFAULT')}>Reset</Button>
      </div>
    </React.Fragment>
  );
};
