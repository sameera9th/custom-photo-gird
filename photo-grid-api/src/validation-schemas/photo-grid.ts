import { body, check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@sameera9th-pro/common";
import { CONFS } from "../configs";
import { User } from "../models";

export const PhotoInsertValidationSchema = [
  body("picture")
    .trim()
    .notEmpty()
    .withMessage("You must supply a image name to create a grid"),
  body("id")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("You must supply a image id to create a grid"),
];

export const PhotoReOrderValidationSchema = [
  check("selectedPhotos.*._id")
    .trim()
    .notEmpty()
    .withMessage("You must supply a _id to re-order the grid"),
  check("selectedPhotos.*.id")
    .trim()
    .notEmpty()
    .withMessage("You must supply a image id to re-order the grid"),
  body("selectedPhotos.*.picture")
    .trim()
    .notEmpty()
    .withMessage("You must supply a image name to re-order the grid"),
];

export const HasUserExceededMaxPhotoSelection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (await User.userHasExceededMaxSelection(req.currentUser?.id)) {
    throw new BadRequestError(CONFS.RESPONSE_MSG.PHOTO_SELECTION_VALIDATION);
  }
  return next();
};
