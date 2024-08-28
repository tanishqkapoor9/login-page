import React from 'react'; // Import React to enable JSX
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering the app
import './index.css'; // Import global styles
import App from './App'; // Import the main App component
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <Router> {/* Wrap the App component with Router for routing functionality */}
      <App />
    </Router>
  </React.StrictMode>
);
