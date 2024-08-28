import React, { useState } from 'react';
import axios from "axios";

const Register = () => {
  // State variables to store the username, email, password, and any error messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation to check if all fields are filled
    if (!username || !email || !password) {
      setError('Please fill in all fields'); // Set error message if validation fails
      return;
    }

    setError(''); // Clear any existing error messages

    console.log('Signing up with', { email }); // Log the email for debugging purposes

    try {
      // Send a POST request to the signup endpoint with the user's data
      const response = await axios.post("http://localhost:5173/signup", { username, email, password }, { withCredentials: true });
      setUsername(""); // Clear the username field
      setEmail(""); // Clear the email field
      setPassword(""); // Clear the password field
    } catch (error) {
      console.log(error); // Log any errors to the console
      setError('Registration failed. Please try again.'); // Set an error message if the request fails
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      {/* Display error message if there is one */}
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Input field for username */}
        <div style={styles.inputContainer}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on change
            style={styles.input}
            placeholder="Enter your username"
          />
        </div>
        {/* Input field for email */}
        <div style={styles.inputContainer}>
          <label style={styles.label}>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>
        {/* Input field for password */}
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>
        {/* Submit button for the form */}
        <button type="submit" style={styles.button}>
          Signup
        </button>
      </form>
    </div>
  );
};

// Basic styles for the form
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
  
  export default Register;
