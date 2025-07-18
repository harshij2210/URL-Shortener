const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Url = require('./models/Url'); // for redirection
const Click = require('./models/Click');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();



app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));

// Middlewares

app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/url', require('./routes/urlRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));


// Test route
app.get('/', (req, res) => {
  res.send('🚀 URL Shortener API is running');
});

// Public Redirection Route
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (!url) return res.status(404).json({ msg: "URL not found" });

    // Optional: track click count
    url.clickCount += 1;
    await url.save();

    await Click.create({
      urlId: url._id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });
    // Redirect to the original URL
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Redirection error:", err.message);
    res.status(500).json({ msg: "Server error during redirection" });
  }
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
