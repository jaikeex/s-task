import React from 'react';
import './App.css';
import { Controls, Table } from 'components';
import { useTableData } from 'hooks';

function App() {
  const { data, generateData, sortData, updateCell } = useTableData();

  const columns = data[0]?.values
    ? data[0].values.map((_, index) => ({
        name: `Col ${index + 1}`,
        width: 120,
        format: {
          oddColor: '#ff0000',
          evenColor: '#0000ff'
        }
      }))
    : [];

  return (
    <div className="my-0 mx-auto py-12 px-60">
      <Controls
        onFormSubmit={generateData}
        onSort={sortData}
      />
      <Table
        data={data}
        onCellDoubleClick={updateCell}
        columns={columns}
      />
    </div>
  );
}

export default App;
