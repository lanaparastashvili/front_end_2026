import { useState } from 'react';
import { api } from '../api';

type Status = 'idle' | 'checking' | 'granted' | 'denied';

export default function SecretPanel() {
  const [headerValue, setHeaderValue] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [secretData, setSecretData] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const attempt = async () => {
    setStatus('checking');
    setSecretData(null);
    setMessage(null);
    try {
      const res = await api.getSecret(headerValue);
      setStatus('granted');
      setSecretData(res.secretData);
      setMessage(res.message);
    } catch (error: any) {
      setStatus('denied');
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="animate-fade-in max-w-xl">
      <h2 className="text-xl font-semibold text-ink mb-6">დაცული ინფორმაცია</h2>

      <div className="relative rounded-xl border border-border bg-panel overflow-hidden">
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${status === 'granted' ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(79,209,197,0.12), transparent 60%)',
          }}
        />

        <div className="relative p-6 flex flex-col items-center text-center">
          <div
            className={`relative h-16 w-16 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-500 overflow-hidden ${status === 'granted'
              ? 'border-cyan text-cyan animate-pulse-ring'
              : status === 'denied'
                ? 'border-red text-red'
                : 'border-ink-faint text-ink-faint'
              }`}
          >
            {status === 'checking' && (
              <span className="absolute inset-0 animate-unlock-sweep bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
            )}
            <span className="text-2xl leading-none">
              {status === 'granted' ? '🔓' : status === 'denied' ? '✕' : '🔒'}
            </span>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-4">
            {status === 'idle' && 'ველოდები header-ს'}
            {status === 'checking' && 'ვამოწმებ header-ებს…'}
            {status === 'granted' && 'წვდომა დაშვებულია'}
            {status === 'denied' && 'წვდომა უარყოფილია'}
          </p>

          <div className="w-full">
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-faint mb-1.5 text-left">
              header: X-Role
            </label>
            <div className="flex gap-2">
              <input
                value={headerValue}
                onChange={(e) => setHeaderValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && attempt()}
                placeholder="მაგ: admin ან guest"
                className="flex-1 rounded-md border border-border bg-panel-raised px-3 py-2 text-sm font-mono text-ink outline-none focus:border-cyan-dim transition"
              />
              <button
                onClick={attempt}
                disabled={status === 'checking'}
                className="shrink-0 rounded-md bg-amber px-4 py-2 text-sm font-semibold text-void hover:brightness-110 disabled:opacity-40 transition"
              >
                გაგზავნა
              </button>
            </div>
          </div>

          {status === 'granted' && secretData && (
            <div className="mt-5 w-full rounded-md border border-cyan-dim bg-cyan-dim/10 p-4 text-left animate-fade-in">
              <p className="text-xs font-mono text-cyan mb-1">{message}</p>
              <p className="text-sm text-ink">{secretData}</p>
            </div>
          )}

          {status === 'denied' && (
            <div className="mt-5 w-full rounded-md border border-red-dim bg-red-dim/10 p-4 text-left animate-fade-in">
              <p className="text-sm text-red">
                {message || '403 — header-ში სიტყვა „admin" ვერ მოიძებნა.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
