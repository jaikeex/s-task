export interface Column {
  /**
   * Name of the column (will be displayed in the table header).
   */
  name: string;
  /**
   * Width of the column in px.
   */
  width: number;
  /**
   * Enables further customization of the column.
   */
  format: ColumnFormat;
}

interface ColumnFormat {
  /**
   * Text color of odd numbers.
   */
  oddColor: string;
  /**
   * Text color of even numbers.
   */
  evenColor: string;
}
