import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={props.type || 'button'} {...props}>
      {props.text}
    </button>
  );
};

export default Button;
