import axios from 'axios'; // Import axios for making HTTP requests
import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from React Router

const Home = () => {
  const [user, setUser] = useState(null); // State to store user information
  const navigate = useNavigate(); // Hook to programmatically navigate

  // useEffect to fetch user information when the component mounts
  useEffect(() => {
    getUserInfo();
  }, []);

  // Function to fetch user information from the server
  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5173/getUser", { withCredentials: true }); // Send GET request to get user info
      
      if (response.data.success === true) {
        setUser(response.data.user); // Set user state if successful
      } else {
        setUser(null); // Reset user state if not successful
      }
    } catch (err) {
      console.log(err); // Log any errors
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5173/logout", {}, { withCredentials: true }); // Send POST request to logout

      if (response.data.success) {
        setUser(null); // Reset user state on successful logout
      }
    } catch (err) {
      console.log(err); // Log any errors
    }
  };

  return (
    <div>
      {user ? ( // Check if user is logged in
        <>
          <div style={styles.container}>
            <h1>Welcome, {user.username}</h1> // Display welcome message with username
            <p>Email: {user.email}</p> // Display user's email
          </div>
          <div style={styles.buttonContainer}>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button> // Logout button
          </div>
        </>
      ) : (
        <>
          <Link to={"/login"}>
            <div style={styles.buttonContainer}>
              <button style={styles.button}>
                Login
              </button> // Link to login page
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', // Centers the button horizontally
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#f44336', // Red background for the button
    color: '#fff', // White text color
    border: 'none',
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer',
  },
};

export default Home; // Export the Home component
