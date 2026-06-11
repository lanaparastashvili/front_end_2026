import React from 'react';
import { H1Component } from './H1Component.jsx';
import { InputComponent } from './InputComponent.jsx';
import { ParagraphComponent } from './ParagraphComponent.jsx';

const numberValue = 42;
const arrayValue = [1, 2, 3, 4, 5];
const stringValue = "გამარჯობა, ეს არის სტრინგი";

const greet = (name) => `გამარჯობა, ${name}!`;

const objectValue = {
  name: "React",
  version: "18",
  description: "A JavaScript library for building user interfaces"
};

export const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <p><strong>კომპონენტები:</strong> UI-ის პატარა ნაწილებია React-ში.</p>

      <H1Component />
      <InputComponent />
      <ParagraphComponent />

      <h2>მონაცემები</h2>
      <p><strong>Number:</strong> {numberValue}</p>
      <p><strong>Array:</strong> {arrayValue.join(', ')}</p>
      <p><strong>String:</strong> {stringValue}</p>
      <p><strong>Function Output:</strong> {greet('მეგობარო')}</p>
      <p><strong>Object:</strong> {objectValue.name}, {objectValue.version}</p>
    </div>
  );
};

export default App;
