import axios from 'axios'
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    CLEAR_PROFILE,
    CLEAR_APPLICATION,
} from './types'
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.get("/api/auth");
  
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

  // Logout / clear profile
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_APPLICATION,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};