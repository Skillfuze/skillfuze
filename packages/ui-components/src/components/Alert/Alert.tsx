import React from 'react';
import { cx } from 'emotion';

import { baseAlertStyle } from './styles';
import { AlertType } from '../../types/alert.type';

interface Props {
  message: string;
  close: () => void;
  style: object;
  options: {
    type: AlertType;
    label?: string;
  };
}

const Alert: React.FC<Props> = ({ message, options, style }: Props) => {
  const className = cx(baseAlertStyle(options.type), 'py-2 px-6 items-center rounded-full flex inline-flex');
  return (
    <div className={className} role="alert" style={{ ...style }}>
      <span className="text-center flex-auto">{message}</span>
    </div>
  );
};

export default Alert;
