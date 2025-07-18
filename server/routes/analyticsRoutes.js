const express = require('express');
const router = express.Router();
const { getUrlAnalytics } = require('../controllers/analyticsController');

router.get('/:shortUrl', getUrlAnalytics); // no auth needed

module.exports = router;
