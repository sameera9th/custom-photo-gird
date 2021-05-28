import { body, oneOf } from 'express-validator';

export const PhotoInsertValidationSchema = [
    body("picture")
        .trim()
        .notEmpty()
        .withMessage("You must supply a image name to create a grid"),
    body("id")
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage("You must supply a image id to create a grid")
]