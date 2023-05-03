import type { NumericRange } from './range';

/**
 * Represents the format of data used in the Table component.
 */
export type TableData = TableRow[];

export interface TableRow {
  /**
   * Number of the row as initially generated.
   */
  rowNumber: number;
  /**
   * Data values of the row.
   */
  values: NumericRange<0, 9>[];
}
