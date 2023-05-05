import { useCallback, useReducer } from 'react';
import type { TableData } from 'types';
import { generateNewRandomData, generateRandomValue, sortData } from './utils';
import { produce } from 'immer';

interface DataReducerState {
  data: TableData;
}

type DataReducerAction =
  | {
      type: 'SORT_ASC' | 'SORT_DESC' | 'SORT_DEFAULT';
    }
  | { type: 'UPDATE_CELL'; rowIndex: number; colIndex: number; }
  | { type: 'GENERATE_DATA'; rows: number; columns: number; };

const dataStateInitializer = (data: TableData) => ({
  data: data
});

const dataReducer = produce((draft: DataReducerState, action: DataReducerAction) => {
  switch (action.type) {
    case 'GENERATE_DATA':
      draft.data = generateNewRandomData(action.rows, action.columns);
      break;
    case 'SORT_ASC':
      draft.data = sortData(draft.data, 'ASC');
      break;
    case 'SORT_DESC':
      draft.data = sortData(draft.data, 'DESC');
      break;
    case 'SORT_DEFAULT':
      draft.data = sortData(draft.data, 'DEFAULT');
      break;
    case 'UPDATE_CELL':
      draft.data[action.rowIndex].values[action.colIndex] = generateRandomValue();
      break;
    default:
      break;
  }
});

interface IUseTableData {
  /**
   * The table data
   */
  data: TableData;
  /**
   * Generates the data according to input values. Resets the sort to default.
   *
   * @param rows Number of rows to generate
   * @param columns Number of columns to generate
   * @returns void
   */
  generateData: (rows: number, columns: number) => void;
  /**
   * Sorts the rows by total sum.
   *
   * @param order order in which to sert the rows
   * @returns void
   */
  sortData: (order: 'ASC' | 'DESC' | 'DEFAULT') => void;
  /**
   * Randomly re-generates the value in a target cell, identified by its row and columnd indices.
   *
   * @param rowIndex index of row where the updated cell can be found. Must be the current index (after sorting).
   * @param colIndex index of column there the updated cell can be found.
   * @returns void
   */
  updateCell: (rowIndex: number, colIndex: number) => void;
}

/**
 * Handles the table data and all state related actions.
 *
 * @param data Initial state (optional, initialized to empty array if not provided).
 *
 * @return `{data, generateData, sortData, updateCell}`
 *
 * @example //1. Initialize the state
 * const { data, generateData, sortData, updateCell } = useTableData() //initialize with empty state;
 * const { data, generateData, sortData, updateCell } = useTableData(initialData) //initialize with preloaded data;
 *
 * @example //2. Use the actions
 * generateData: (100, 10); // Generates 100 rows each with 10 columns.
 * sortData("ASC"); // Sorts the data in an ascending order.
 * sortData("DESC"); // Sorts the data in a descending order.
 * sortData("DEFAULT"); // Resets the order of displayed data to its default state.
 * updateCell(50, 5); // Re-generates the value inside the cell in 50th row and 5th column (both zero based).
 */
export const useTableData = (initialData: TableData = []): IUseTableData => {
  const [data, dispatchData] = useReducer(dataReducer, initialData, dataStateInitializer);

  const generateData = useCallback(
    (rows: number, columns: number) => {
      dispatchData({ type: 'GENERATE_DATA', rows, columns });
    },
    [dispatchData]
  );

  const sortData = useCallback(
    (order: 'ASC' | 'DESC' | 'DEFAULT') => {
      dispatchData({ type: `SORT_${order}` });
    },
    [dispatchData]
  );

  const updateCell = useCallback(
    (rowIndex: number, colIndex: number) => {
      dispatchData({ type: 'UPDATE_CELL', rowIndex, colIndex });
    },
    [dispatchData]
  );

  return { data: data.data, generateData, sortData, updateCell };
};
