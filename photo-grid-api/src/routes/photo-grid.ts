import express from "express";
import { getPhotos, selectPhotos, deletePhoto, getDefaultPhotos, orderSelectedPhotos } from "../controllers/photo-grid";
import { PhotoInsertValidationSchema, PhotoReOrderValidationSchema, HasUserExceededMaxPhotoSelection } from '../validation-schemas/photo-grid';
import { validateRequest, requireAuthentication } from '@sameera9th-pro/common'; // common set of modules written by me to use thorughout micro-services

const router = express.Router();

// get default images
router.get('/photo/default', getDefaultPhotos);

// get all selected photos route
router.get('/photo', requireAuthentication, getPhotos);

// delete a selected photo route
router.delete('/photo/:id', requireAuthentication, deletePhoto);

// insert a new photo into the gird route
router.post('/photo', requireAuthentication, HasUserExceededMaxPhotoSelection, PhotoInsertValidationSchema, validateRequest, selectPhotos);

// order selected photos
router.post('/photo/order', requireAuthentication, PhotoReOrderValidationSchema, validateRequest, orderSelectedPhotos);

export { router as photoGridRouter };
