// const socketIO = require("socket.io");
import { Server } from "socket.io";
const socketConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  console.log(io);
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
    // socket.on("send_message", (data) => {});
    // socket.on("disconnect", () => {
    //   console.log(`User disconnected: ${socket.id}`);
    // });

    // Add more event listeners here
  });
};
export default socketConnection;
