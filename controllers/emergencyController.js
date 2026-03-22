const Emergency = require("../models/Emergency");

const getPriority = (type) => {
  if (type === "heart attack") return "critical";
  if (type === "accident") return "medium";
  return "low";
};

exports.reportEmergency = async (req, res) => {
  const { type, latitude, longitude } = req.body;

  const emergency = await Emergency.create({
    user: req.user.id,
    type,
    priority: getPriority(type),
    location: {
      type: "Point",
      coordinates: [longitude, latitude]
    }
  });

  await assignResponder(emergency);
  res.json(emergency);
};

exports.getStats = async (req, res) => {
  const total = await Emergency.countDocuments();
  const resolved = await Emergency.countDocuments({ status: "resolved" });
  const pending = await Emergency.countDocuments({ status: "pending" });

  res.json({ total, resolved, pending });
};

// =========================
// src/services/dispatchService.js
// =========================
const User2 = require("../models/User");

exports.assignResponder = async (emergency) => {
  const responders = await User2.find({
    role: "responder",
    location: {
      $near: {
        $geometry: emergency.location,
        $maxDistance: 5000
      }
    }
  });

  if (!responders.length) return;

  const nearest = responders[0];

  emergency.responder = nearest._id;
  emergency.status = "assigned";
  await emergency.save();

  global.io.to(nearest._id.toString()).emit("newEmergency", emergency);
};