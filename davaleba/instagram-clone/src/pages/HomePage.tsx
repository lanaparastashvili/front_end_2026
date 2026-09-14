import React, { useState, useEffect } from 'react';
import { Post, User } from '../types';
import { api } from '../services/api';
import { StoriesTray } from '../components/stories/StoriesTray';
import { PostCard } from '../components/feed/PostCard';
import { SuggestionsSidebar } from '../components/feed/SuggestionsSidebar';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface HomePageProps {
  posts: Post[];
  onPostUpdated: (post: Post) => void;
  onOpenDetail: (post: Post) => void;
  onSelectUser: (userOrId: User | string) => void;
  onOpenEditProfile: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  posts,
  onPostUpdated,
  onOpenDetail,
  onSelectUser,
  onOpenEditProfile,
}) => {
  return (
    <div className="w-full max-w-[935px] mx-auto pt-4 md:pt-6 pb-20 px-2 sm:px-4 flex justify-center gap-8">
      {/* Main Feed Column */}
      <div className="w-full max-w-[630px] flex-1">
        {/* Stories */}
        <StoriesTray />

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPostUpdated={onPostUpdated}
              onOpenDetail={onOpenDetail}
              onSelectUser={(userId) => onSelectUser(userId)}
            />
          ))}

          {/* Caught up message */}
          <div className="text-center py-10 px-4 bg-neutral-950 light:bg-neutral-100 border border-neutral-800 light:border-neutral-200 rounded-2xl">
            <div className="w-12 h-12 rounded-full story-gradient mx-auto flex items-center justify-center text-white mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-base mb-1">You're all caught up</h4>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">
              You've seen all new posts from the last 3 days. Explore more creators to grow your feed!
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar Suggestions (Desktop) */}
      <SuggestionsSidebar
        onSelectUser={(u) => onSelectUser(u)}
        onOpenEditProfile={onOpenEditProfile}
      />
    </div>
  );
};
