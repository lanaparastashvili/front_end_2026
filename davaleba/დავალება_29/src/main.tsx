import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BookmarkProvider } from './context/BookmarkContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BookmarkProvider>
      <App />
    </BookmarkProvider>
  </React.StrictMode>,
);
