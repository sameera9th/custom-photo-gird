import { SIGNIN_USER, SIGNUP_USER, STATUS } from "../types/user";


export function signUpUser(user) {
  return {
    type: SIGNUP_USER + STATUS.FETCHING,
    payload: user,
  };
}

export function signInUser(user) {
  return {
    type: SIGNIN_USER + STATUS.FETCHING,
    payload: user
  };
}

export function logout() {
  return {
    type: 'USER_LOGOUT',
    payload: null
  };
}