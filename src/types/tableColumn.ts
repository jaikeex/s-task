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
   * Fullfills the role of the "format" option as specified in the requirements.
   */
  format: {
    oddColor: string;
    evenColor: string;
  };
}
