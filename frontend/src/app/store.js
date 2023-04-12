import { configureStore } from '@reduxjs/toolkit';
import alert from "../reducers/alert";
import auth from "../reducers/auth";
import contact from "../reducers/contact";

export const store = configureStore({
  reducer: {
    alert,
    auth,
    contact,
  },
});
