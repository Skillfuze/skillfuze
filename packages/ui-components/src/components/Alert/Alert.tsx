import React from 'react';

interface Props {
  message: string;
  close: () => void;
  style: object;
  options: {
    type: 'info' | 'success' | 'warning';
    label?: string;
  };
}

const Alert: React.FC<Props> = ({ message, options, style }: Props) => {
  return (
    <div
      className="py-2 px-4 bg-black items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
      style={{ ...style }}
    >
      {Boolean(options.label) && (
        <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
          {options.label}
        </span>
      )}
      <span className="font-semibold text-white text-center flex-auto">{message}</span>
    </div>
  );
};

export default Alert;
