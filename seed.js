require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany({ role: "responder" });

  const responders = [
    { name: "Responder 1", phone: "0801", role: "responder", location: { type: "Point", coordinates: [3.37, 6.52] } },
    { name: "Responder 2", phone: "0802", role: "responder", location: { type: "Point", coordinates: [3.38, 6.53] } }
  ];

  await User.insertMany(responders);
  console.log("Seeded responders");
  process.exit();
});