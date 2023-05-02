import React from 'react';

type ButtonProps = React.ComponentProps<"button">

export const Button: React.FC<ButtonProps> = (props): JSX.Element => {
  return (
    <button className='font-semibold uppercase text-gray-100 bg-sky-900 py-2 px-4 rounded-md' {...props}></button>
  );
};
