import { Router } from "express";
import {
  userLogin,
  userSignup,
  userLogout,
  userReferesh,
} from "../controller/user.controller.js";
const router = Router();
import { upload } from "../middleware/multer.middlewarw.js";

router.route("/signup").post(
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  userSignup
);
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);
router.route("/referesh").post(userReferesh);

export default router;
