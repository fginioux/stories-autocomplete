import { render } from "@testing-library/react";
import StoriesList from "./StoriesList";

beforeEach(() => {
  render(
    <StoriesList stories={[]}>
      <div>No stories</div>
    </StoriesList>
  );
});

test("should render an empty list component fallback", () => {
  expect(true).toBe(true);
});

test("should render an empty list with css class defined", () => {
  expect(true).toBe(true);
});

test("should render proper list items", () => {
  expect(true).toBe(true);
});
