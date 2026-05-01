const db = require('../config/db');

const roleService = {
  createRole: async (data) => {
    const { name, code, description = '', logo = '', status = 'active' } = data;
    const result = await db.query(
      'INSERT INTO roles (name, code, description, logo, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, code, description, logo, status]
    );
    return result.rows[0];
  }
};

module.exports = roleService;
