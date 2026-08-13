import React from 'react';
import { Home, Film, Tv, Bookmark, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-20 bg-[#16181E] h-screen flex flex-col items-center py-8 border-r border-[#2C2E35] fixed left-0 top-0">
      <div className="mb-12">
        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white">
          TV
        </div>
      </div>
      
      <nav className="flex flex-col gap-8 flex-1">
        <NavLink to="/" className={({ isActive }) => `p-3 rounded-xl transition-colors ${isActive ? 'bg-[#2C2E35] text-white' : 'text-gray-400 hover:text-white hover:bg-[#20222A]'}`}>
          <Home size={20} />
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => `p-3 rounded-xl transition-colors ${isActive ? 'bg-[#2C2E35] text-white' : 'text-gray-400 hover:text-white hover:bg-[#20222A]'}`}>
          <Film size={20} />
        </NavLink>
        <NavLink to="/tv-series" className={({ isActive }) => `p-3 rounded-xl transition-colors ${isActive ? 'bg-[#2C2E35] text-white' : 'text-gray-400 hover:text-white hover:bg-[#20222A]'}`}>
          <Tv size={20} />
        </NavLink>
        <NavLink to="/bookmarks" className={({ isActive }) => `p-3 rounded-xl transition-colors ${isActive ? 'bg-[#2C2E35] text-white' : 'text-gray-400 hover:text-white hover:bg-[#20222A]'}`}>
          <Bookmark size={20} />
        </NavLink>
      </nav>
      
      <div className="mt-auto">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-gray-400 transition-colors cursor-pointer">
           <User size={20} className="text-gray-300"/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
