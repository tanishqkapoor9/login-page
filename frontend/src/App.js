import React from 'react'; // Import React library
import './App.css'; // Import CSS styles for the application
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes components from react-router-dom
import Home from './pages/Home'; // Import the Home component
import Login from './pages/Login'; // Import the Login component
import Register from './pages/Register'; // Import the Register component

const App = () => {
  return (
    <Routes>
      {/* Define the route for the home page */}
      <Route path="/" element={<Home />}></Route>
      {/* Define the route for the login page */}
      <Route path="/login" element={<Login />}></Route>
      {/* Define the route for the registration page */}
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default App; // Export the App component for use in other parts of the application
