const tenantService = require('../services/tenant.service');

const tenantController = {
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
