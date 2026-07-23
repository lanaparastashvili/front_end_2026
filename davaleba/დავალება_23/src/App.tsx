import { useState, useCallback } from 'react';

interface Options {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

type StrengthLabel = 'TOO WEAK!' | 'WEAK' | 'MEDIUM' | 'STRONG';

const CHARSET = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers:   '0123456789',
  symbols:   '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

const DEFAULT_OPTS: Options = {
  length: 10,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
};

function generatePassword(opts: Options): string {
  let pool = '';
  (Object.keys(CHARSET) as Array<keyof typeof CHARSET>).forEach((k) => {
    if (opts[k]) pool += CHARSET[k];
  });
  if (!pool) return '';
  const arr = new Uint32Array(opts.length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => pool[n % pool.length]).join('');
}

function getStrength(opts: Options): { label: StrengthLabel; bars: number } {
  const charTypes = (['uppercase', 'lowercase', 'numbers', 'symbols'] as const)
    .filter((k) => opts[k]).length;
  if (charTypes === 0) return { label: 'TOO WEAK!', bars: 0 };
  if (opts.length < 8  || charTypes === 1) return { label: 'TOO WEAK!', bars: 1 };
  if (opts.length < 12 || charTypes === 2) return { label: 'WEAK',      bars: 2 };
  if (opts.length < 16 || charTypes === 3) return { label: 'MEDIUM',    bars: 3 };
  return { label: 'STRONG', bars: 4 };
}

const BAR_COLOR: Record<number, string> = {
  1: '#f64a4a',
  2: '#fb7c58',
  3: '#f8cd65',
  4: '#a4ffaf',
};

function StrengthBars({ bars }: { bars: number }) {
  const fill = BAR_COLOR[bars] ?? 'transparent';
  return (
    <div className="flex items-center gap-[6px]">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: '10px',
            height: '28px',
            backgroundColor: i < bars ? fill : 'transparent',
            border: `2px solid ${i < bars ? fill : '#817d92'}`,
            transition: 'background-color 0.25s, border-color 0.25s',
          }}
        />
      ))}
    </div>
  );
}

function RangeSlider({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      id="length-slider"
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        background: `linear-gradient(to right, #a4ffaf ${pct}%, #18181b ${pct}%)`,
      }}
    />
  );
}

function CheckboxRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-5 cursor-pointer select-none"
      style={{ color: '#e6e5ea' }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-[15px] tracking-[0.05em]">{label}</span>
    </label>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <rect x="8" y="8" width="13" height="13" />
      <path d="M4 16V4h12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function App() {
  const [opts, setOpts] = useState<Options>(DEFAULT_OPTS);
  const [password, setPassword] = useState<string>(() =>
    generatePassword(DEFAULT_OPTS),
  );
  const [copied, setCopied] = useState(false);
  const [flash, setFlash] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);

  const { label: strengthLabel, bars } = getStrength(opts);

  const handleGenerate = useCallback(() => {
    const pw = generatePassword(opts);
    setFlash(true);
    setPassword(pw);
    setTimeout(() => setFlash(false), 80);
  }, [opts]);

  const handleCopy = useCallback(() => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [password]);

  const setOpt = <K extends keyof Options>(key: K, value: Options[K]) =>
    setOpts((prev) => ({ ...prev, [key]: value }));

  return (
    <div
      style={{ background: '#18181b', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center px-4"
    >
      <h1
        style={{ color: '#817d92', letterSpacing: '0.25em', fontSize: '16px' }}
        className="mb-6 uppercase"
      >
        Password Generator
      </h1>

      <div style={{ width: '100%', maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div
          style={{
            background: '#24242c',
            padding: '18px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              color: password ? '#e6e5ea' : '#817d92',
              fontSize: '26px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              opacity: flash ? 0.3 : 1,
              transition: 'opacity 0.08s',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 48px)',
            }}
          >
            {password || 'P4$5W0rD!'}
          </span>

          <button
            id="copy-btn"
            onClick={handleCopy}
            title="Copy to clipboard"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#a4ffaf',
              flexShrink: 0,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'opacity 0.2s',
            }}
          >
            {copied && (
              <span style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#a4ffaf' }}>
                COPIED!
              </span>
            )}
            <CopyIcon />
          </button>
        </div>

        <div
          style={{
            background: '#24242c',
            padding: '24px 48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label
                htmlFor="length-slider"
                style={{ color: '#e6e5ea', fontSize: '15px', letterSpacing: '0.03em' }}
              >
                Character Length
              </label>
              <span style={{ color: '#a4ffaf', fontSize: '30px', fontWeight: 700, lineHeight: 1 }}>
                {opts.length}
              </span>
            </div>
            <RangeSlider
              value={opts.length}
              min={4}
              max={20}
              onChange={(v) => setOpt('length', v)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <CheckboxRow
              id="uppercase"
              label="Include Uppercase Letters"
              checked={opts.uppercase}
              onChange={(v) => setOpt('uppercase', v)}
            />
            <CheckboxRow
              id="lowercase"
              label="Include Lowercase Letters"
              checked={opts.lowercase}
              onChange={(v) => setOpt('lowercase', v)}
            />
            <CheckboxRow
              id="numbers"
              label="Include Numbers"
              checked={opts.numbers}
              onChange={(v) => setOpt('numbers', v)}
            />
            <CheckboxRow
              id="symbols"
              label="Include Symbols"
              checked={opts.symbols}
              onChange={(v) => setOpt('symbols', v)}
            />
          </div>

          <div
            style={{
              background: '#18181b',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                color: '#817d92',
                fontSize: '13px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              Strength
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  color: '#e6e5ea',
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {strengthLabel}
              </span>
              <StrengthBars bars={bars} />
            </div>
          </div>

          <button
            id="generate-btn"
            onClick={handleGenerate}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            style={{
              width: '100%',
              padding: '18px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              background: hoverBtn ? 'transparent' : '#a4ffaf',
              color: hoverBtn ? '#a4ffaf' : '#18181b',
              border: '2px solid #a4ffaf',
              cursor: 'pointer',
              fontSize: '15px',
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Generate
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
