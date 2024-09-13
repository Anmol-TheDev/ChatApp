const socketIO = require("socket.io");

const socketConnection = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`New user connected: ${socket.id}`);

    // Monitor custom events
    socket.on("message", (data) => {
      console.log("Message received:", data);
      // Broadcast message to everyone else except the sender
      socket.broadcast.emit("message", data);
    });

    socket.on("signup", ({ email }) => {
      console.log(`User Email :${email} and socket id :${socket.id}`);
    });

    socket.on("login", ({ email }) => {
      console.log(`User Email :${email} and socket id :${socket.id}`);
    });
    socket.on("send_message", (data) => {});
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    // Add more event listeners here
  });
};

module.exports = socketConnection;
