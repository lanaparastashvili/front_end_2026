import React from 'react';
import { Heart, MessageCircle, Moon, Sun } from 'lucide-react';
import { TabType } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface MobileHeaderProps {
  onTabChange: (tab: TabType) => void;
  unreadMessagesCount?: number;
  unreadNotifsCount?: number;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onTabChange,
  unreadMessagesCount = 2,
  unreadNotifsCount = 2,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="md:hidden sticky top-0 inset-x-0 h-14 bg-black/90 light:bg-white/90 backdrop-blur-md border-b border-neutral-800 light:border-neutral-200 px-4 flex items-center justify-between z-30">
      <div onClick={() => onTabChange('home')} className="cursor-pointer">
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-logo">
          Instagram
        </span>
      </div>

      <div className="flex items-center space-x-3 text-neutral-200 light:text-neutral-800">
        <button
          onClick={toggleTheme}
          className="p-1.5 hover:bg-neutral-800 light:hover:bg-neutral-100 rounded-full transition"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
        </button>

        <button
          onClick={() => onTabChange('notifications')}
          className="relative p-1.5 hover:bg-neutral-800 light:hover:bg-neutral-100 rounded-full transition"
        >
          <Heart className="w-6 h-6" />
          {unreadNotifsCount > 0 && (
            <span className="absolute 1.5 top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => onTabChange('messages')}
          className="relative p-1.5 hover:bg-neutral-800 light:hover:bg-neutral-100 rounded-full transition"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-1 right-1 px-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadMessagesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
