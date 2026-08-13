import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface TopBarProps {
  onSearch: (query: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full pt-8 pb-4 sticky top-0 bg-[#0F1115] z-10">
      <form onSubmit={handleSubmit} className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies or TV series"
          className="w-full bg-[#16181E] text-white placeholder-gray-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#2C2E35] transition-all"
        />
      </form>
    </div>
  );
};

export default TopBar;
