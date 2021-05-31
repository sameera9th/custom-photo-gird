import { IMAGES, SELECTED_IMAGES, ACKNOWLEDGE_ERROR, TRIGGER_ERROR, STATUS } from "../types/image";

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

// re-order selected images
export function reOrder({ targetElement, sourceElement }){
  return {
    type: SELECTED_IMAGES + STATUS.RE_ORDER,
    payload: { targetElement, sourceElement },
  };
}

export function triggerError(msg){
  return {
    type: TRIGGER_ERROR,
    payload: msg
  };
}

export function acknowledgeError(){
  return {
    type: ACKNOWLEDGE_ERROR,
    payload: null
  };
}
