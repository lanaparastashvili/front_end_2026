import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Pause, Play, Heart, Send, Volume2, VolumeX } from 'lucide-react';
import { Story } from '../../types';
import { api } from '../../services/api';

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  initialIndex,
  isOpen,
  onClose,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialIndex);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setCurrentStoryIndex(initialIndex);
    setCurrentItemIndex(0);
    setProgress(0);
    setLiked(false);
  }, [initialIndex, isOpen]);

  const currentStory = stories[currentStoryIndex];
  const currentItem = currentStory?.items?.[currentItemIndex];

  // Story progress timer
  useEffect(() => {
    if (!isOpen || isPaused || !currentStory || !currentItem) return;

    // Mark current story as seen
    api.markStorySeen(currentStory.id);

    const stepMs = 50;
    const totalMs = (currentItem.duration || 5) * 1000;
    const increment = (stepMs / totalMs) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextItem();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, currentStoryIndex, currentItemIndex, currentStory, currentItem]);

  const handleNextItem = () => {
    setProgress(0);
    setLiked(false);
    if (currentItemIndex < (currentStory?.items?.length || 1) - 1) {
      setCurrentItemIndex((prev) => prev + 1);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setCurrentItemIndex(0);
    } else {
      onClose();
    }
  };

  const handlePrevItem = () => {
    setProgress(0);
    setLiked(false);
    if (currentItemIndex > 0) {
      setCurrentItemIndex((prev) => prev - 1);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      const prevStoryItems = stories[currentStoryIndex - 1]?.items?.length || 1;
      setCurrentItemIndex(prevStoryItems - 1);
    }
  };

  if (!isOpen || !currentStory || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center select-none animate-in fade-in duration-200">
      {/* Top Controls */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-50 transition"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Prev Story Arrow */}
      {currentStoryIndex > 0 && (
        <button
          onClick={handlePrevItem}
          className="hidden md:flex absolute left-8 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur transition z-40"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Story Arrow */}
      {currentStoryIndex < stories.length - 1 && (
        <button
          onClick={handleNextItem}
          className="hidden md:flex absolute right-8 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur transition z-40"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Story Card */}
      <div className="relative w-full max-w-[420px] h-[95vh] max-h-[820px] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Top Progress Bars & Author */}
        <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-30">
          {/* Progress Bars */}
          <div className="flex items-center gap-1 mb-3">
            {currentStory.items.map((item, idx) => {
              let barProgress = 0;
              if (idx < currentItemIndex) barProgress = 100;
              else if (idx === currentItemIndex) barProgress = progress;

              return (
                <div
                  key={item.id}
                  className="flex-1 h-0.5 sm:h-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-75"
                    style={{ width: `${barProgress}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* User Info & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <img
                src={currentStory.userAvatar}
                alt={currentStory.username}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/50"
              />
              <span className="text-white text-xs sm:text-sm font-semibold drop-shadow">
                {currentStory.username}
              </span>
              <span className="text-white/60 text-xs">{currentItem.createdAt}</span>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <button
                onClick={() => setIsPaused((prev) => !prev)}
                className="p-1 hover:opacity-80 transition"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="p-1 hover:opacity-80 transition"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Media Container */}
        <div
          className="flex-1 bg-black flex items-center justify-center relative cursor-pointer"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <img
            src={currentItem.mediaUrl}
            alt="story"
            className="w-full h-full object-cover"
          />

          {/* Left tap zone for prev */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              handlePrevItem();
            }}
            className="absolute inset-y-0 left-0 w-1/3 z-20"
          />
          {/* Right tap zone for next */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleNextItem();
            }}
            className="absolute inset-y-0 right-0 w-1/3 z-20"
          />

          {/* Story Caption overlay */}
          {currentItem.caption && (
            <div className="absolute bottom-20 inset-x-4 p-3 bg-black/60 backdrop-blur-md rounded-xl text-white text-xs sm:text-sm text-center leading-relaxed drop-shadow z-20">
              {currentItem.caption}
            </div>
          )}
        </div>

        {/* Bottom Reply Bar */}
        <div className="p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-30 flex items-center space-x-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to ${currentStory.username}...`}
            className="flex-1 bg-neutral-900/80 border border-white/20 rounded-full px-4 py-2 text-xs sm:text-sm text-white placeholder-white/60 outline-none focus:border-white/50 transition"
          />
          <button
            onClick={() => setLiked((prev) => !prev)}
            className="p-2 text-white hover:scale-110 active:scale-95 transition"
          >
            <Heart
              className={`w-6 h-6 ${liked ? 'text-ig-like fill-ig-like animate-bounce' : 'text-white'}`}
            />
          </button>
          <button
            onClick={() => {
              if (replyText.trim()) {
                setReplyText('');
                alert(`Reply sent to ${currentStory.username}!`);
              }
            }}
            className="p-2 text-white hover:scale-110 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
