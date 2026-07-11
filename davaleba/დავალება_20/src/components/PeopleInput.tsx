import React from 'react';

interface PeopleInputProps {
  people: string;
  setPeople: (val: string) => void;
}

export function PeopleInput({ people, setPeople }: PeopleInputProps) {
  return (
    <>
      <label className="splitter-label">Number of People</label>
      <div className="splitter-input-container" style={{ marginBottom: 0 }}>
        <span className="splitter-input-icon">&#128100;</span>
        <input
          type="number"
          min={1}
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="splitter-input"
        />
      </div>
    </>
  );
}
