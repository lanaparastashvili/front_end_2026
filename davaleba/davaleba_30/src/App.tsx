import { useState } from 'react';
import ItemsPanel from './components/ItemsPanel';
import SecretPanel from './components/SecretPanel';

type Tab = 'items' | 'secret';

export default function App() {
  const [tab, setTab] = useState<Tab>('items');

  return (
    <div className="min-h-screen bg-void">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-md bg-cyan/15 border border-cyan-dim flex items-center justify-center text-cyan font-mono text-sm font-bold">
              ▲
            </div>
            <div>
              <h1 className="text-sm font-semibold text-ink tracking-tight">
                items-api <span className="text-ink-faint font-normal">console</span>
              </h1>
              <p className="text-[11px] font-mono text-ink-faint">localhost:3000</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan inline-block" />
            express
          </div>
        </div>
      </header>

      <nav className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 flex gap-1">
          {(
            [
              ['items', 'ჩანაწერები'],
              ['secret', 'დაცული'],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                tab === key ? 'text-ink' : 'text-ink-faint hover:text-ink-dim'
              }`}
            >
              {label}
              {tab === key && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-cyan" />
              )}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {tab === 'items' ? <ItemsPanel /> : <SecretPanel />}
      </main>
    </div>
  );
}
