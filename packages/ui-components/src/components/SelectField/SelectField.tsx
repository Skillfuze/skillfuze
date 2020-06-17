import React, { useState, useEffect } from 'react';
import { cx } from 'emotion';
import Select, { Props as SelectProps } from 'react-select';

import { baseSelectFieldStyle, errorState, errorType, labelType } from './styles';

interface SelectFieldProps extends SelectProps {
  error?: string;
  onChange?: (value: any) => void;
  label?: string;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = (props: SelectFieldProps) => {
  const [error, setError] = useState(props.error);
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const className = cx(baseSelectFieldStyle, { [errorState]: Boolean(error?.length) });

  const onChange = (newValue: any) => {
    setError('');
    props.onChange?.(newValue);
  };

  return (
    <div className={cx('flex flex-col', props.className)}>
      {Boolean(props.label?.length) && <p className={cx(labelType, 'mb-1')}>{props.label}</p>}
      <Select
        isSearchable
        placeholder={props.placeholder}
        value={props.value}
        {...props}
        isDisabled={props.disabled}
        className={className}
        onChange={onChange}
      />
      {Boolean(error?.length) && <p className={cx(errorType, 'mt-1')}>{error}</p>}
    </div>
  );
};

SelectField.defaultProps = {
  error: '',
  disabled: false,
};

export default SelectField;
