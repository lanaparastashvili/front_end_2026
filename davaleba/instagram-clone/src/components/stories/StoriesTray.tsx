import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Story } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { StoryViewer } from './StoryViewer';

export const StoriesTray: React.FC = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  useEffect(() => {
    api.getStories().then((res) => setStories(res));
  }, []);

  const handleOpenStory = (index: number) => {
    setActiveStoryIndex(index);
  };

  return (
    <>
      <div className="w-full bg-black light:bg-white border border-neutral-800 light:border-neutral-200 rounded-xl p-4 mb-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-4">
          {/* Current User Add Story Item */}
          <div
            onClick={() => handleOpenStory(0)}
            className="flex flex-col items-center space-y-1.5 flex-shrink-0 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-[2px] story-gradient flex items-center justify-center">
                <div className="w-full h-full bg-black rounded-full p-[2px]">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt="Your Story"
                    className="w-full h-full rounded-full object-cover group-hover:scale-105 transition duration-200"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-ig-primary rounded-full border-2 border-black light:border-white flex items-center justify-center text-white">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[11px] font-medium truncate max-w-[68px] text-neutral-300 light:text-neutral-700">
              Your story
            </span>
          </div>

          {/* Other Users Stories */}
          {stories.slice(1).map((story, idx) => (
            <div
              key={story.id}
              onClick={() => handleOpenStory(idx + 1)}
              className="flex flex-col items-center space-y-1.5 flex-shrink-0 cursor-pointer group"
            >
              <div
                className={`w-16 h-16 rounded-full p-[2px] flex items-center justify-center transition ${
                  story.isSeen ? 'story-gradient-seen' : 'story-gradient'
                }`}
              >
                <div className="w-full h-full bg-black light:bg-white rounded-full p-[2px]">
                  <img
                    src={story.userAvatar}
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover group-hover:scale-105 transition duration-200"
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium truncate max-w-[68px] text-neutral-300 light:text-neutral-700">
                {story.username}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activeStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={activeStoryIndex}
          isOpen={activeStoryIndex !== null}
          onClose={() => setActiveStoryIndex(null)}
        />
      )}
    </>
  );
};
