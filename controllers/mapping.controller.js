const mappingService = require('../services/mapping.service');

const mappingController = {
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
