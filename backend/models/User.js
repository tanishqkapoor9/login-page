const mongoose = require("mongoose");

// Define the User schema with the fields and their requirements
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true }, // The username field is required and should be a string
    email: { type: String, required: true, unique: true }, // The email field is required, must be unique, and should be a string
    password: { type: String, required: true } // The password field is required and should be a string
}, {
    timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
});

// Create a model from the schema
const User = mongoose.model("User", UserSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;
