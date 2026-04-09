const db = require('../config/db');

const instituteService = {
  createInstitute: async (data) => {
    const { tenant_id, name, code, type = 'institute', location = '', logo = '', status = 'active' } = data;
    const result = await db.query(
      'INSERT INTO institutes (tenant_id, name, code, type, location, logo, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [tenant_id, name, code, type, location, logo, status]
    );
    return result.rows[0];
  }
};

module.exports = instituteService;
