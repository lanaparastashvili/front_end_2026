import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LogOut, User, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-xl tracking-tight hover:opacity-90">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span>AuthFlow</span>
            <span className="hidden sm:inline-block text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium ml-1">
              Vercel + Render
            </span>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              to="/"
              className="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              მთავარი
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1.5 text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                  <span>დაშბორდი</span>
                </Link>

                <div className="h-4 w-px bg-slate-200 mx-1"></div>

                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 font-medium bg-slate-100 px-3 py-1.5 rounded-full">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center space-x-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  title="გასვლა"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">გასვლა</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-1.5 text-slate-700 hover:text-indigo-600 px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  <span>შესვლა</span>
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-indigo-200 transition-all hover:shadow-indigo-300"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>რეგისტრაცია</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
