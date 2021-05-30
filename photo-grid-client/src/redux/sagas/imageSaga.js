import { call, put, takeEvery, select } from "redux-saga/effects";
import { IMAGES, CLEAR_ACTION, SELECTED_IMAGES, STATUS } from "../types/image";
import { reOrderImages } from '../../utils/commonFunctions';
import { CONFIGS } from '../../utils/configs';
import { DROP_SECTIONS, ERROR_MESSAGES } from '../../utils/constants';
import axios from "axios";

function getAllImages() {
  return axios
    .get(`${CONFIGS.API}/grid/photo/default`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function getSelectedImages() {
  return axios
    .get(`${CONFIGS.API}/grid/photo`, { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function deleteSelectedImage(id) {
  return axios
    .delete(`${CONFIGS.API}/grid/photo/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function insertSelectedImage(item) {
  return axios
    .post(`${CONFIGS.API}/grid/photo`, item, { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function reOrderSelectedPhotos(selectedPhotos) {
  return axios
    .post(`${CONFIGS.API}/grid/photo/order`, {selectedPhotos}, { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function* errorHandler(error) {
  yield put({ type: IMAGES + STATUS.FAIL, message: error });
  yield put({ type: CLEAR_ACTION });
}

function* fetchImages(action) {
  try {
    const { data } = yield call(getAllImages);
    yield put({ type: IMAGES + STATUS.SUCCESS, images: data });
  } catch (error) {
    yield call(errorHandler, error.message);
  }
}

function* fetchSelectedImages(action) {
  try {
    const data = yield call(getSelectedImages);
    yield put({ type: SELECTED_IMAGES + STATUS.SUCCESS, images: data.data });
  } catch (error) {
    yield call(errorHandler, error.message);
  }
}

const getSelectedPhotos = state => state.image.selectedImages;

function* reOrderSelectedImages(action) {
  try {
    const reOrderedPhotos = reOrderImages(action.payload.sourceElement, action.payload.targetElement, yield select(getSelectedPhotos));
    const { data } = yield call(reOrderSelectedPhotos, reOrderedPhotos);
    yield put({ type: SELECTED_IMAGES + STATUS.RE_ORDER + STATUS.SUCCESS, payload: data });
  } catch (error) {
    yield call(errorHandler, error.message);
  }
}


function* selectImage(action){
  try {
    if(action.payload.dragTarget === DROP_SECTIONS.SELECTED.ID) {
      
      if(action.payload.currentSelected.length >= CONFIGS.MAX_PHOTOS_FOR_ALBUM){
        yield call(errorHandler, ERROR_MESSAGES.EXCEED_MAX_SELECTION(CONFIGS.MAX_PHOTOS_FOR_ALBUM));
      } else {
        const data = yield call(insertSelectedImage, action.payload.item);
        action.payload['item'] = data.data;
        yield put({ type: IMAGES + STATUS.UPDATE, payload: action.payload });
      }
      
    } else {
      yield call(deleteSelectedImage, action.payload.item.id);
      yield put({ type: IMAGES +  STATUS.DESELECT, payload: action.payload });
    }
  } catch (error) {
    yield call(errorHandler, error.message);
  }
}

function* imageSaga() {
  yield takeEvery(IMAGES + STATUS.FETCHING, fetchImages); // take every actions IMAGES_FETCHING
  yield takeEvery(IMAGES + STATUS.SELECT, selectImage); // take every actions IMAGES_SELECT
  yield takeEvery(SELECTED_IMAGES + STATUS.FETCHING, fetchSelectedImages); // take every actions IMAGES_FETCHING
  yield takeEvery(SELECTED_IMAGES + STATUS.RE_ORDER, reOrderSelectedImages); // take every actions SELECTED_IMAGES + STATUS.REORDER
}

export default imageSaga;