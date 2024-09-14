// const app = require("express")();
// const server = require("http").createServer(app);
import express from "express";
import createServer from "http";
const app = express();
const server = createServer(app);
import cors from "cors";

import socketConnection from "socketIO";
app.use(
  cors({
    origin: "*",
  })
);

socketConnection(server);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });
// app.use("/api/v1", userRouter);
// io.on("connection", (socket) => {
//   console.log(socket.toString());
//   console.log(`a user connected ${socket.id}`);
//   socket.on("chat", (data) => {
//     console.log("data", data);
//     io.emit("chat", data);
//   });
// });
app.get("/", (req, res) => {
  res.send("Socket.io server running");
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
