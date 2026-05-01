const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// 1. Login - returns pre-context token
router.post('/login', authController.login);

// 2. Fetch User Context - returns grouped institutes & roles
router.get('/my-institutes-roles', authMiddleware, authController.getMyInstitutesRoles);
router.get('/my-institutes', authMiddleware, authController.getMyInstitutesRoles);

// 3. Select Institute Context - returns scoped access token
router.post('/select-context', authMiddleware, authController.selectContext);

// 4. Current user profile - access token context
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
