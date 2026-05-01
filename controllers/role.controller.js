/**
 * @file role.controller.js
 * @description Handles role creation and management endpoints.
 */
const roleService = require('../services/role.service');

/**
 * Controller object for role-related routes.
 */
const roleController = {
  /**
   * Creates a new role definition.
   * 
   * @param {Object} req - Express request object containing role details
   * @param {Object} res - Express response object
   * @returns {Object} JSON response with the created role data
   */
  create: async (req, res) => {
    try {
      const data = await roleService.createRole(req.body);
      return res.status(201).json({
        success: true,
        data,
        message: 'Role created successfully'
      });
    } catch (err) {
      console.error('Create role error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = roleController;
