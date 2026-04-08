const db = require('../config/db');

const mappingService = {
  createMapping: async (data) => {
    const { tenant_id, user_id, institute_id, role_id, is_primary = false, status = 'active' } = data;
    const result = await db.query(
      'INSERT INTO user_institute_roles (tenant_id, user_id, institute_id, role_id, is_primary, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [tenant_id, user_id, institute_id, role_id, is_primary, status]
    );
    return result.rows[0];
  }
};

module.exports = mappingService;
