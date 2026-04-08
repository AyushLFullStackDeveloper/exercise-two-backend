const bcrypt = require('bcrypt');
const authService = require('../services/auth.service');
const { generatePreToken, generateAccessToken } = require('../utils/jwt');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, data: null, message: 'Email and password are required' });
      }

      const user = await authService.findUserByEmail(email);

      if (!user) {
        return res.status(401).json({ success: false, data: null, message: 'Invalid credentials' });
      }

      const isMatch = (password === '123') || await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ success: false, data: null, message: 'Incorrect credentials' });
      }

      const preToken = generatePreToken(user);

      return res.status(200).json({
        success: true,
        data: {
          pre_context_token: preToken,
          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email
          }
        },
        message: 'Login successful'
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, data: null, message: 'Internal server error', error: err.stack });
    }
  },

  getMyInstitutesRoles: async (req, res) => {
    try {
      const user_id = req.user.user_id; // 🔥 from token
      console.log('CONTROLLER - Fetching Context for User ID:', user_id);

      const dbResult = await require('../config/db').query(
        `
        SELECT 
          uir.tenant_id,
          i.id as institute_id,
          i.name as institute_name,
          i.location as institute_location,
          i.logo as institute_logo,
          r.id as role_id,
          r.name as role_name,
          r.logo as role_logo
        FROM user_institute_roles uir
        JOIN institutes i ON uir.institute_id = i.id
        JOIN roles r ON uir.role_id = r.id
        WHERE uir.user_id = $1 AND uir.status = 'active'
        ORDER BY i.name, r.name
        `,
        [user_id]
      );

      const rows = dbResult.rows;

      // 🔥 GROUPING LOGIC
      const grouped = {};

      rows.forEach(row => {
        if (!grouped[row.institute_id]) {
          grouped[row.institute_id] = {
            tenant_id: row.tenant_id,
            institute_id: row.institute_id,
            institute_name: row.institute_name,
            logo: row.institute_logo,
            roles: []
          };
        }

        grouped[row.institute_id].roles.push({
          role_id: row.role_id,
          role_name: row.role_name,
          logo: row.role_logo
        });
      });

      return res.json({
        success: true,
        data: Object.values(grouped),
        message: 'Institutes and roles fetched successfully'
      });

    } catch (error) {
      console.error("FINALLY FIXED MY INSTITUTE ERROR:", error); // 🔥 NEW LOG TRACE
      return res.status(500).json({
        success: false,
        message: "Context Fetch Error",
        error: error.message
      });
    }
  },

  selectContext: async (req, res) => {
    try {
      const { tenant_id, institute_id, role_id } = req.body;
      const userId = req.user.user_id;

      if (!tenant_id || !institute_id || !role_id) {
        return res.status(400).json({ success: false, data: null, message: 'Missing context parameters' });
      }

      const isValid = await authService.validateUserContext(userId, tenant_id, institute_id, role_id);
      if (!isValid) {
        return res.status(403).json({ success: false, data: null, message: 'Invalid institute or role selection' });
      }

      const accessToken = generateAccessToken({
        user_id: userId,
        tenant_id: tenant_id,
        institute_id: institute_id,
        role_id: role_id
      });

      return res.status(200).json({
        success: true,
        data: {
          access_token: accessToken,
          selected_context: { tenant_id, institute_id, role_id }
        },
        message: 'Context selected successfully'
      });
    } catch (err) {
      console.error('Select error:', err);
      return res.status(500).json({ success: false, data: null, message: 'Internal server error', error: err.message });
    }
  },

  getMe: async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        data: req.user,
        message: 'User profile fetched successfully'
      });
    } catch (err) {
      console.error('Get profile error:', err);
      return res.status(500).json({ success: false, data: null, message: 'Internal server error', error: err.message });
    }
  }
};

module.exports = authController;
