import { Request, Response } from "express";
import { User } from "../models";
import jwt from "jsonwebtoken";
import { BadRequestError } from "@sameera9th-pro/common"; // common set of modules written by me to use thorughout micro-services
import { CONFS } from "../configs";
import { Password } from "../services/password";

export async function singup(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(CONFS.RESPONSE_CODE.DATA_NOT_FOUND).send({
        message: CONFS.RESPONSE_MSG.EMAIL_ALREADY_USED
      });
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.API_SECRECT!
    );

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.SIGNUP_SUCCESS,
      data: { user, token: userJwt },
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });
  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}

export async function singin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(CONFS.RESPONSE_CODE.DATA_NOT_FOUND).send({
        message: CONFS.RESPONSE_MSG.INVALID_CREDS
      });
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      return res.status(CONFS.RESPONSE_CODE.DATA_NOT_FOUND).send({
        message: CONFS.RESPONSE_MSG.INVALID_CREDS
      });
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.API_SECRECT!
    );

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.SIGNIN_SUCCESS,
      data: { user: existingUser, token: userJwt },
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });
  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}
