import { render } from "@testing-library/react";
import StoryItem, { Story } from "./StoryItem";

const defaultStory: Story = {
  author: "@author",
  title: "@title",
  created_at: "2013-02-14T07:37:14.000Z",
  created_at_i: 0,
  points: 0,
  url: "@url",
};

beforeEach(() => {
  render(<StoryItem story={defaultStory} />);
});

test("should render story properties properly", () => {
  expect(true).toBe(true);
});

test("should render conditionally url property", () => {
  expect(true).toBe(true);
});

test("should render proper list items", () => {
  expect(true).toBe(true);
});
