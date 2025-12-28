import express, { Request, Response } from "express";
import { T } from "../libs/types/common";

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
  try {
    res.send("HomePage");
  } catch (err) {
    console.log("ERROR, goHome!", err);
  }
};

memberController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("SignupPage");
  } catch (err) {
    console.log("ERROR, getSignup!", err);
  }
};

memberController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("LoginPage");
  } catch (err) {
    console.log("ERROR, getLogin!", err);
  }
};

export default memberController;
