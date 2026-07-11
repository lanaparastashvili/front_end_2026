import React from 'react';

interface SummaryPanelProps {
  tipAmountPerPerson: number;
  totalPerPerson: number;
  handleReset: () => void;
}

function toMoney(value: number): string {
  if (!Number.isFinite(value)) return "0.00";
  return value.toFixed(2);
}

export function SummaryPanel({ tipAmountPerPerson, totalPerPerson, handleReset }: SummaryPanelProps) {
  return (
    <div className="splitter-right-panel">
      <div>
        <div className="summary-row">
          <div>
            <div className="summary-label-main">Tip Amount</div>
            <div className="summary-label-sub">/ person</div>
          </div>
          <div className="summary-value">${toMoney(tipAmountPerPerson)}</div>
        </div>

        <div className="summary-row">
          <div>
            <div className="summary-label-main">Total</div>
            <div className="summary-label-sub">/ person</div>
          </div>
          <div className="summary-value">${toMoney(totalPerPerson)}</div>
        </div>
      </div>

      <button className="reset-btn" onClick={handleReset}>
        RESET
      </button>
    </div>
  );
}
