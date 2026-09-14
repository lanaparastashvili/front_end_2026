import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { User } from '../../types';
import { INITIAL_USERS } from '../../services/mockData';
import { api } from '../../services/api';

interface FollowListModalProps {
  isOpen: boolean;
  type: 'followers' | 'following';
  onClose: () => void;
  onSelectUser: (user: User) => void;
}

export const FollowListModal: React.FC<FollowListModalProps> = ({
  isOpen,
  type,
  onClose,
  onSelectUser,
}) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  if (!isOpen) return null;

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(query.toLowerCase()) ||
      u.fullName.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFollow = async (userId: string) => {
    const isNowFollowing = await api.toggleFollowUser(userId);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              isFollowing: isNowFollowing,
              followersCount: isNowFollowing ? u.followersCount + 1 : Math.max(0, u.followersCount - 1),
            }
          : u
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-neutral-800 light:border-neutral-200 flex items-center justify-between">
          <div className="w-5" />
          <h3 className="font-semibold text-sm capitalize">{type}</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white light:hover:text-black p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-neutral-800 light:border-neutral-200">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-neutral-800 light:bg-neutral-100 text-xs sm:text-sm rounded-lg pl-9 pr-3 py-2 outline-none placeholder-neutral-500"
            />
          </div>
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-800/50 light:hover:bg-neutral-100 transition"
            >
              <div
                onClick={() => {
                  onSelectUser(u);
                  onClose();
                }}
                className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0"
              >
                <img
                  src={u.avatar}
                  alt={u.username}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="truncate">
                  <p className="text-sm font-semibold truncate flex items-center gap-1">
                    {u.username}
                    {u.isVerified && <span className="text-ig-primary text-xs">●</span>}
                  </p>
                  <p className="text-xs text-neutral-400 truncate">{u.fullName}</p>
                </div>
              </div>

              <button
                onClick={() => toggleFollow(u.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ml-2 ${
                  u.isFollowing
                    ? 'bg-neutral-800 light:bg-neutral-200 text-white light:text-black hover:bg-neutral-700'
                    : 'bg-ig-primary text-white hover:bg-ig-primaryHover'
                }`}
              >
                {u.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-10 text-xs text-neutral-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
