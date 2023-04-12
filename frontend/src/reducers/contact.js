import { GET_CONTACT, CONTACT_ERROR } from "../actions/types";

const initialState = {
  contact: null,
  contacts: [],
  loading: true,
  error: {},
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACT:
      return {
        ...state,
        contact: payload,
        loading: false,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        contact: null,
      };
    default:
      return state;
  }
}
