import { SIGNIN_USER, SIGNUP_USER, STATUS } from "../types/user";

export const initialState = {
  user: {
    id: null,
    email: null,
  }, // this contains all the field that user object has
  fetching: false, // fetching status from the API
  error: null, // any error while user signup or signin
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER + STATUS.FETCHING: // fetching signin action
      return {
        ...state,
        fetching: true,
        error: null
      };
    case SIGNIN_USER + STATUS.SUCCESS: // successfully signin
      return {
        ...state,
        user: action.payload.user,
        fetching: false,
        error: null
      };
    case SIGNIN_USER + STATUS.FAIL: // signin failed
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };
    case SIGNUP_USER + STATUS.FETCHING: // fetching signup action
      return {
        ...state,
        fetching: true,
        error: null
      };
    case SIGNUP_USER + STATUS.SUCCESS: // successfully signup
      return {
        ...state,
        user: action.payload.user,
        fetching: false,
        error: null
      };
    case SIGNUP_USER + STATUS.FAIL: // signup failed
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };

    default:
      return state;
  }
};

export default user;
