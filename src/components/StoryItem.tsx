import React from "react";
import { formatDate } from "../utils";

const StoryItem: React.FC<StoryProps> = ({ story }) => {
  return (
    <div className="ui item">
      <div className="content">
        <h2>{story.title}</h2>
        <div>
          <p>
            <span>Author: {story.author}</span>
            <span>Created: {formatDate(story.created_at)}</span>
            <span>Points: {story.points}</span>
          </p>
          {story.url && (
            <a href={story.url} rel="noreferrer" target="_blank">
              Visit here
              <i className="icon external alternate small"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryItem;

export type Story = {
  author: string;
  created_at: string;
  title: string;
  url?: string;
  points: number;
  created_at_i: number;
};

interface StoryProps {
  story: Story;
}
