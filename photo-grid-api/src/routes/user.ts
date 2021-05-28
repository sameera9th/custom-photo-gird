import express from "express";
import { SignupValidationSchema } from '../validation-schemas/user';
import { singup, singin } from '../controllers/user';
import { validateRequest } from '@sameera9th-pro/common'; // common set of modules written by me to use thorughout micro-services

const router = express.Router();

router.post('/signup', SignupValidationSchema, validateRequest, singup);
router.post('/signin', SignupValidationSchema, validateRequest, singin);

export { router as userRouter };
