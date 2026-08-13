import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvSeries from './pages/TvSeries';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex bg-[#0F1115] font-sans">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-series" element={<TvSeries />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
