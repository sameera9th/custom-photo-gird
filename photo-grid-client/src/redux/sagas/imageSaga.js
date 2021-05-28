import { call, put, takeEvery } from "redux-saga/effects";
import { IMAGES, CLEAR_ACTION, SELECTED_IMAGES, STATUS } from "../types/image";
import axios from "axios";

const PHOTO_GRID_API = "http://localhost:3001/api/grid/photo";

function getAllImages() {
  return axios
    .get(PHOTO_GRID_API+'/default')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function getSelectedImages() {
  return axios
    .get(PHOTO_GRID_API, { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function deleteSelectedImage(id) {
  return axios
    .delete(`${PHOTO_GRID_API}/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function insertSelectedImage(item) {
  return axios
    .post(PHOTO_GRID_API, item, { headers: { Authorization: localStorage.getItem('token') } })
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

function* selectImage(action){
  try {
    if(action.payload.dragTarget === 'selectedImages') {
      
      if((action.payload.currentSelected.length + 1) > 9){
        yield call(errorHandler, 'You can only select nine photos');
      } else {
        const data = yield call(insertSelectedImage, action.payload.item);
        action.payload['item'] = data.data;
        yield put({ type: IMAGES +  STATUS.UPDATE, payload: action.payload });
      }
      
    } else {
      yield call(deleteSelectedImage, action.payload.item._id);
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
}

export default imageSaga;