/**
 * @file auth.middleware.js
 * @description Express middleware to intercept, verify, and decode JWT tokens.
 */
const { verifyToken } = require('../utils/jwt');

/**
 * Validates the Authorization header's Bearer token.
 * If valid, attaches the decoded payload to `req.user` and proceeds to the next handler.
 * If invalid or missing, returns a 401 Unauthorized response.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware callback
 */
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    req.user = decoded; // 🔥 VERY IMPORTANT
    next();
  } catch (err) {
    console.error('MIDDLEWARE ERROR:', err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
};

module.exports = authMiddleware;
