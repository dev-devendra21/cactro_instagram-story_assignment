import React from "react";

interface Props {
  stories: { image: string; id: number }[];
  onStoryClick: (index: number) => void;
}
const StoryList: React.FC<Props> = ({ stories, onStoryClick }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto border-b border-gray-300 pb-2">
      {stories.map((story, index) => (
        <img
          key={story.id}
          src={story.image}
          alt={`Story ${story.id}`}
          onClick={() => onStoryClick(index)}
          className="w-20 h-20 object-cover rounded-[50%] cursor-pointer flex-shrink-0"
        />
      ))}
    </div>
  );
};

export default StoryList;
