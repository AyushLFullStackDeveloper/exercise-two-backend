const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/stats', authMiddleware, dashboardController.getStats);

module.exports = router;
