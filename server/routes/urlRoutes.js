const express = require('express');
const router = express.Router();
const { shortenUrl, getMyUrls,deleteUrl } = require('../controllers/urlController');
const authMiddleware = require('../middleware/auth');

// POST /api/url/shorten
router.post('/shorten', authMiddleware, shortenUrl);

// GET /api/url/my-urls
router.get('/my-urls', authMiddleware, getMyUrls);

// Delete url
router.delete("/:id", authMiddleware, deleteUrl); 

module.exports = router;
