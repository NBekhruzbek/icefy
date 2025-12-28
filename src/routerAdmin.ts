import express from "express";
const routerAdmin = express.Router();
import adminController from "./controllers/admin.controller";

routerAdmin.get("/", adminController.goHome);

routerAdmin.get("/signup", adminController.getSignup);

routerAdmin.get("/login", adminController.getLogin);

export default routerAdmin;
