// DEPRECATED FILE
// This file was the entry point for Vite/Create-React-App.
// Next.js handles routing and entry via the 'app/' directory.
// You can safely delete this file.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}