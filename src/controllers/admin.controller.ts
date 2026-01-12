import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";

const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("HomePage");
  } catch (err) {
    console.log("ERROR, goHome!", err);
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("SignupPage");
  } catch (err) {
    console.log("ERROR, getSignup!", err);
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("LoginPage");
  } catch (err) {
    console.log("ERROR, getLogin!", err);
  }
};

export default adminController;
