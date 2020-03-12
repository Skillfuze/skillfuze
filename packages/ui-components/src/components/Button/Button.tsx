import React from 'react';
import { cx } from 'emotion';

import { Color } from '../../types/colors.type';
import { baseButtonStyle, primaryButtonStyle, outlinedButtonStyle } from './styles';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined';
  color?: Color;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const className = cx(
    baseButtonStyle,
    { [primaryButtonStyle(props.color as Color)]: props.variant === 'primary' },
    { [outlinedButtonStyle(props.color as Color)]: props.variant === 'outlined' },
    'px-4 py-2',
    props.className,
  );

  return (
    <button type="button" {...props} className={className}>
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
  color: 'primary',
};

export default Button;
