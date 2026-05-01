/**
 * @file mapping.controller.js
 * @description Handles the creation of User-Institute-Role relationships (Mappings).
 */
const mappingService = require('../services/mapping.service');

/**
 * Controller object for mapping-related routes.
 */
const mappingController = {
  /**
   * Creates a mapping that assigns a user to a specific role within a specific institute.
   * 
   * @param {Object} req - Express request object containing user_id, institute_id, and role_id
   * @param {Object} res - Express response object
   * @returns {Object} JSON response with the created mapping data
   */
  create: async (req, res) => {
    try {
      const data = await mappingService.createMapping(req.body);
      return res.status(201).json({
        success: true,
        data,
        message: 'Mapping created successfully'
      });
    } catch (err) {
      console.error('Create mapping error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = mappingController;
