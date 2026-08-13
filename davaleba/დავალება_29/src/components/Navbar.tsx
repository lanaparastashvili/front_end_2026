import React from 'react';

interface NavbarProps {
  query: string;
  onQueryChange: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ query, onQueryChange }) => {
  return (
    <header className="sticky top-0 z-40 glass-dark border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-600/40">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight hidden sm:block">
            TV<span className="gradient-text">Maze</span>
          </span>
        </div>

        {/* Search bar */}
        <div className="flex-1 relative max-w-xl">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="show-search-input"
            type="text"
            placeholder="Search for TV shows..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full bg-dark-600/80 border border-white/10 hover:border-white/20 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40 text-white placeholder-white/30 rounded-xl py-2 pl-9 pr-4 text-sm outline-none transition-all duration-200 font-sans"
          />
          {query && (
            <button
              id="clear-search-btn"
              onClick={() => onQueryChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://www.tvmaze.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white text-xs font-medium transition-colors hidden sm:block"
          >
            TVMaze.com
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
