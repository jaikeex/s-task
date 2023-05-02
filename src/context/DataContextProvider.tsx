import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { TableData } from 'types';
import { generateNewRandomData, generateRandomValue, sortData } from './utils';
import { produce } from 'immer';

type DataContextValue = {
  data: DataReducerState;
  generateData: (rows: number, columns: number) => void;
  sortData: (order: 'ASC' | 'DESC' | 'DEFAULT') => void;
  updateCell: (rowIndex: number, colIndex: number) => void;
};

const DataContext = createContext<DataContextValue>({} as DataContextValue);

export const useDataContext = () => useContext(DataContext);

type DataContextProviderProps = React.PropsWithChildren;

interface DataReducerState {
  data: TableData;
  initialData: TableData;
}

type DataReducerAction =
  | {
      type: 'SORT_ASC' | 'SORT_DESC' | 'SORT_DEFAULT';
    }
  | { type: 'UPDATE_CELL'; rowIndex: number; colIndex: number; }
  | { type: 'GENERATE_DATA'; rows: number; columns: number; };

const dataReducer = produce((draft: DataReducerState, action: DataReducerAction) => {
  switch (action.type) {
    case 'GENERATE_DATA': {
      const generatedData = generateNewRandomData(action.rows, action.columns);
      draft.initialData = generatedData;
      draft.data = generatedData;
      break;
    }
    case 'SORT_ASC':
      draft.data = sortData(draft.data, 'ASC');
      break;
    case 'SORT_DESC':
      draft.data = sortData(draft.data, 'DESC');
      break;
    case 'SORT_DEFAULT':
      draft.data = draft.initialData;
      break;
    case 'UPDATE_CELL':
      draft.data[action.rowIndex].values[action.colIndex] = generateRandomValue();
      break;
    default:
      break;
  }
});

export const DataContextProvider: React.FC<DataContextProviderProps> = ({ children = null }): JSX.Element => {
  const [data, dispatchData] = useReducer(dataReducer, { data: [], initialData: [] });

  const generateData = (rows: number, columns: number) => {
    dispatchData({ type: 'GENERATE_DATA', rows, columns });
  };

  const sortData = (order: 'ASC' | 'DESC' | 'DEFAULT') => {
    dispatchData({ type: `SORT_${order}` });
  };

  const updateCell = (rowIndex: number, colIndex: number) => {
    dispatchData({ type: 'UPDATE_CELL', rowIndex, colIndex });
  };

  const contextValue = useMemo(
    () => ({ data, generateData, sortData, updateCell }),
    [data, generateData, sortData, updateCell]
  );

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};
