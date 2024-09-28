import Message from "./message.model.js";
import { io } from "./socketIO.js";
const sendMessage = async (req, res) => {
  try {
    const { userName, message } = req.body;
    if (!userName || !message)
      return new Error("userName and message are required");
    const newMessage = Message.create({ userName, message });
    if (!newMessage) throw new Error("Failed to create new message");

    io.emit("message", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).send(error);
  }
};
export default sendMessage;
