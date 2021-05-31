import { Request, Response } from "express";
import { DefaultPhotos, User } from "../models";
import { BadRequestError } from "@sameera9th-pro/common"; // common set of modules written by me to use thorughout micro-services
import { CONFS } from "../configs";

export async function selectPhotos(req: Request, res: Response) {
  try {
    const { id, picture } = req.body;

    const selectedPhoto = await User.selectPhoto(req.currentUser?.id, {
      id,
      picture,
    });

    if (selectedPhoto) {
      return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
        message: CONFS.RESPONSE_MSG.PHOTO_SELECTION_SUCCESS,
        data: selectedPhoto,
        success: true,
        code: CONFS.RESPONSE_CODE.SUCCESS,
      });
    } else {
      throw new BadRequestError(CONFS.RESPONSE_MSG.PHOTO_SELECTION_ERROR);
    }
  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}

export async function deletePhoto(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const photos = await User.deSelectPhoto(req.currentUser?.id, Number(id));

    if(photos){
      return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
        message: CONFS.RESPONSE_MSG.DELETE_SUCCESS,
        data: photos,
        success: true,
        code: CONFS.RESPONSE_CODE.SUCCESS,
      });
    } else {
      throw new BadRequestError(CONFS.RESPONSE_MSG.NO_RECORD_FOUND_FOR_THE_PARAMTERS);
    }

  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}

export async function getPhotos(req: Request, res: Response) {
  try {
    const photos = await User.getAllSelectedPhotos(req.currentUser?.id);

    if(photos){
      return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
        message: CONFS.RESPONSE_MSG.DATA_FOUND,
        data: photos,
        success: true,
        code: CONFS.RESPONSE_CODE.SUCCESS,
      });
    } else {
      throw new BadRequestError(CONFS.RESPONSE_MSG.NO_RECORD_FOUND_FOR_THE_PARAMTERS);
    }
    
  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}

export async function getDefaultPhotos(req: Request, res: Response) {
  try {
    const photos = await DefaultPhotos.getDefaultPhotos();
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

export async function orderSelectedPhotos(req: Request, res: Response) {
  try {

    const { selectedPhotos } = req.body;

    const photos = await User.orderSelectedPhotos(req.currentUser?.id, selectedPhotos);

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.PHOTO_SELECTION_ORDERED_SUCCESS,
      data: photos,
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });
    
  } catch (error) {
    throw new BadRequestError(error.message);
  }
}
