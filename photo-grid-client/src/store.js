import { createStore, applyMiddleware } from "redux"; // import createStore and applyMiddleware from redux
import createSagaMiddleware from "redux-saga"; // import createSagaMiddleware from redux saga
import rootSaga from "./redux/sagas"; // import rootSaga from sagas
import { persistStore, persistReducer } from "redux-persist"; // redux persist
import storage from "redux-persist/lib/storage";

import reducer from "./redux/reducers"; // import root reducer from the reducers

const sagaMiddleware = createSagaMiddleware(); // creating the saga middleware

const middleware = applyMiddleware(sagaMiddleware); // apply saga as middleware into store creation

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = () => {
  let store = createStore(persistedReducer, middleware); // creating the store using reducer and middlewares
  sagaMiddleware.run(rootSaga); // after creating the store the saga middleware will start
  let persistor = persistStore(store);
  return { store, persistor };
}

export default store;
