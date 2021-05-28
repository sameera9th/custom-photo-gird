import { Request, Response } from "express";
import { DefaultPhotos, CustomPhotoGrid } from "../models";
import { getValueForNextSequence } from "../utils/common-methods";
import { BadRequestError } from "@sameera9th-pro/common"; // common set of modules written by me to use thorughout micro-services
import { CONFS } from "../configs";

export async function inserPhoto(req: Request, res: Response) {
  try {
    const { id, picture } = req.body;

    const photoGird = await CustomPhotoGrid.build({
      id,
      userId: req.currentUser?.id,
      order: await getValueForNextSequence("item_id"),
      picture,
    }).save();

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.INSERT_SUCCESS,
      data: photoGird,
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });
  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}

export async function deletePhoto(req: Request, res: Response) {
  try {      
    const id = req.params.id;

    const photos = await CustomPhotoGrid.deleteOne({ _id: id, userId: req.currentUser?.id });

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.DELETE_SUCCESS,
      data: photos,
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });
  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}

export async function getPhotos(req: Request, res: Response) {
  try {

    const photos = await CustomPhotoGrid.find({ userId: req.currentUser?.id }).sort({ order: 1 });

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.DATA_FOUND,
      data: photos,
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });

  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}

export async function getDefaultPhotos(req: Request, res: Response) {
  try {

    const photos = await DefaultPhotos.find({}).sort({ createdAt: 1 });

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.DATA_FOUND,
      data: photos,
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });

  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}
