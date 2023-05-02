import React from 'react';

type InputProps = { label?: string; } & React.ComponentProps<'input'>;

export const Input: React.FC<InputProps> = ({ id = '', label, ...props }): JSX.Element => (
  <div className="flex flex-col w-full">
    {label ? (
      <label
        className="mr-2 text-gray-700 text-md"
        htmlFor={id}
      >
        {label}
      </label>
    ) : null}
    <input
      id={id}
      className="border border-sky-800 rounded-sm px-1"
      {...props}
    />
  </div>
);
