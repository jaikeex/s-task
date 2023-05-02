import type { NumericRange, TableData } from 'types';

export const generateRandomValue = () => (Math.floor(Math.random() * 9) + 1) as NumericRange<1, 10>;

export const generateNewRandomData = (columns: number, rows: number): TableData => {
  const data = Array.from({ length: rows }, (_, index) => ({
    rowNumber: index + 1,
    values: Array.from({ length: columns }, () => generateRandomValue())
  }));

  return data;
};

export const sortData = (data: TableData, order: 'ASC' | 'DESC') =>
  data.sort((a, b) => {
    const sumA = a.values.reduce((sum, current) => sum + current, 0);
    const sumB = b.values.reduce((sum, current) => sum + current, 0);
    return order === 'ASC' ? sumA - sumB : sumB - sumA;
  });
