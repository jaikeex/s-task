import React from 'react';

type InputProps = { label?: string; } & React.ComponentProps<'input'>;

export const Input: React.FC<InputProps> = ({ id = '', label, ...props }): JSX.Element => (
  <div>
    {label ? (
      <label
        className="mr-2 text-gray-700 tex-md"
        htmlFor={id}
      >
        {label}
      </label>
    ) : null}
    <input
      id={id}
      className="border border-sky-800 rounded-sm px-1 w-14"
      {...props}
    />
  </div>
);
