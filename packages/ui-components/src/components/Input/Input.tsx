import React, { useState, useEffect } from 'react';
import { cx } from 'emotion';

import { baseInputStyle, errorState, errorType, labelType, borderless, disabledInputStyle } from './styles';

interface InputProps extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  error?: string;
  onChange?: (value: any) => void;
  label?: string;
  type?: string;
  value?: string;
  borderless?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const [error, setError] = useState(props.error);
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const className = cx(
    baseInputStyle,
    { [errorState]: Boolean(error?.length), [borderless]: props.borderless, 'px-0': props.borderless },
    { [disabledInputStyle]: props.disabled },
    'p-2',
    props.className,
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError('');
    props.onChange?.(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { borderless: _borderless, multiline, ...restInputProps } = props;
  return (
    <div className={cx(props.containerClassName, 'flex flex-col')}>
      {Boolean(props.label?.length) && <p className={cx(labelType, 'mb-1')}>{props.label}</p>}
      {!props.multiline ? (
        <input {...restInputProps} value={props.value} className={className} onChange={onChange} />
      ) : (
        <textarea {...restInputProps} value={props.value} className={className} onChange={onChange} />
      )}
      {Boolean(error?.length) && <p className={cx(errorType, 'mt-1')}>{error}</p>}
    </div>
  );
};

Input.defaultProps = {
  error: '',
  type: 'text',
  value: '',
  borderless: false,
  disabled: false,
  multiline: false,
  rows: 4,
};

export default Input;
