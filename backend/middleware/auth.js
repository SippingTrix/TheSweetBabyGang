const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader);

  // Check if no token
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  try {
    // Verify token
    const decoded = jwt.verify(token, "secret");
    console.log("Decoded Token:", decoded);
    req.admin = decoded.admin;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
