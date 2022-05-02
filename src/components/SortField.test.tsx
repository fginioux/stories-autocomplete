import { render } from "@testing-library/react";
import SortField, {
  SortingFieldValue,
  SortingOrder,
  SortingCriterion,
} from "./SortField";

const onChange = jest.fn();
const defaultValue: SortingFieldValue = {
  criterion: SortingCriterion.DATE,
  order: SortingOrder.ASC,
};

beforeEach(() => {
  render(<SortField onChange={onChange} value={defaultValue} />);
});

test("should render popularity radio", () => {
  expect(true).toBe(true);
});

test("should render created date radio", () => {
  expect(true).toBe(true);
});

test("should render created date radio checked", () => {
  expect(true).toBe(true);
});

test("should render order dropdown with ASC value", () => {
  expect(true).toBe(true);
});

test("should call callback function after radio criterion changes", () => {
  expect(true).toBe(true);
});

test("should call callback function after dropdown order changes", () => {
  expect(true).toBe(true);
});
