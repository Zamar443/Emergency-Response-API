const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  role: { type: String, enum: ["User", "responder"], default: "User" },
  location: {
  type: {
    type: String,
    enum: ["Point"],
    required: false
  },
  coordinates: {
    type: [Number],
    required: false
  }
}
});

userSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("User", userSchema);
