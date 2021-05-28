import { call, put, takeEvery } from "redux-saga/effects";
import { SIGNIN_USER, SIGNUP_USER, STATUS } from "../types/user";
import { setLocaStorage }from '../../utils/commonFunctions';
import axios from "axios";

const USER_API = "http://localhost:3001/api/user";

function signup({email, password}) {
  return axios
    .post(USER_API+'/signup', { email, password })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function signin({email, password}) {
  return axios
    .post(USER_API+'/signin', { email, password })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function* errorHandler(error) {
  yield put({ type: SIGNIN_USER + STATUS.FAIL, payload: error });
}

function* signinUser(action) {
    try {
      const { data, status }  = yield call(signin, action.payload);
      if(status === 212){
        yield call(errorHandler, data.message);
      } else {
        setLocaStorage(data.data);
        yield put({ type: SIGNIN_USER + STATUS.SUCCESS, payload: data.data });
      }
    } catch (error) {
      yield call(errorHandler, error.message);
    }
}

function* signupUser(action) {
  try {
    const { data, status } = yield call(signup, action.payload);
    if(status === 212){
      yield call(errorHandler, data.message);
    } else {
      setLocaStorage(data.data);
      yield put({ type: SIGNUP_USER + STATUS.SUCCESS, payload: data.data });
    }
  } catch (error) {
    yield call(errorHandler, error.message);
  }
}

function* userSaga() {
  yield takeEvery(SIGNUP_USER + STATUS.FETCHING, signupUser); // take every actions SIGNUP_USER_FETCHING
  yield takeEvery(SIGNIN_USER + STATUS.FETCHING, signinUser); // take every actions SIGNIN_USER_FETCHING
}

export default userSaga;