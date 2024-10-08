import { Router } from "express";
import {
  userLogin,
  userSignup,
  userLogout,
  userReferesh,
} from "../controller/user.controller.js";
const router = Router();

router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);
router.route("/referesh").post(userReferesh);

export default router;
