const db = require('../config/db');

const authService = {
  findUserByEmail: async (email) => {
    try {
      const result = await db.query(
        `SELECT id, email, password_hash, full_name 
         FROM users 
         WHERE email = $1 AND status = $2`,
        [email, 'active']
      );

      // ✅ Always safe return
      return result.rows.length ? result.rows[0] : null;

    } catch (err) {
      console.error("DB ERROR (findUserByEmail):", err);
      throw err; // let controller handle
    }
  },

  getUserInstitutesAndRoles: async (userId) => {
    try {
      const query = `
        SELECT 
          uir.tenant_id,
          i.id AS institute_id,
          i.name AS institute_name,
          i.location,
          i.logo AS institute_logo,
          r.id AS role_id,
          r.name AS role_name,
          r.logo AS role_logo
        FROM user_institute_roles uir
        JOIN institutes i ON i.id = uir.institute_id
        JOIN roles r ON r.id = uir.role_id
        WHERE uir.user_id = $1 AND uir.status = 'active'
        ORDER BY i.name, r.name
      `;

      const result = await db.query(query, [userId]);

      const groupedMap = {};

      result.rows.forEach(row => {
        if (!groupedMap[row.institute_id]) {
          groupedMap[row.institute_id] = {
            tenant_id: row.tenant_id,
            institute_id: row.institute_id,
            institute_name: row.institute_name,
            location: row.location || '',
            logo: row.institute_logo || '',
            roles: []
          };
        }

        groupedMap[row.institute_id].roles.push({
          role_id: row.role_id,
          role_name: row.role_name,
          logo: row.role_logo || ''
        });
      });

      return Object.values(groupedMap);

    } catch (err) {
      console.error("DB ERROR (getUserInstitutesAndRoles):", err);
      throw err;
    }
  },

  validateUserContext: async (userId, tenantId, instituteId, roleId) => {
    try {
      const query = `
        SELECT id 
        FROM user_institute_roles 
        WHERE user_id = $1 
        AND tenant_id = $2 
        AND institute_id = $3 
        AND role_id = $4 
        AND status = $5
      `;

      const result = await db.query(query, [
        userId,
        tenantId,
        instituteId,
        roleId,
        'active'
      ]);

      return result.rowCount > 0;

    } catch (err) {
      console.error("DB ERROR (validateUserContext):", err);
      throw err;
    }
  }
};

module.exports = authService;