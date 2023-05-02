import React from 'react';

type ButtonProps = React.ComponentProps<'button'>;

export const Button: React.FC<ButtonProps> = (props): JSX.Element => (
  <button
    className="font-semibold uppercase text-gray-100 bg-sky-900 py-1 px-3 rounded-md"
    {...props}
  />
);
