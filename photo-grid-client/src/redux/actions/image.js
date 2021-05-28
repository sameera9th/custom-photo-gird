import { IMAGES, SELECTED_IMAGES,  STATUS } from "../types/image";

// this action is use to fetch intal set of images from the given API endpoint
export function getAllImages(images) {
  return {
    type: IMAGES + STATUS.FETCHING,
    payload: images,
  };
}

// this action is use to fetch selected images fromt he grid API
export function getSelectedImages(images) {
  return {
    type: SELECTED_IMAGES + STATUS.FETCHING,
    payload: images,
  };
}
// select images from the all images
export function selectImages({ dragTarget, dragSource, item, currentSelected }){
  return {
    type: IMAGES + STATUS.SELECT,
    payload: { dragTarget, dragSource, item, currentSelected },
  };
}
