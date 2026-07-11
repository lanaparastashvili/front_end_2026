import React from 'react';

interface BillInputProps {
  bill: string;
  setBill: (val: string) => void;
}

export function BillInput({ bill, setBill }: BillInputProps) {
  return (
    <>
      <label className="splitter-label">Bill</label>
      <div className="splitter-input-container">
        <span className="splitter-input-icon">$</span>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          className="splitter-input"
          placeholder="0"
        />
      </div>
    </>
  );
}
