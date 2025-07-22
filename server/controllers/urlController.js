const Url = require('../models/Url');
const { nanoid } = require('nanoid'); 
const BASE_DOMAIN = process.env.BASE_DOMAIN || 'http://localhost:5000';

exports.shortenUrl = async (req, res) => {
 
  const originalUrl = req.body.originalUrl || req.body.longUrl;
  const userId = req.user; 

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


exports.deleteUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ _id: req.params.id, userId: req.user });

    if (!url) return res.status(404).json({ msg: "URL not found" });

    await url.deleteOne();
    res.json({ msg: "URL deleted successfully" });
  } catch (err) {
    console.error("deleteUrl error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
