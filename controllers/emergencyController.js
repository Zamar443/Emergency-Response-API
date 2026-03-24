const User = require("../models/User");
const Emergency = require("../models/Emergency");

// Report a new emergency
exports.reportEmergency = async (req, res) => {
  try {
    const { type, latitude, longitude } = req.body;
    if (!type || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const emergency = new Emergency({
      type,
      location: { type: "Point", coordinates: [longitude, latitude] },
      reportedBy: req.user.id,
      status: "pending",
    });

    await emergency.save();

    // Optional: assign responders logic here
    // Example: Emit emergency to responders via socket.io
    if (global.io) {
      global.io.emit("newEmergency", emergency);
    }

    res.status(201).json({ message: "Emergency reported", emergency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get emergency statistics
exports.getStats = async (req, res) => {
  try {
    const total = await Emergency.countDocuments();
    const pending = await Emergency.countDocuments({ status: "pending" });
    const resolved = await Emergency.countDocuments({ status: "resolved" });

    res.status(200).json({ total, pending, resolved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get list of all responders
exports.getResponders = async (req, res) => {
  try {
    const responders = await User.find({ role: "responder" }).select(
      "name phone role"
    );

    res.status(200).json(responders);
  } catch (error) {
    console.error("GET RESPONDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};