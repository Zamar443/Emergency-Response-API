const jwt2 = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token" });

  const decoded = jwt2.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
