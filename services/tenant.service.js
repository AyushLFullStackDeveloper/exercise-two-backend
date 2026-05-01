const db = require('../config/db');

const tenantService = {
  createTenant: async (data) => {
    const { name, code, logo = '', status = 'active' } = data;
    const result = await db.query(
      'INSERT INTO tenants (name, code, logo, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, code, logo, status]
    );
    return result.rows[0];
  }
};

module.exports = tenantService;
