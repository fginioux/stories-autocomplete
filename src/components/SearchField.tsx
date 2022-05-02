import React, { useEffect, useState } from "react";

interface SearchFieldProps {
  value?: string;
  debounceTime?: number;
  onChange: (v: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
  value = "",
  onChange,
  debounceTime = 0,
}) => {
  const [state, debouncedState, setState] = useDebounceState<string>(
    value,
    debounceTime
  );

  useEffect(() => {
    onChange(debouncedState);
  }, [debouncedState, onChange]);

  return (
    <div className="SearchField ui fluid input right icon">
      <input
        placeholder="Search"
        type="text"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <i className="search icon"></i>
    </div>
  );
};

export default SearchField;

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
