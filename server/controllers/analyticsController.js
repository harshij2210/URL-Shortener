const Url = require('../models/Url');
const Click = require('../models/Click');

exports.getUrlAnalytics = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (!url) return res.status(404).json({ msg: 'URL not found' });

    const clicks = await Click.find({ urlId: url._id }).sort({ timestamp: -1 });

    res.json({
      totalClicks: clicks.length,
      clickHistory: clicks
    });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to get analytics' });
  }
};
