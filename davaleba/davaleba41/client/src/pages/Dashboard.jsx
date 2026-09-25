import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser } from '../api/auth';
import { 
  User, 
  Mail, 
  Key, 
  Calendar, 
  CheckCircle, 
  RefreshCw, 
  LogOut, 
  ShieldCheck, 
  Server, 
  Cloud 
} from 'lucide-react';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [testingApi, setTestingApi] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleTestToken = async () => {
    try {
      setTestingApi(true);
      const res = await getCurrentUser();
      setApiResponse({ success: true, data: res });
    } catch (err) {
      setApiResponse({ success: false, error: err.message });
    } finally {
      setTestingApi(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-indigo-100">
            {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-slate-900">
                გამარჯობა, {user?.name || 'მომხმარებელო'}!
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                ავტორიზებული
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              თქვენ წარმატებით გაიარეთ ავტორიზაცია და იმყოფებით დაცულ ზონაში.
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>სესიიდან გასვლა</span>
        </button>
      </div>

      {/* Grid: Profile Details & Token Session */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <User className="w-5 h-5 text-indigo-600" />
              <span>პროფილის მონაცემები</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Prisma DB</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                ელ-ფოსტა
              </span>
              <span className="font-medium text-slate-900">{user?.email}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                სახელი
              </span>
              <span className="font-medium text-slate-900">{user?.name || 'არ არის მითითებული'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                რეგისტრაციის თარიღი
              </span>
              <span className="font-medium text-slate-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ka-GE') : 'ახლახან'}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-500 flex items-center gap-2">
                <Key className="w-4 h-4 text-slate-400" />
                მომხმარებლის ID
              </span>
              <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded max-w-[200px] truncate">
                {user?.id}
              </span>
            </div>
          </div>
        </div>

        {/* JWT Session Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>JWT ტოკენის სესია</span>
            </h2>
            <button
              onClick={handleTestToken}
              disabled={testingApi}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingApi ? 'animate-spin' : ''}`} />
              <span>API ტესტი</span>
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              აქტიური JWT Bearer ტოკენი ინახება დაცულად და იგზავნება ყოველ რექვესთზე ჰედერში <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">Authorization: Bearer [TOKEN]</code>.
            </p>

            <div className="p-3 bg-slate-900 rounded-xl overflow-hidden">
              <div className="text-xs font-mono text-slate-400 mb-1">JWT Bearer Token:</div>
              <div className="font-mono text-xs text-emerald-400 break-all select-all line-clamp-3">
                {token || 'ტოკენი არ მოიძებნა'}
              </div>
            </div>

            {apiResponse && (
              <div className={`p-3 rounded-xl text-xs font-mono ${apiResponse.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                {apiResponse.success ? (
                  <div>
                    <div className="font-bold flex items-center gap-1 text-emerald-700">
                      <CheckCircle className="w-3.5 h-3.5" />
                      GET /api/auth/me წარმატებით დამოწმდა!
                    </div>
                    <pre className="mt-1 overflow-x-auto text-[11px]">
                      {JSON.stringify(apiResponse.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div>შეცდომა: {apiResponse.error}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deployment Quick Guide Cards */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>🚀 დეფლოიმენთის სტატუსი & ინსტრუქცია</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-indigo-300 font-semibold mb-2">
              <Cloud className="w-5 h-5" />
              <span>Vercel (Frontend დეფლოი)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              კონფიგურირებულია <code className="text-indigo-200">client/vercel.json</code>.
            </p>
            <div className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-indigo-200">
              cd client<br/>
              npx vercel
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-sky-300 font-semibold mb-2">
              <Server className="w-5 h-5" />
              <span>Render (Backend API დეფლოი)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              კონფიგურირებულია <code className="text-sky-200">render.yaml</code> და Health Check <code className="text-sky-200">/health</code>.
            </p>
            <div className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-sky-200">
              Build: npm run build<br/>
              Start: npm run start
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
