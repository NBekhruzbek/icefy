import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import Errors from "../libs/Errors";
import AuthService from "../models/Auth.service";

const memberService = new MemberService();
const authService = new AuthService();

const memberController: T = {};
memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body;
    const result = await memberService.signup(input);

    const token = await authService.createToken(result);
    console.log("token: ", token);

    res.json({ member: result });
  } catch (err) {
    console.log("ERROR, signup!", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body;
    const result = await memberService.login(input);

    const token = await authService.createToken(result);
    console.log("token2: ", token);

    res.json({ member: result });
  } catch (err) {
    console.log("ERROR, login!", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// REACT

export default memberController;
