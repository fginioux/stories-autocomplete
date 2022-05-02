import React from "react";
import StoryItem, { Story } from "./StoryItem";

const StoriesList: React.FC<StoriesListProps> = ({ stories, children }) => {
  return (
    <div
      className={`StoriesList ui relaxed divided list ${
        !stories?.length ? " StoriesList--empty" : ""
      }`}
    >
      {!!stories?.length &&
        stories.map((story) => {
          const { created_at, author } = story;
          return (
            <StoryItem
              key={`story-item-${created_at}-${author}`}
              story={story}
            />
          );
        })}

      {!stories?.length && children}
    </div>
  );
};

export default StoriesList;

interface StoriesListProps {
  stories: Array<Story>;
  children?: React.ReactNode | undefined;
}
