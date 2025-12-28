import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";

router.get("/", memberController.goHome);
router.get("/signup", memberController.getSignup);
router.get("/login", memberController.getLogin);

export default router;
