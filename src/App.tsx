import React, { useState, useEffect } from "react";

import StoryList from "./components/StoryList";
import StoryView from "./components/StoryView";
import storiesData from "./data/stories.json";

type Story = { id: number; image: string };

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    setStories(storiesData);
  }, []);

  const openStory = (index: number) => {
    setCurrentIndex(index);
  };

  const closeViewer = () => {
    setCurrentIndex(null);
  };

  const nextStory = () => {
    setCurrentIndex((prev) =>
      prev !== null && prev + 1 < stories.length ? prev + 1 : null
    );
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <StoryList stories={stories} onStoryClick={openStory} />
      {currentIndex !== null && (
        <StoryView
          story={stories[currentIndex]}
          onNext={nextStory}
          onPrev={prevStory}
          onClose={closeViewer}
        />
      )}
    </div>
  );
};

export default App;
