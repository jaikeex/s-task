import type { NumericRange } from './range';

export type TableData = TableRow[];

export interface TableRow {
  rowNumber: number;
  values: NumericRange<1, 10>[];
}
