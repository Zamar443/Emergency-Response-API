const mongoose2 = require("mongoose");

const emergencySchema = new mongoose2.Schema({
  user: { type: mongoose2.Schema.Types.ObjectId, ref: "User" },
  type: String,
  priority: { type: String, enum: ["low", "medium", "critical"], default: "medium" },
  status: { type: String, enum: ["pending", "assigned", "resolved"], default: "pending" },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number]
  },
  responder: { type: mongoose2.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

emergencySchema.index({ location: "2dsphere" });
module.exports = mongoose2.model("Emergency", emergencySchema);