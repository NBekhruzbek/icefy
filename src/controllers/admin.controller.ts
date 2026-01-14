import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const memberService = new MemberService();

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

adminController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body:", req.body);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.ADMIN;
    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (err) {
    console.log("ERROR, processSignup!", err);
    res.send(err);
  }
};

adminController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    res.send("DONE");
  } catch (err) {
    console.log("ERROR, processLogin!", err);
  }
};

export default adminController;
