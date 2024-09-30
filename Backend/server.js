import express from "express";
import { createServer } from "http";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
app.use(cookieParser());
dotenv.config({
  path: "./.env",
});
const server = createServer(app);
import cors from "cors";
import connectDB from "./db/index.js";
// import socketConnection from "./socketIO.js";
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
import userRouter from "./routes/user.route.js";

app.use("/api/v1", userRouter);

app.get("/api/v1", (req, res) => {
  // socketConnection(server);

  res.send("Socket.io server running");
});
connectDB()
  .then(() => {
    server.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
