import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

interface SuggestionsSidebarProps {
  onSelectUser: (user: User) => void;
  onOpenEditProfile: () => void;
}

export const SuggestionsSidebar: React.FC<SuggestionsSidebarProps> = ({
  onSelectUser,
  onOpenEditProfile,
}) => {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    api.getSuggestions().then((users) => {
      // Exclude logged in user
      const filtered = users.filter((u) => u.id !== user?.id).slice(0, 5);
      setSuggestions(filtered);
    });
  }, [user]);

  const toggleFollow = async (userId: string) => {
    const isNowFollowing = await api.toggleFollowUser(userId);
    setFollowingMap((prev) => ({ ...prev, [userId]: isNowFollowing }));
  };

  if (!user) return null;

  return (
    <aside className="hidden lg:block w-[320px] flex-shrink-0 pt-4 pl-4">
      {/* Current User Card */}
      <div className="flex items-center justify-between mb-6">
        <div
          onClick={() => onSelectUser(user)}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <img
            src={user.avatar}
            alt={user.username}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-ig-primary transition"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate group-hover:underline flex items-center gap-1">
              {user.username}
              {user.isVerified && <span className="text-ig-primary text-xs">●</span>}
            </p>
            <p className="text-xs text-neutral-400 truncate">{user.fullName}</p>
          </div>
        </div>

        <button
          onClick={onOpenEditProfile}
          className="text-xs font-semibold text-ig-primary hover:text-white light:hover:text-black transition"
        >
          Edit
        </button>
      </div>

      {/* Suggested For You Header */}
      <div className="flex items-center justify-between mb-3.5 px-1">
        <span className="text-xs font-semibold text-neutral-400">Suggested for you</span>
        <button className="text-xs font-semibold text-neutral-200 light:text-neutral-800 hover:text-neutral-400">
          See All
        </button>
      </div>

      {/* Suggestions List */}
      <div className="space-y-3 mb-6">
        {suggestions.map((u) => {
          const isFollowing = followingMap[u.id] ?? u.isFollowing ?? false;
          return (
            <div key={u.id} className="flex items-center justify-between">
              <div
                onClick={() => onSelectUser(u)}
                className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0 pr-2 group"
              >
                <img
                  src={u.avatar}
                  alt={u.username}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="min-w-0 truncate">
                  <p className="text-xs font-semibold truncate group-hover:underline flex items-center gap-1">
                    {u.username}
                    {u.isVerified && <span className="text-ig-primary text-[10px]">●</span>}
                  </p>
                  <p className="text-[11px] text-neutral-400 truncate">
                    Followed by {u.followersCount > 50000 ? 'popular creators' : 'friends'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleFollow(u.id)}
                className={`text-xs font-semibold transition ${
                  isFollowing
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-ig-primary hover:text-white'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Meta links footer */}
      <div className="text-[11px] text-neutral-500 space-y-3 px-1">
        <p className="leading-relaxed">
          About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified
        </p>
        <p className="uppercase">© 2026 INSTAGRAM FROM META</p>
      </div>
    </aside>
  );
};
