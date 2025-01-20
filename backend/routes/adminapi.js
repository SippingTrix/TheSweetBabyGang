const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const User = mongoose.model("User", userSchema);

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Include the isAdmin field in the JWT payload
  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    JWT_SECRET
  );
  res.json({ token });
});

app.post("/api/register", async (req, res) => {
  const { username, password, isAdmin } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: isAdmin || false // Set isAdmin if provided, otherwise default to false
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: error.message });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user; // Add user info (including isAdmin) to request
    console.log("Decoded user:", req.user); // Log the entire user object to check `isAdmin`
    next();
  });
};

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  datePosted: { type: Date, default: Date.now }
});
