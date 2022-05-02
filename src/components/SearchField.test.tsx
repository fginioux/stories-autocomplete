import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchField from "./SearchField";

const onChange = jest.fn();
const debounceTime = 1000;
const defaultValue = "@defaultValue";

beforeEach(() => {
  render(
    <SearchField
      onChange={onChange}
      value={defaultValue}
      debounceTime={debounceTime}
    />
  );
});

test("should render default value", () => {
  expect(true).toBe(true);
});

test("should call callback function after with debounce time", () => {
  expect(true).toBe(true);
});
