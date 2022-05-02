import axios, { CancelToken } from "axios";
import {
  DefaultSortingCriterion,
  DefaultSortingOrder,
  SortingOrder,
} from "./components/SortField";

export type FetchStoriesOptions = {
  cancelToken: CancelToken;
  perPage?: number;
};

export async function fetchStories<T>(
  query: string,
  options: FetchStoriesOptions
): Promise<Array<T>> {
  const { cancelToken, perPage = 50 } = options;
  const url = `https://hn.algolia.com/api/v1/search?query=${query}&hitsPerPage=${perPage}&tags=story`;
  let stories: Array<T> = [];
  try {
    const { data } = await axios.get<{ hits: Array<T> }>(url, {
      cancelToken,
    });
    stories = data.hits;
  } catch (err) {
    if (!axios.isCancel(cancelToken)) {
      throw err;
    }
  }

  return stories;
}

export function sortBy<T extends { [key: string]: any }>(
  arr: Array<T>,
  prop: string = DefaultSortingCriterion,
  order: string = DefaultSortingOrder
): Array<T> {
  return [...arr].sort((a, b) => {
    const comparison = a[prop] - b[prop];
    if (comparison !== 0) {
      if (order === SortingOrder.ASC) {
        return comparison > 0 ? 1 : -1;
      } else {
        return comparison > 0 ? -1 : 1;
      }
    }

    return 0;
  });
}

export function formatDate(d: string): string {
  return d.replace(".000Z", "").replace("T", " at ");
}
