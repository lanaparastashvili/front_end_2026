import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X, User as UserIcon } from 'lucide-react';
import { User, Post } from '../../types';
import { api } from '../../services/api';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: User) => void;
  onSelectPost: (post: Post) => void;
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({
  isOpen,
  onClose,
  onSelectUser,
  onSelectPost,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ users: User[]; posts: Post[] }>({ users: [], posts: [] });
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'elena_nature',
    '#dolomites',
    'photography',
    'marco.streets',
  ]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ users: [], posts: [] });
      return;
    }
    const timer = setTimeout(async () => {
      const res = await api.search(query);
      setResults(res);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 md:left-[72px] lg:left-[244px] w-full sm:w-[397px] bg-neutral-950 dark:bg-black light:bg-white border-r border-neutral-800 light:border-neutral-200 z-40 flex flex-col shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-neutral-800 light:border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Search</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white light:hover:text-black hover:bg-neutral-800 light:hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-3.5 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            autoFocus
            className="w-full bg-neutral-900 light:bg-neutral-100 text-sm rounded-lg pl-10 pr-9 py-2.5 outline-none focus:ring-1 focus:ring-neutral-700 light:focus:ring-neutral-300 placeholder-neutral-500 transition"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-0.5 rounded-full bg-neutral-700 text-neutral-300 hover:text-white text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!query.trim() ? (
          <div>
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-sm font-semibold">Recent</span>
              {recentSearches.length > 0 && (
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-xs font-semibold text-ig-primary hover:text-white light:hover:text-black transition"
                >
                  Clear all
                </button>
              )}
            </div>

            {recentSearches.length === 0 ? (
              <div className="text-center py-12 text-sm text-neutral-500">
                No recent searches.
              </div>
            ) : (
              <div className="space-y-1">
                {recentSearches.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setQuery(item.replace('#', ''))}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-900 light:hover:bg-neutral-100 cursor-pointer transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400">
                        {item.startsWith('#') ? '#' : <UserIcon className="w-5 h-5" />}
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRecentSearches((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="text-neutral-500 hover:text-neutral-300 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Users */}
            {results.users.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase px-2">Accounts</span>
                <div className="mt-2 space-y-1">
                  {results.users.map((u) => (
                    <div
                      key={u.id}
                      onClick={() => {
                        onSelectUser(u);
                        onClose();
                      }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-900 light:hover:bg-neutral-100 cursor-pointer transition"
                    >
                      <img
                        src={u.avatar}
                        alt={u.username}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate flex items-center gap-1">
                          {u.username}
                          {u.isVerified && <span className="text-ig-primary text-xs">●</span>}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">{u.fullName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posts */}
            {results.posts.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase px-2">Posts</span>
                <div className="grid grid-cols-3 gap-1.5 mt-2">
                  {results.posts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => {
                        onSelectPost(post);
                        onClose();
                      }}
                      className="aspect-square relative group cursor-pointer overflow-hidden rounded"
                    >
                      <img
                        src={post.mediaUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.users.length === 0 && results.posts.length === 0 && (
              <div className="text-center py-12 text-sm text-neutral-500">
                No results found for "{query}".
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
