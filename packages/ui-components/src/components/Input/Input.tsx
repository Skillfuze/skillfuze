import React, { useState, useEffect } from 'react';
import { cx } from 'emotion';

import { baseInputStyle, errorState, errorType, labelType } from './styles';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  error?: string;
  onChange?: (value: any) => void;
  label?: string;
  type?: string;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const [error, setError] = useState(props.error);
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const className = cx(baseInputStyle, { [errorState]: Boolean(error?.length) }, 'p-2', props.className);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    props.onChange?.(event.target.value);
  };

  return (
    <div>
      {Boolean(props.label?.length) && <p className={cx(labelType, 'mb-1')}>{props.label}</p>}
      <input {...props} className={className} onChange={onChange} />
      {Boolean(error?.length) && <p className={cx(errorType, 'mt-1')}>{error}</p>}
    </div>
  );
};

Input.defaultProps = {
  error: '',
  type: 'text',
};

export default Input;
