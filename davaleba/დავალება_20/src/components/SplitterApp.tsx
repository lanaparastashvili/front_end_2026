import React, { useMemo, useState } from "react";
import "./SplitterApp.css";
import { BillInput } from "./BillInput";
import { TipSelector } from "./TipSelector";
import { PeopleInput } from "./PeopleInput";
import { SummaryPanel } from "./SummaryPanel";

export function SplitterApp() {
  const [bill, setBill] = useState("142.55");
  const [selectedTip, setSelectedTip] = useState<number | "custom" | null>(15);
  const [customTip, setCustomTip] = useState("");
  const [people, setPeople] = useState("5");

  const billValue = parseFloat(bill) || 0;
  const peopleValue = Math.max(1, parseInt(people, 10) || 1);

  const tipPercent = useMemo(() => {
    if (selectedTip === "custom") return parseFloat(customTip) || 0;
    if (typeof selectedTip === "number") return selectedTip;
    return 0;
  }, [selectedTip, customTip]);

  const tipAmountPerPerson = (billValue * (tipPercent / 100)) / peopleValue;
  const totalPerPerson = billValue / peopleValue + tipAmountPerPerson;

  const handleReset = () => {
    setBill("0.00");
    setSelectedTip(null);
    setCustomTip("");
    setPeople("1");
  };

  const handleSelectTip = (option: number) => {
    setSelectedTip(option);
    setCustomTip("");
  };

  const handleCustomFocus = () => {
    setSelectedTip("custom");
  };

  return (
    <div className="splitter-container">
      <div className="splitter-logo">
        SPLI<br />TTER
      </div>

      <div className="splitter-card">
        <div className="splitter-left-panel">
          <BillInput bill={bill} setBill={setBill} />
          <TipSelector
            selectedTip={selectedTip}
            customTip={customTip}
            handleSelectTip={handleSelectTip}
            setCustomTip={(val) => {
              setCustomTip(val);
              setSelectedTip("custom");
            }}
            handleCustomFocus={handleCustomFocus}
          />
          <PeopleInput people={people} setPeople={setPeople} />
        </div>

        <SummaryPanel
          tipAmountPerPerson={tipAmountPerPerson}
          totalPerPerson={totalPerPerson}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
}
