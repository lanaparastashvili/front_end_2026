import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

const SCREENSHOTS = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
];

export const AuthPage: React.FC = () => {
  const { login, register, demoLogin, isLoading } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Screenshot slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SCREENSHOTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        if (!emailOrPhone || !fullName || !username || !password) {
          setError('Please fill in all fields.');
          return;
        }
        await register({ emailOrPhone, fullName, username, password });
      } else {
        if (!username || !password) {
          setError('Please enter your username/email and password.');
          return;
        }
        await login(username, password);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black light:bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex items-center justify-center gap-10">
        {/* Left: Phone mockup with rotating screenshot carousel (Desktop only) */}
        <div className="hidden md:block relative w-[380px] h-[580px] flex-shrink-0">
          {/* Phone Frame */}
          <div className="w-full h-full bg-neutral-900 border-[10px] border-neutral-800 rounded-[45px] shadow-2xl p-2.5 relative overflow-hidden ring-1 ring-neutral-700/50">
            {/* Phone Notch */}
            <div className="absolute top-2 inset-x-0 mx-auto w-28 h-4 bg-neutral-800 rounded-b-xl z-20" />

            {/* Rotating Screenshots */}
            <div className="w-full h-full rounded-[35px] overflow-hidden relative">
              {SCREENSHOTS.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="app preview"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    idx === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Gradient Overlay for aesthetic look */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 inset-x-6 text-white text-center">
                <span className="text-xl font-bold font-logo bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent">
                  Instagram
                </span>
                <p className="text-xs text-neutral-300 mt-1">Connect with friends, share moments & explore creativity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Auth Card */}
        <div className="w-full max-w-[350px] space-y-3">
          <div className="bg-black light:bg-white border border-neutral-800 light:border-neutral-300 rounded-xl p-8 shadow-xl">
            {/* Instagram Logo */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold font-logo bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Instagram
              </h1>
              {isRegister && (
                <p className="text-xs font-medium text-neutral-400 mt-2">
                  Sign up to see photos and videos from your friends.
                </p>
              )}
            </div>

            {/* Demo 1-Click Login Button */}
            <button
              onClick={() => demoLogin()}
              disabled={isLoading}
              type="button"
              className="w-full mb-4 py-2 px-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white text-xs font-semibold rounded-lg shadow flex items-center justify-center gap-1.5 transition active:scale-98"
            >
              <Sparkles className="w-4 h-4" /> 1-Click Demo Login (Alex Morgan)
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-neutral-800 light:border-neutral-300" />
              <span className="px-3 text-xs font-bold text-neutral-500 uppercase">OR</span>
              <div className="flex-1 border-t border-neutral-800 light:border-neutral-300" />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2.5 mb-3 text-xs text-red-400 bg-red-950/40 border border-red-800/50 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              {isRegister && (
                <>
                  <input
                    type="text"
                    placeholder="Mobile Number or Email"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full bg-neutral-900 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 rounded-md px-3 py-2 text-xs outline-none focus:border-neutral-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-900 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 rounded-md px-3 py-2 text-xs outline-none focus:border-neutral-500"
                    required
                  />
                </>
              )}

              <input
                type="text"
                placeholder={isRegister ? 'Username' : 'Phone number, username, or email'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-900 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 rounded-md px-3 py-2 text-xs outline-none focus:border-neutral-500"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-900 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 rounded-md px-3 py-2 text-xs outline-none focus:border-neutral-500 pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-ig-primary hover:bg-ig-primaryHover text-white text-xs sm:text-sm font-semibold rounded-lg shadow transition disabled:opacity-50 mt-2"
              >
                {isLoading ? 'Processing...' : isRegister ? 'Sign Up' : 'Log In'}
              </button>
            </form>

            {isRegister && (
              <p className="text-[10px] text-neutral-500 text-center mt-4 leading-relaxed">
                By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
              </p>
            )}

            {!isRegister && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setUsername('alex.creator');
                    setPassword('instagram123');
                  }}
                  className="text-xs text-neutral-400 hover:underline"
                >
                  Forgot password? (Auto-fill demo)
                </button>
              </div>
            )}
          </div>

          {/* Toggle Switch between Sign In / Sign Up */}
          <div className="bg-black light:bg-white border border-neutral-800 light:border-neutral-300 rounded-xl p-4 text-center text-xs sm:text-sm">
            {isRegister ? (
              <p>
                Have an account?{' '}
                <button
                  onClick={() => {
                    setIsRegister(false);
                    setError('');
                  }}
                  className="font-semibold text-ig-primary hover:underline"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setIsRegister(true);
                    setError('');
                  }}
                  className="font-semibold text-ig-primary hover:underline"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>

          {/* Get the app note */}
          <div className="text-center pt-2 text-xs text-neutral-500">
            Get the full Instagram web experience
          </div>
        </div>
      </div>
    </div>
  );
};
