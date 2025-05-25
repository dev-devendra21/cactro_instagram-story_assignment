import React, { useEffect, useRef, useState } from "react";

interface Props {
  story: { image: string; id: number };
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const StoryView: React.FC<Props> = ({ story, onNext, onPrev, onClose }) => {
  const timerRef = useRef<null | number>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const img = new Image();
    img.src = story.image;
    img.onload = () => {
      setLoading(false);
      timerRef.current = setTimeout(onNext, 5000);
    };

    return () => {
      setLoading(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [story]);

  const handleTap = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;

    if (target.tagName === "IMG") {
      const innerWidth = window.innerWidth;
      const tapX = e.touches[0].clientX;
      if (tapX < innerWidth / 2) {
        onPrev();
      } else if (tapX > innerWidth / 2) {
        onNext();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black text-white flex items-center justify-center z-50"
      onTouchStart={handleTap}
    >
      {loading ? (
        <div className="text-xl">Loading...</div>
      ) : (
        <img
          src={story.image}
          alt="Current Story"
          className="max-h-full w-full object-contain transition-opacity duration-500 ease-in-out"
        />
      )}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        ✕
      </button>
    </div>
  );
};

export default StoryView;
