import { Router } from "express";
import { userSignup, userLogin } from "./user.controller";
const router = Router();

router.route("/signup").get(userSignup);
router.route("/login").get(userLogin);

export default router;
