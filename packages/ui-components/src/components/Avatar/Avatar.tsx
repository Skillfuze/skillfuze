import React from 'react';

interface Props {
  URL: string;
  alt: string;
}

const Avatar: React.FC<Props> = ({ URL, alt }: Props) => {
  return (
    <img
      className="object-contain rounded-full w-12 h-12"
      src={URL || 'https://www.w3schools.com/w3images/avatar2.png'}
      alt={alt}
    />
  );
};

export default Avatar;
