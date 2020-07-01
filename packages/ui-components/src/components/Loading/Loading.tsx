import React from 'react';
import { css } from 'emotion';
import LoadingIcon from '../../assets/icons/loading.svg';

export const loadingStyle = css`
  @keyframes flickerAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }

  animation: flickerAnimation 1.5s infinite;
`;

interface LoadingProps {
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({ size }: LoadingProps) => {
  return <LoadingIcon className={loadingStyle} width={size} height={size} />;
};

Loading.defaultProps = {
  size: 25,
};

export default Loading;
