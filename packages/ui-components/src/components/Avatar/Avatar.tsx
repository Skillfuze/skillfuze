import React from 'react';

interface Props {
  URL: string;
  alt: string;
}

const Avatar: React.FC<Props> = ({ URL, alt }: Props) => {
  return <img className="object-contain rounded-full w-12 h-12" src={URL} alt={alt} />;
};

export default Avatar;
