import React from 'react';
import './App.css';
import { Controls } from 'components';
import { useTableData } from 'hooks';

function App() {
  const { data, generateData, sortData, updateCell } = useTableData(); // eslint-disable-line

  return (
    <Controls
      onFormSubmit={generateData}
      onSort={sortData}
    />
  );
}

export default App;
