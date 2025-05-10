const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.isAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookies
    const { token } = req.cookies;

    // If no token, return an error
    if (!token) {
      return res.status(401).json({ success: false, message: 'Please login to access this resource' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user by decoded ID (make sure this matches the key used when signing the JWT)
    req.user = await User.findById(decoded.id); // Ensure 'id' matches what's in your JWT payload

    // If user not found
    if (!req.user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Proceed to the next middleware
    next();

  } catch (error) {
    // Handle errors from JWT verification or user fetching
    console.error("Authentication Error:", error);
    return res.status(401).json({ success: false, message: 'Authentication failed. Please login again.' });
  }
};
