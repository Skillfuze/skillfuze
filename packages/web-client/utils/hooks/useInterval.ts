import { useEffect, useRef } from 'react';

export function useInterval(callback: Function, delay?: number): void {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let onUnmountCallback;
    if (delay) {
      const id = setInterval(() => savedCallback.current(), delay);
      onUnmountCallback = () => clearInterval(id);
    }
    return onUnmountCallback;
  }, [delay]);
}
