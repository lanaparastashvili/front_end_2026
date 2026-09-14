import React from 'react';
import { Home, Compass, PlusSquare, Film } from 'lucide-react';
import { TabType } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface MobileNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenCreate: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  onOpenCreate,
}) => {
  const { user } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 h-14 bg-black/95 light:bg-white/95 backdrop-blur-md border-t border-neutral-800 light:border-neutral-200 px-6 flex items-center justify-between z-30">
      <button
        onClick={() => onTabChange('home')}
        className={`p-2 transition ${activeTab === 'home' ? 'text-white light:text-black font-bold' : 'text-neutral-400'}`}
      >
        <Home className={`w-6 h-6 ${activeTab === 'home' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
      </button>

      <button
        onClick={() => onTabChange('explore')}
        className={`p-2 transition ${activeTab === 'explore' ? 'text-white light:text-black font-bold' : 'text-neutral-400'}`}
      >
        <Compass className={`w-6 h-6 ${activeTab === 'explore' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
      </button>

      <button
        onClick={onOpenCreate}
        className="p-2 text-neutral-200 light:text-neutral-800 hover:scale-110 active:scale-95 transition"
      >
        <PlusSquare className="w-6 h-6" />
      </button>

      <button
        onClick={() => onTabChange('reels')}
        className={`p-2 transition ${activeTab === 'reels' ? 'text-white light:text-black font-bold' : 'text-neutral-400'}`}
      >
        <Film className={`w-6 h-6 ${activeTab === 'reels' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
      </button>

      <button
        onClick={() => onTabChange('profile')}
        className={`p-1.5 rounded-full transition ${
          activeTab === 'profile' ? 'ring-2 ring-white light:ring-black' : 'ring-1 ring-transparent'
        }`}
      >
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
          alt={user?.username}
          className="w-6 h-6 rounded-full object-cover"
        />
      </button>
    </nav>
  );
};
