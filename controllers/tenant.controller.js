/**
 * @file tenant.controller.js
 * @description Handles top-level tenant creation and management endpoints.
 */
const tenantService = require('../services/tenant.service');

/**
 * Controller object for tenant-related routes.
 */
const tenantController = {
  /**
   * Creates a new tenant organization.
   * 
   * @param {Object} req - Express request object containing tenant details
   * @param {Object} res - Express response object
   * @returns {Object} JSON response with the created tenant data
   */
  create: async (req, res) => {
    try {
      const data = await tenantService.createTenant(req.body);
      return res.status(201).json({
        success: true,
        data,
        message: 'Tenant created successfully'
      });
    } catch (err) {
      console.error('Create tenant error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = tenantController;
