module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("joinResponderRoom", (responderId) => {
      socket.join(responderId);
    });

    // simulate movement
    setInterval(() => {
      io.emit("responderMove", {
        lat: 6.5244 + Math.random() * 0.01,
        lng: 3.3792 + Math.random() * 0.01
      });
    }, 2000);
  });
};
