import { Router } from "express";
import { sendMessage } from "./message.controller";
const router = Router();

router.route("/message").post(sendMessage);

export default router;
