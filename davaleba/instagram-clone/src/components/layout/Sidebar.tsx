import React, { useState } from 'react';
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  Menu,
  Moon,
  Sun,
  LogOut,
  Bookmark,
} from 'lucide-react';
import { TabType, User, Post } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { SearchDrawer } from '../drawers/SearchDrawer';
import { NotificationsDrawer } from '../drawers/NotificationsDrawer';

const IgIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenCreate: () => void;
  onSelectUser: (user: User) => void;
  onSelectPost: (post: Post) => void;
  unreadMessagesCount?: number;
  unreadNotifsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenCreate,
  onSelectUser,
  onSelectPost,
  unreadMessagesCount = 2,
  unreadNotifsCount = 2,
}) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleSearchClick = () => {
    setIsNotifsOpen(false);
    setIsSearchOpen((prev) => !prev);
  };

  const handleNotifsClick = () => {
    setIsSearchOpen(false);
    setIsNotifsOpen((prev) => !prev);
  };

  const isDrawerOpen = isSearchOpen || isNotifsOpen;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      onClick: handleSearchClick,
      active: isSearchOpen,
    },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'reels', label: 'Reels', icon: Film },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageCircle,
      badge: unreadMessagesCount,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Heart,
      onClick: handleNotifsClick,
      active: isNotifsOpen,
      badge: unreadNotifsCount,
    },
    {
      id: 'create',
      label: 'Create',
      icon: PlusSquare,
      onClick: onOpenCreate,
    },
  ];

  return (
    <>
      <aside
        className={`hidden md:flex flex-col fixed inset-y-0 left-0 bg-black light:bg-white border-r border-neutral-800 light:border-neutral-200 z-30 transition-all duration-300 py-6 px-3 ${
          isDrawerOpen ? 'w-[72px]' : 'w-[72px] lg:w-[244px]'
        }`}
      >
        {/* Instagram Logo */}
        <div className="px-3 mb-8">
          <div
            onClick={() => {
              setIsSearchOpen(false);
              setIsNotifsOpen(false);
              onTabChange('home');
            }}
            className="cursor-pointer flex items-center"
          >
            {isDrawerOpen ? (
              <IgIcon className="w-6 h-6 hover:scale-110 transition" />
            ) : (
              <>
                <span className="hidden lg:block text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-logo">
                  Instagram
                </span>
                <IgIcon className="lg:hidden w-6 h-6 hover:scale-110 transition" />
              </>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.active !== undefined
                ? item.active
                : activeTab === item.id && !isDrawerOpen;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    setIsSearchOpen(false);
                    setIsNotifsOpen(false);
                    onTabChange(item.id as TabType);
                  }
                }}
                className={`w-full flex items-center p-3 rounded-xl transition duration-150 relative group ${
                  isActive
                    ? 'font-bold bg-neutral-900 light:bg-neutral-100 text-white light:text-black'
                    : 'text-neutral-300 light:text-neutral-700 hover:bg-neutral-900/60 light:hover:bg-neutral-100/70 hover:text-white light:hover:text-black'
                } ${isDrawerOpen ? 'justify-center' : 'justify-center lg:justify-start space-x-4'}`}
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition group-hover:scale-105 ${
                      isActive ? 'stroke-[2.5px]' : 'stroke-2'
                    }`}
                  />
                  {item.badge && item.badge > 0 && !isActive && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>

                {!isDrawerOpen && (
                  <span className="hidden lg:inline text-sm tracking-wide">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}

          {/* Profile Tab */}
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setIsNotifsOpen(false);
              onTabChange('profile');
            }}
            className={`w-full flex items-center p-3 rounded-xl transition duration-150 relative group ${
              activeTab === 'profile' && !isDrawerOpen
                ? 'font-bold bg-neutral-900 light:bg-neutral-100'
                : 'text-neutral-300 light:text-neutral-700 hover:bg-neutral-900/60 light:hover:bg-neutral-100/70'
            } ${isDrawerOpen ? 'justify-center' : 'justify-center lg:justify-start space-x-4'}`}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-ig-primary transition flex-shrink-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={user?.username}
                className="w-full h-full object-cover"
              />
            </div>
            {!isDrawerOpen && (
              <span className="hidden lg:inline text-sm tracking-wide truncate">
                Profile
              </span>
            )}
          </button>
        </nav>

        {/* More Menu at bottom */}
        <div className="relative pt-2">
          <button
            onClick={() => setShowMoreMenu((prev) => !prev)}
            className={`w-full flex items-center p-3 rounded-xl transition duration-150 text-neutral-300 light:text-neutral-700 hover:bg-neutral-900 light:hover:bg-neutral-100 hover:text-white light:hover:text-black ${
              isDrawerOpen ? 'justify-center' : 'justify-center lg:justify-start space-x-4'
            }`}
          >
            <Menu className="w-6 h-6" />
            {!isDrawerOpen && (
              <span className="hidden lg:inline text-sm font-medium">More</span>
            )}
          </button>

          {/* More popup */}
          {showMoreMenu && (
            <div className="absolute bottom-16 left-2 w-64 bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <button
                onClick={() => {
                  toggleTheme();
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-neutral-800 light:hover:bg-neutral-100 text-sm text-neutral-200 light:text-neutral-800 transition"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                <span>Switch appearance ({theme === 'dark' ? 'Light mode' : 'Dark mode'})</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('profile');
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-neutral-800 light:hover:bg-neutral-100 text-sm text-neutral-200 light:text-neutral-800 transition"
              >
                <Bookmark className="w-4 h-4" />
                <span>Saved posts</span>
              </button>

              <div className="my-1 border-t border-neutral-800 light:border-neutral-200" />

              <button
                onClick={() => {
                  setShowMoreMenu(false);
                  logout();
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/10 text-sm text-red-500 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Drawers */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectUser={(u) => {
          onSelectUser(u);
          setIsSearchOpen(false);
        }}
        onSelectPost={(p) => {
          onSelectPost(p);
          setIsSearchOpen(false);
        }}
      />

      <NotificationsDrawer
        isOpen={isNotifsOpen}
        onClose={() => setIsNotifsOpen(false)}
        onSelectPost={(postId) => {
          setIsNotifsOpen(false);
        }}
      />
    </>
  );
};
