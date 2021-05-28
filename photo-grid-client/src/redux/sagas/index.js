import { all } from 'redux-saga/effects';
import imageSaga from './imageSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
    yield all([
        imageSaga(),
        userSaga()
    ])
}