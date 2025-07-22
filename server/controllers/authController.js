const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("➡️ Register request received:", req.body);

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    console.log("✅ User created:", user);
    res.json({ token,
      user: {
        name: user.name,
        email: user.email,
      },
     });
  } catch (err) {
    console.error("❌ Error during registration:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};


// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token,
      user: {
        name: user.name || "User",
        email: user.email,
      },
     });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
