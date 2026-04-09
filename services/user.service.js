const db = require('../config/db');
const bcrypt = require('bcrypt');

const userService = {
  createUser: async (data) => {
    let { first_name, last_name, full_name, name, email, mobile = '', password, status = 'active' } = data;
    
    // If name is provided but first_name/last_name are not, split it
    if (name && !first_name) {
      const parts = name.trim().split(/\s+/);
      first_name = parts[0];
      last_name = parts.slice(1).join(' ') || '';
    }

    if (!first_name) first_name = email.split('@')[0];
    if (!last_name) last_name = '';

    const passwordHash = await bcrypt.hash(password, 10);
    
    const result = await db.query(
      'INSERT INTO users (first_name, last_name, full_name, email, mobile, password_hash, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, first_name, last_name, full_name, email, mobile, status',
      [first_name, last_name, full_name || `${first_name} ${last_name}`, email, mobile, passwordHash, status]
    );
    return result.rows[0];
  }
};

module.exports = userService;
