/**
 * @file institute.controller.js
 * @description Handles institute creation and management endpoints.
 */
const instituteService = require('../services/institute.service');

/**
 * Controller object for institute-related routes.
 */
const instituteController = {
  /**
   * Creates a new institute under a specific tenant.
   * 
   * @param {Object} req - Express request object containing institute details
   * @param {Object} res - Express response object
   * @returns {Object} JSON response with the created institute data
   */
  create: async (req, res) => {
    try {
      const data = await instituteService.createInstitute(req.body);
      return res.status(201).json({
        success: true,
        data,
        message: 'Institute created successfully'
      });
    } catch (err) {
      console.error('Create institute error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = instituteController;
