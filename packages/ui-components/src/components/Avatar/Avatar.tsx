/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { cx } from 'emotion';

interface Props {
  URL: string;
  alt: string;
  size?: 'regular' | 'small' | 'large';
  className?: string;
}

const Avatar: React.FC<Props> = ({ URL, size, className }: Props) => {
  const classNameStyle = cx(
    'object-contain rounded-full bg-grey-light',
    {
      'w-20 h-20': size === 'large',
      'w-12 h-12': size === 'regular',
      'w-8 h-8': size === 'small',
    },
    className,
  );
  return <img className={classNameStyle} src={URL} />;
};
Avatar.defaultProps = {
  size: 'regular',
};
export default Avatar;
