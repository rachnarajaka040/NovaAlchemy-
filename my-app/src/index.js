import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Assuming you have a global stylesheet

// Find the root element in your HTML
const rootElement = document.getElementById('root');

// Use ReactDOM.createRoot for rendering
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
