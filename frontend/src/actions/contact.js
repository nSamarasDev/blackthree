import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_CONTACT,
  CONTACT_ERROR,
  UPDATE_CONTACT,
  CLEAR_CONTACTS,
  GET_CONTACTS,
  ACCOUNT_DELETED,
} from "./types";

export const getCurrentContact = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/contact/me");

    dispatch({
      type: GET_CONTACT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: CLEAR_CONTACTS });

    dispatch({
      type: CONTACT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get all Contacts
export const getContacts = () => async (dispatch) => {
  dispatch({ type: CLEAR_CONTACTS });

  try {
    const res = await axios.get("api/contact");

    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get contact by id
export const getContactById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/contact/user/${userId}`);

    dispatch({
      type: GET_CONTACT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update contact
export const createContact =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/contact", formData, config);

      dispatch({
        type: GET_CONTACT,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Contact Updated" : "contact message sent.", "success")
      );

      if (!edit) {
        history.push("/contact");
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: CONTACT_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/contact/user/${userId}`);

    dispatch({
      type: GET_CONTACT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// DELETE Account and Contact
// Delete Education
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone")) {
    try {
      await axios.delete("/api/contact");

      dispatch({
        type: CLEAR_CONTACTS,
      });

      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch(setAlert("Your account has been permaanetly deleted"));
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
