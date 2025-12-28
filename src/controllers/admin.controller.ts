import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";

const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    res.send("HomePage");
  } catch (err) {
    console.log("ERROR, goHome!", err);
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("SignupPage");
  } catch (err) {
    console.log("ERROR, getSignup!", err);
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("LoginPage");
  } catch (err) {
    console.log("ERROR, getLogin!", err);
  }
};

export default adminController;
