import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import likeController from "./controllers/like.controller";
import orderController from "./controllers/order.controller";

/** MEMBER */
router.get("/member/getAdmin", memberController.getAdmin);
router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout,
);

router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail,
);

router.post(
  "/member/updateMember",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember,
);

router.get("/member/top-users", memberController.getTopUsers);

/** PRODUCT */
router.get(
  "/product/all",
  memberController.retrievAuth,
  productController.getProducts,
);
router.get(
  "/product/:id",
  memberController.retrievAuth,
  productController.getProduct,
);
router.post(
  "/product/like/:id",
  memberController.verifyAuth,
  likeController.likeToggle,
);

/** ORDER */
router.post(
  "/order/create",
  memberController.verifyAuth,
  orderController.createOrder,
);

router.get(
  "/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders,
);

router.post(
  "/order/update",
  memberController.verifyAuth,
  orderController.updateOrder,
);

export default router;
