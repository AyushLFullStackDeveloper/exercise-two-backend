const instituteService = require('../services/institute.service');

const instituteController = {
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
