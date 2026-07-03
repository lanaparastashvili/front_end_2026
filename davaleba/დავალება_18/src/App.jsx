import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    fetchUser('octocat');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const fetchUser = async (username) => {
    setIsError(false);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        setIsError(true);
        return;
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="app-container">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <SearchBar onSearch={fetchUser} isError={isError} />
      <UserProfile user={user} />
    </div>
  );
}

export default App;
