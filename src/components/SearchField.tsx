import React, { useEffect } from "react";
import useDebounceState from "../useDebounceState";

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
