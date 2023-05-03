import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateVisibleRows } from './utils';

interface Options {
  /**
   * Height in `px` of each individual row.
   */
  rowHeight: number;
  /**
   * Number of rows loaded at any given time before and after the first and last row displayed respectively.
   */
  buffer?: number;
}

interface IUseVirtualizedScroll<T, S extends HTMLElement = HTMLDivElement> {
  /**
   * The container element ref.
   */
  containerRef: React.RefObject<S>;
  /**
   * Function used to calculate which rows are currently rendered. Use as an `onScroll` event handler for the container element.
   * @returns void
   */
  handleScroll: () => void;
  /**
   * Slice of the data currently rendered on screen.
   */
  visibleData: T[];
  /**
   * Index of the first rendered row.
   */
  firstVisibleRow: number;
  /**
   * Index of the last rendered row.
   */
  lastVisibleRow: number;
}

/**
 * Handles all tasks related to the virtualized scrolling of a large list of itmes. In order for this
 * functionality to work, specific styles must be set for the container component as well as individual items (READ BELOW):
 * @example // Call the hook with required parameters
 * const { containerRef, visibleData, handleScroll } = useVirtualizedScroll(data, { rowHeight: 50 })
 *
 * @example
 *
 * ```
 * <div // Set the ref and onScroll props on the container element
 *   ref={containerRef}
 *   onScroll={handleScroll}
 *   style={{ // The following styles are required (height value is arbitrary)
 *     position: "relative",
 *     overflow: "auto",
 *     height: "500px"
 *   }}
 * >
 *   {visibleItems.map(item, index) => (
 *     <div
 *       style={{ // The following styles are required
 *         position: "absolute",
 *         height: rowHeight, //use the same value as passed to this hook
 *         top: (index + firstVisibleRow) * rowHeight //using index ensures proper sorting
 *       }}
 *      >
 *       {...}
 *     </div>
 *   )}
 * </div>
 * ```
 *
 * @param data Array containing the elements of the scrollable list
 * @param {Options} options Specifies the options to customize the scrolling behaviour
 * @return `{containerRef, visibleData, handleScroll, firstVisibleItem, lastVisibleItem}`
 */
export const useVirtualizedScroll = <T, S extends HTMLElement = HTMLDivElement>(
  data: T[],
  options: Options
): IUseVirtualizedScroll<T, S> => {
  const { rowHeight = 40, buffer = 3 } = options;

  const containerRef = useRef<S>(null);

  const [visibleData, setVisibleData] = useState<T[]>([]);
  const [visibleRows, setVisibleRows] = useState<{ first: number; last: number; }>({
    first: 0,
    last: 0
  });

  const handleScroll = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const scrollTop = containerRef.current.scrollTop;
    const clientHeight = containerRef.current.clientHeight;
    const { firstVisibleRow, lastVisibleRow } = calculateVisibleRows(scrollTop, clientHeight, rowHeight, buffer);

    setVisibleRows({ first: firstVisibleRow, last: lastVisibleRow });
  }, [containerRef, rowHeight, buffer, setVisibleRows]);

  useEffect(() => {
    setVisibleData(data.slice(Math.max(visibleRows?.first || 0, 0), visibleRows?.last));
  }, [visibleRows]);

  useEffect(() => {
    handleScroll();
  }, [data]);

  return {
    containerRef,
    visibleData,
    handleScroll,
    firstVisibleRow: visibleRows?.first,
    lastVisibleRow: visibleRows?.last
  };
};
