import React, { useState, useEffect } from 'react';
import { Post, User } from '../types';
import { api } from '../services/api';
import { Heart, MessageCircle, Search, Compass } from 'lucide-react';

interface ExplorePageProps {
  onOpenDetail: (post: Post) => void;
  onSelectUser: (userOrId: User | string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onOpenDetail }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getExplorePosts().then((res) => {
      setPosts(res);
      setIsLoading(false);
    });
  }, []);

  const filtered = posts.filter(
    (p) =>
      p.caption.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[975px] mx-auto pt-4 md:pt-6 pb-20 px-2 sm:px-4">
      {/* Mobile / Quick Explore Search bar */}
      <div className="mb-6 relative max-w-md mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Search explore (e.g. photography, nature, design)..."
          className="w-full bg-neutral-900 light:bg-neutral-100 border border-neutral-800 light:border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-ig-primary placeholder-neutral-500"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-4">
        {filtered.map((post, idx) => {
          // Feature tile layout pattern (every 5th or 6th item expands on desktop)
          const isLarge = idx % 10 === 1 || idx % 10 === 7;

          return (
            <div
              key={post.id}
              onClick={() => onOpenDetail(post)}
              className={`relative group cursor-pointer overflow-hidden rounded-md sm:rounded-xl aspect-square bg-neutral-900 ${
                isLarge ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
              }`}
            >
              <img
                src={post.mediaUrl}
                alt={post.caption}
                className={`w-full h-full object-cover group-hover:scale-105 transition duration-300 ${post.filter || 'filter-normal'}`}
                loading="lazy"
              />

              {/* Hover overlay with Like and Comment counts */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-6 text-white font-bold text-sm sm:text-base">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{post.likesCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{post.commentsCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && !isLoading && (
        <div className="text-center py-20 text-neutral-500 text-sm">
          No explore posts match "{filterQuery}".
        </div>
      )}
    </div>
  );
};
