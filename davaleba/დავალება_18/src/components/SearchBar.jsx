import React, { useState } from 'react';


const SearchBar = ({ onSearch, isError }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <svg className="search-icon" width="25" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.556 16.911C14.07 16.911 16.91 14.07 16.91 10.555c0-3.514-2.84-6.355-6.354-6.355-3.515 0-6.356 2.841-6.356 6.355 0 3.515 2.841 6.356 6.356 6.356zm10.493 4.296l-4.521-4.522c1.378-1.782 2.197-4.043 2.197-6.49 0-5.836-4.733-10.569-10.57-10.569S-2.415 4.359-2.415 10.195s4.734 10.57 10.57 10.57c2.446 0 4.707-.819 6.489-2.197l4.522 4.521a1.2 1.2 0 101.697-1.697z" fill="#0079ff" fillRule="nonzero"/>
      </svg>
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {isError && <span className="error-msg">No results</span>}
      <button type="submit" className="search-btn">Search</button>
    </form>
  );
};

export default SearchBar;
