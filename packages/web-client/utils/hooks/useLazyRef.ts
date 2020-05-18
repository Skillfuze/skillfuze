import React from 'react';

export const useLazyRef = <T>(getInitialValue: () => T): React.MutableRefObject<T> => {
  const lazyRef = React.useRef<T>(null);

  if (lazyRef.current === null) {
    lazyRef.current = getInitialValue();
  }

  return lazyRef;
};
