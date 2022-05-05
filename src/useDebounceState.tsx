import { useEffect, useRef, useState } from "react";

function useDebounceState<T>(
  value: T,
  debounceTime: number
): [T, T, (v: T) => void] {
  const [state, setState] = useState<T>(value);
  const [debounceState, setDebounceState] = useState<T>(value);

  // useRef keeping track of the timeout id
  const timeout = useRef<null | number>(null);

  useEffect(() => {
    const { clearTimeout, setTimeout } = window;

    // clear the ref
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    // set to the ref.current
    timeout.current = setTimeout(() => {
      setDebounceState(state);
      timeout.current = null;
    }, debounceTime);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [state, debounceTime, timeout]);

  return [state, debounceState, setState];
}

export default useDebounceState;
