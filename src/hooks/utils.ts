import type { NumericRange, TableData } from 'types';

export const generateRandomValue = () => Math.floor(Math.random() * 10) as NumericRange<0, 9>;

export const generateNewRandomData = (rows: number, columns: number): TableData => {
  const data = Array.from({ length: rows }, (_, index) => ({
    rowNumber: index + 1,
    values: Array.from({ length: columns }, () => generateRandomValue())
  }));

  return data;
};

export const sortData = (data: TableData, order: 'ASC' | 'DESC' | 'DEFAULT') => {
  if (order === 'DEFAULT') {
    return data.sort((a, b) => a.rowNumber - b.rowNumber);
  } else {
    return data.sort((a, b) => {
      const sumA = a.values.reduce((sum: number, current) => sum + current, 0);
      const sumB = b.values.reduce((sum: number, current) => sum + current, 0);
      return order === 'ASC' ? sumA - sumB : sumB - sumA;
    });
  }
};

export const calculateVisibleRows = (scrollTop: number, clientHeight: number, rowHeight: number, buffer: number) => {
  const firstVisibleRow = Math.max(Math.floor(scrollTop / rowHeight) - buffer, 0);
  const lastVisibleRow = Math.ceil((scrollTop + clientHeight) / rowHeight) + buffer;
  return { firstVisibleRow, lastVisibleRow };
};
