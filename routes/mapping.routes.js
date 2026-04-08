const express = require('express');
const mappingController = require('../controllers/mapping.controller');
const router = express.Router();

router.post('/', mappingController.create);

module.exports = router;
