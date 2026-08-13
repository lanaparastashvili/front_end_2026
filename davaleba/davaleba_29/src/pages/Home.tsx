import React, { useState } from 'react';
import moviesData from '../data/movies.json';
import TopBar from '../components/TopBar';
import ShowCard from '../components/ShowCard';
import type { MovieItem } from '../types/movie';

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<MovieItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const q = query.toLowerCase();
    
    // Search in both trending and recommended
    const allMovies = [...moviesData.trending, ...moviesData.recommended_for_you];
    // Remove duplicates by title
    const uniqueMovies = Array.from(new Map(allMovies.map(item => [item.title, item])).values());
    
    const results = uniqueMovies.filter(item => item.title.toLowerCase().includes(q));
    setSearchResults(results);
  };

  return (
    <div className="flex-1 ml-20 px-8 pb-12 w-full">
      <TopBar onSearch={handleSearch} />
      
      {isSearching ? (
        <div className="mt-8">
          <h2 className="text-white text-3xl font-light tracking-wide mb-8">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-6 gap-y-8">
            {searchResults.map((show, index) => (
              <ShowCard key={index} show={show} />
            ))}
          </div>
          {searchResults.length === 0 && (
             <div className="text-gray-400 mt-10">No results found.</div>
          )}
        </div>
      ) : (
        <>
          <section className="mt-4 mb-10">
            <h2 className="text-white text-3xl font-light tracking-wide mb-6">Trending</h2>
            <div className="flex overflow-x-auto no-scrollbar pb-4 -mr-8 pr-8">
              {moviesData.trending.map((show, index) => (
                <ShowCard key={index} show={show} isTrending />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white text-3xl font-light tracking-wide mb-6">Recommended for you</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-6 gap-y-8">
              {moviesData.recommended_for_you.map((show, index) => (
                <ShowCard key={index} show={show} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
