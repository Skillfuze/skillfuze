import React from 'react';
import { cx } from 'emotion';

import { Color } from '../../types/colors.type';
import { baseButtonStyle, primaryButtonStyle, outlinedButtonStyle, buttonSize, linkButtonStyle } from './styles';
import { ButtonSize } from '../../types/button-size.type';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined' | 'link';
  color?: Color;
  type?: 'button' | 'reset' | 'submit';
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const className = cx(
    baseButtonStyle,
    { [primaryButtonStyle(props.color as Color)]: props.variant === 'primary' },
    { [outlinedButtonStyle(props.color as Color)]: props.variant === 'outlined' },
    buttonSize(props.size as ButtonSize),
    { [linkButtonStyle(props.color as Color)]: props.variant === 'link' },
    'px-4 py-2',
    props.className,
  );

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
  color: 'primary',
  type: 'button',
  size: 'regular',
};

export default Button;
