import React from 'react';
import './App.css';
import { Controls } from 'components';
import { DataContextProvider } from 'context/DataContextProvider';

function App() {
  return (
    <DataContextProvider>
      <Controls />
    </DataContextProvider>
  );
}

export default App;
