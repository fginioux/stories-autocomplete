import { useEffect, useState } from "react";

function useDebounceState<T>(
  value: T,
  debounceTime: number
): [T, T, (v: T) => void] {
  const [state, setState] = useState<T>(value);
  const [debounceState, setDebounceState] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceState(state);
    }, debounceTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [state, debounceTime]);

  return [state, debounceState, setState];
}

export default useDebounceState;
