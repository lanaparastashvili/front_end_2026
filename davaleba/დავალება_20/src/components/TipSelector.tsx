import React from 'react';

const TIP_OPTIONS = [5, 10, 15, 25, 50];

interface TipSelectorProps {
  selectedTip: number | "custom" | null;
  customTip: string;
  handleSelectTip: (opt: number) => void;
  setCustomTip: (val: string) => void;
  handleCustomFocus: () => void;
}

export function TipSelector({
  selectedTip,
  customTip,
  handleSelectTip,
  setCustomTip,
  handleCustomFocus,
}: TipSelectorProps) {
  return (
    <>
      <label className="splitter-label" style={{ marginBottom: 10 }}>
        Select Tip %
      </label>
      <div className="splitter-tip-grid">
        {TIP_OPTIONS.map((opt) => {
          const active = selectedTip === opt;
          return (
            <button
              key={opt}
              onClick={() => handleSelectTip(opt)}
              className={`splitter-tip-btn ${active ? 'active' : ''}`}
            >
              {opt}%
            </button>
          );
        })}
        <input
          type="number"
          placeholder="Custom"
          value={customTip}
          onFocus={handleCustomFocus}
          onChange={(e) => {
            setCustomTip(e.target.value);
          }}
          className={`splitter-tip-custom ${selectedTip === 'custom' ? 'active' : ''}`}
        />
      </div>
    </>
  );
}
