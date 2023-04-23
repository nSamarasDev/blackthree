import { GET_CONTACT, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS, DELETE_CONTACT } from "../actions/types";

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
      case GET_CONTACTS:
        return {
          ...state,
          contacts: payload,
          loading: false,
        };
    case CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        contact: null,
      };
      case CLEAR_CONTACTS:
        return {
          ...state,
          contact: null,
          loading: false,
        };
        case DELETE_CONTACT:
       return {
        ...state,
        contacts: state.contacts.filter((contact) => contact._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
