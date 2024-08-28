import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State variables to store email, password, and any error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // useEffect hook runs once when the component mounts
  useEffect(() => {
    getUserInfo(); // Check if the user is already logged in
  }, []);

  // Function to fetch user info and check if the user is already authenticated
  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5173/getUser", { withCredentials: true });

      if (response.data.success === true) {
        navigate("/"); // If authenticated, redirect to the home page
      }
    } catch (err) {
      console.log(err); // Log any errors to the console
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation to check if both email and password are provided
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    setError(''); // Clear any existing error messages

    try {
      // Send a POST request to the login endpoint with the user's credentials
      const response = await axios.post("http://localhost:5173/login", { email, password }, { withCredentials: true });
      setEmail(""); // Clear the email field
      setPassword(""); // Clear the password field
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      console.log(error); // Log any errors to the console
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {/* Display error message if there is one */}
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '300px', 
    margin: 'auto', 
    padding: '20px', 
    border: '1px solid #ccc',
    borderRadius: '5px', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
  },
  inputContainer: {
    marginBottom: '15px', 
  },
  label: {
    display: 'block', 
    marginBottom: '5px', 
  },
  input: {
    width: '100%', 
    padding: '8px', 
    boxSizing: 'border-box', 
  },
  button: {
    width: '100%', 
    padding: '10px', 
    backgroundColor: '#007BFF', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
  },
  error: {
    color: 'red', 
    marginBottom: '15px', 
  },
};

export default Login;
