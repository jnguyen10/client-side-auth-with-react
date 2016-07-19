import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:8000';

export function signupUser({ email, password }) {
  // function will be called automatically by redux-thunk
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token to local storage
        //   * local storage is a native method on the window scope *
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route '/feature'
        browserHistory.push('/feature_private_1');

      })
      .catch((response) => {
        // If request is bad...
        // - Show an error to the user
        // * error message response is received from server *
        dispatch(authError(response.data.error));
      })
  };
};

export function signinUser({ email, password }) {
  // function will be called automatically by redux-thunk
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token to local storage
        //   * local storage is a native method on the window scope *
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route '/feature'
        browserHistory.push('/feature_private_1');

      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError("Bad Login Info"));
      })
  };
};

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
};

export function signoutUser() {
  // remove token from local storage
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
};

export function fetchMessage() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/reqAuth`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log("response from actions", response)
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      });
  }
}
