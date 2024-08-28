const express = require('express'); // Import the express library for building the server
const cors = require('cors'); // Import cors for handling Cross-Origin Resource Sharing
const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction
const dotenv = require("dotenv"); // Import dotenv to manage environment variables
const bcrypt = require("bcrypt"); // Import bcrypt for hashing passwords
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for generating and verifying tokens
const cookieParser = require("cookie-parser"); // Import cookie-parser to parse cookies

// Import the User model
const User = require("./models/User.js");

// Set the number of salt rounds for password hashing
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds); // Generate salt for password hashing

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// CORS configuration to allow requests from specific origin
app.use(cors({
    credentials: true, // Allow credentials such as cookies to be sent
    origin: ["http://localhost:3000"], // Allow requests from this origin
    methods: ["POST", "GET"], // Allow these HTTP methods
}));

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGODB_URI_KEY, {
    dbName: "UTOPIC", // Specify the database name
}).then(() => {
    console.log("Database Connected"); // Log success message upon connection
}).catch((err) => {
    console.log("Db not connected"); // Log error message if connection fails
});

// Login route
app.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body
        
        // Find the user by email
        const user = await User.findOne({ email: email });

        if(user) {
            // Compare the provided password with the stored hashed password
            const matched = await bcrypt.compare(password, user.password);

            if(matched) {
                // Generate a JWT token if the password matches
                var token = jwt.sign({ email: user.email, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
                console.log(token); // Log the token for debugging
                res.cookie("token", token).json({ success: true, token }); // Set the token in a cookie and send response
            } else {
                res.json({ success: false }); // Send failure response if password does not match
            }
        } else {
            console.log("Account does not exist"); // Log if the account does not exist
        }
    } catch(err) {
        console.log(err); // Log any errors during the process
    }
});

// Signup route
app
