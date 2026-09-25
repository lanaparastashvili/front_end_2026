import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, KeyRound, Server, Cloud, CheckCircle2, ArrowRight, Activity, Terminal } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const [apiStatus, setApiStatus] = useState({ checking: true, online: false, data: null });

  useEffect(() => {
    const checkApi = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const res = await fetch(`${baseUrl}/health`);
        if (res.ok) {
          const json = await res.json();
          setApiStatus({ checking: false, online: true, data: json });
        } else {
          setApiStatus({ checking: false, online: false, data: null });
        }
      } catch (err) {
        setApiStatus({ checking: false, online: false, data: null });
      }
    };
    checkApi();
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* API Health Indicator Badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium border bg-white shadow-sm">
          <Activity className={`w-3.5 h-3.5 ${apiStatus.online ? 'text-emerald-500 animate-pulse' : 'text-amber-500'}`} />
          <span className="text-slate-600">Backend API სტატუსი:</span>
          {apiStatus.checking ? (
            <span className="text-slate-400">მოწმდება...</span>
          ) : apiStatus.online ? (
            <span className="text-emerald-600 font-semibold">ონლაინ (Render / Local)</span>
          ) : (
            <span className="text-amber-600 font-semibold">დაუკავშირებელი</span>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          სრულყოფილი <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Full-Stack Auth</span> სისტემა
        </h1>
        <p className="mt-5 text-lg text-slate-600 leading-relaxed">
          თანამედროვე, უსაფრთხო ავტორიზაციის არქიტექტურა. მომზადებული მარტივი და მძლავრი დეფლოიმენთისთვის <strong className="text-slate-900">Vercel</strong>-სა და <strong className="text-slate-900">Render</strong>-ზე.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all space-x-2"
            >
              <span>გადასვლა დაშბორდზე</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all space-x-2"
              >
                <span>დაიწყე რეგისტრაცია</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all"
              >
                <span>შესვლა ანგარიშში</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Deployment & Tech Highlights */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">JWT & Bcrypt უსაფრთხოება</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            პაროლების დაცული ჰეშირება `bcryptjs`-ით, დაცული Bearer JWT ტოკენები და დაცული მარშრუტები ავტორიზაციისთვის.
          </p>
          <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
            <li className="flex items-center space-x-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Salting & Hashing</span></li>
            <li className="flex items-center space-x-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Token Expiration & Refresh</span></li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 mb-4">
            <Cloud className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Vercel Deployment (Frontend)</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            სწრაფი React + Vite აპლიკაცია მორგებული `vercel.json` კონფიგურაციით, SPA routing rewrite-ით და გლობალური CDN-ით.
          </p>
          <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
            <li className="flex items-center space-x-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>SPA Rewrites & Headers</span></li>
            <li className="flex items-center space-x-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Vercel CLI & Git CI/CD</span></li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-4">
            <Server className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Render Deployment (Backend)</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Node/Express REST API Prisma ORM-ით. მხარდაჭერილია Render Web Service, Health Check და `render.yaml` Blueprint.
          </p>
          <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
            <li className="flex items-center space-x-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Render Web Service Blueprint</span></li>
            <li className="flex items-center space-x-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>PostgreSQL & SQLite Support</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
