import { useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { sortBy, fetchStories } from "../utils";
import SearchField from "./SearchField";
import StoriesList from "./StoriesList";
import SortingField, {
  SortingFieldValue,
  DefaultSortingCriterion,
  DefaultSortingOrder,
} from "./SortField";
import { Story } from "./StoryItem";

const DefaultQuery = "";
const DefaultStories: Array<Story> = [];
const DebounceTime = 300;

const Stories = () => {
  const [query, setQuery] = useState<string>(DefaultQuery);
  const [stories, setStories] = useState<Array<Story>>(DefaultStories);
  const [rawStories, setRawStories] = useState<Array<Story>>(DefaultStories);
  const [sorting, setSorting] = useState<SortingFieldValue>({
    criterion: DefaultSortingCriterion,
    order: DefaultSortingOrder,
  });

  useEffect(() => {
    let source: CancelTokenSource;
    if (query.length) {
      source = axios.CancelToken.source();

      fetchStories<Story>(query, { cancelToken: source.token }).then(
        (stories) => {
          setRawStories(stories);
        }
      );
    } else {
      setRawStories(DefaultStories);
    }

    return () => {
      if (source) {
        source.cancel();
      }
    };
  }, [query]);

  useEffect(() => {
    const { criterion, order } = sorting;
    setStories(sortBy<Story>(rawStories, criterion, order));
  }, [rawStories, sorting]);

  return (
    <>
      <div className="Stories-search-bar">
        <SearchField
          value={query}
          debounceTime={DebounceTime}
          onChange={(term) => setQuery(term)}
        />

        <SortingField value={sorting} onChange={setSorting} />
      </div>

      <div className="Stories-result-list">
        <StoriesList stories={stories}>
          <div className="ui icon message">
            <i className="inbox icon"></i>
            <div className="content">
              <div className="header">Not start your search yet?</div>
              <p>Enter your request in the search form.</p>
            </div>
          </div>
        </StoriesList>
      </div>
    </>
  );
};

export default Stories;
