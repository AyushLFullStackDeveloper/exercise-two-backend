/**
 * @file user.controller.js
 * @description Handles user creation and management endpoints.
 */
const userService = require('../services/user.service');

/**
 * Controller object for user-related routes.
 */
const userController = {
  /**
   * Creates a new user record.
   * 
   * @param {Object} req - Express request object containing user details (email, password, etc.)
   * @param {Object} res - Express response object
   * @returns {Object} JSON response with the created user data
   */
  create: async (req, res) => {
    try {
      const data = await userService.createUser(req.body);
      return res.status(201).json({
        success: true,
        data,
        message: 'User created successfully'
      });
    } catch (err) {
      console.error('Create user error:', err);
      
      // Handle Postgres Duplicate Key Error (Unique Constraint)
      if (err.code === '23505') {
        const detail = err.detail || 'User already exists with this email';
        return res.status(400).json({ 
          success: false, 
          message: 'Conflict: ' + detail.replace('Key ', '').replace('=', ' ') 
        });
      }

      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = userController;
