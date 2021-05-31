import { combineReducers } from 'redux'; // import conbine reducer from redux
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as imageReducer from './image'; // import image reducer
import userReducer from './user'; // import user reducer

// combine reducers using other reducers
const appReducer = combineReducers({
    image: imageReducer.image,
    user: persistReducer(
        {
          key: "user", // key for localStorage key, will be: "persist:form"
          storage,
          blacklist: ['user'], // blacklist this states
        },
        userReducer
      ),
});

// create root reducer via a combination of reducers
const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        localStorage.clear();
        state = {
            image: imageReducer.initialState,
            user: userReducer.initialState,
        }
    }
    return appReducer(state, action)
}

export default rootReducer;