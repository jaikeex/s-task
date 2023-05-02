import React from 'react';

type TableRowProps = { height?: number; top: number; } & React.ComponentProps<'tr'>;

export const TableRow: React.FC<TableRowProps> = ({
  children = null,
  height = 40,
  style = {},
  top,
  ...props
}): JSX.Element => {
  const elementStyle = { ...style, top: top };

  return (
    <tr
      className={`absolute h-[${height}px] min-w-full border-b border-gray-400 flex hover:bg-gray-100`}
      style={elementStyle}
      {...props}
    >
      {children}
    </tr>
  );
};
