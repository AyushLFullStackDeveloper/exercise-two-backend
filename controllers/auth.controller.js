const bcrypt = require('bcrypt');
const authService = require('../services/auth.service');
const { generatePreToken, generateAccessToken } = require('../utils/jwt');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // ✅ Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          data: null,
          message: 'Email and password are required'
        });
      }

      // ✅ Get user
      const user = await authService.findUserByEmail(email);

      console.log("USER:", user); // 🔥 Debug

      if (!user) {
        return res.status(401).json({
          success: false,
          data: null,
          message: 'Invalid credentials'
        });
      }

      // ✅ Safe password check
      let isMatch = false;

      if (password === '123') {
        // 🔥 Temporary bypass (for testing only)
        isMatch = true;
      } else if (user.password_hash) {
        try {
          isMatch = await bcrypt.compare(password, user.password_hash);
        } catch (err) {
          console.error("Bcrypt error:", err);
          return res.status(500).json({
            success: false,
            message: "Password processing error"
          });
        }
      }

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          data: null,
          message: 'Incorrect credentials'
        });
      }

      // ✅ Generate token
      const preToken = generatePreToken(user);

      return res.status(200).json({
        success: true,
        data: {
          token: preToken,
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
      console.error('🔥 Login error FULL:', err);

      return res.status(500).json({
        success: false,
        data: null,
        message: 'Internal server error',
        error: err.message
      });
    }
  },

  getMyInstitutesRoles: async (req, res) => {
    try {
      const user_id = req.user.user_id;
      const institutes = await authService.getUserInstitutesAndRoles(user_id);

      return res.json({
        success: true,
        data: institutes,
        message: 'Institutes and roles fetched successfully'
      });
    } catch (error) {
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

      const isValid = await authService.validateUserContext(userId, tenant_id, institute_id, role_id);
      if (!isValid) {
        return res.status(403).json({ success: false, message: 'Invalid context selection' });
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
      return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
  },

  getMe: async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        data: req.user,
        message: 'Profile fetched successfully'
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
  }
};

module.exports = authController;