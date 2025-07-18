const Url = require('../models/Url');
const { nanoid } = require('nanoid'); // (assuming you downgraded nanoid; if not, use dynamic import)
const BASE_DOMAIN = process.env.BASE_DOMAIN || 'http://localhost:5000';

exports.shortenUrl = async (req, res) => {
  // accept either field name
  const originalUrl = req.body.originalUrl || req.body.longUrl;
  const userId = req.user; // set in auth middleware

  if (!originalUrl) {
    return res.status(400).json({ msg: "originalUrl is required" });
  }

  const shortUrl = nanoid(8);

  try {
    const newUrl = await Url.create({
      userId,
      originalUrl,
      shortUrl,
    });

    // return the saved Mongo doc so frontend can use uniform fields
    return res.json(
     {
      ...newUrl.toObject(),
      fullShortLink: `${BASE_DOMAIN.replace(/\/$/, '')}/${shortUrl}`
    } 
    );
  } catch (err) {
    console.error("shortenUrl error:", err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

exports.getMyUrls = async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user }).sort({ createdAt: -1 });
    const data = urls.map(u => ({
      ...u.toObject(),
      fullShortLink: `${BASE_DOMAIN.replace(/\/$/, '')}/${u.shortUrl}`
    }));
    return res.json(data);
  } catch (err) {
    console.error("getMyUrls error:", err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};
