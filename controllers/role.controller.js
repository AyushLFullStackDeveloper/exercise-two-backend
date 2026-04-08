const roleService = require('../services/role.service');

const roleController = {
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
