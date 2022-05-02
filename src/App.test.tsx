import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const ApiMockData = [
  {
    url: "@url",
    title: "@title",
    points: 100,
    author: "@author",
    created_at: "2013-02-14T07:37:14.000Z",
    created_at_i: 0,
  },
  {
    url: "@url-B",
    title: "@title-B",
    points: 0,
    author: "@author-B",
    created_at: "2013-02-15T07:37:14.000Z",
    created_at_i: 100,
  },
];

jest.mock("./utils", () => {
  const originalModule = jest.requireActual("./utils");

  return {
    ...originalModule,
    fetchStories: () => Promise.resolve(ApiMockData),
  };
});

beforeEach(() => {
  render(<App />);
});

test("renders title", () => {
  const titleElement = screen.getByText(/Stories App/i);
  expect(titleElement).toBeInTheDocument();
});

test("should trigger an request with search query", async () => {
  const [mock] = ApiMockData;
  const [searchField] = screen.getAllByPlaceholderText("Search");
  fireEvent.change(searchField, {
    target: { value: "@fake-search" },
  });

  const { title } = mock;
  await waitFor(() => screen.getByText(title));
  expect(screen.queryAllByText(title).length).toEqual(1);
});

test("should order the list ASC or DESC", async () => {
  const [mockA, mockB] = ApiMockData;
  const [searchField] = screen.getAllByPlaceholderText("Search");
  fireEvent.change(searchField, {
    target: { value: "@fake-search" },
  });

  // initial order...
  await waitFor(() => screen.getByText(mockA.title));
  let [a, b] = screen.queryAllByText(/@title/);
  expect(a.textContent).toEqual(mockA.title);
  expect(b.textContent).toEqual(mockB.title);

  const [orderField] = screen.getAllByTestId("order-by-dropdown");
  fireEvent.change(orderField, {
    target: { value: "DESC" },
  });

  // revert order...
  await waitFor(() => {
    [a, b] = screen.queryAllByText(/@title/);
    expect(a.textContent).toEqual(mockB.title);
    expect(b.textContent).toEqual(mockA.title);
  });
});

test("should change the list's order criterion", async () => {
  const [mockA, mockB] = ApiMockData;
  const [searchField] = screen.getAllByPlaceholderText("Search");
  fireEvent.change(searchField, {
    target: { value: "@fake-search" },
  });

  // initial order...
  await waitFor(() => screen.getByText(mockA.title));
  let [a, b] = screen.queryAllByText(/@title/);
  expect(a.textContent).toEqual(mockA.title);
  expect(b.textContent).toEqual(mockB.title);

  userEvent.click(screen.getByLabelText("Popularity"));

  // new order...
  await waitFor(() => {
    [a, b] = screen.queryAllByText(/@title/);
    expect(a.textContent).toEqual(mockB.title);
    expect(b.textContent).toEqual(mockA.title);
  });
});
