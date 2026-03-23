require("dotenv").config();
// Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Emergency Response API",
      version: "1.0.0",
      description: "Real-time emergency response coordination system API",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const emergencyRoutes = require("./routes/emergencyRoutes");
const authRoutes = require("./routes/authRoutes");
const socketHandler = require("./sockets");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

global.io = io;

app.use(cors());
app.use(express.json());
// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(express.static("public"));


const path = require("path");

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/auth", authRoutes);
app.use("/api/emergency", emergencyRoutes);

socketHandler(io);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  })
  .catch(err => console.error(err));