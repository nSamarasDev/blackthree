import { configureStore } from '@reduxjs/toolkit';
import alert from "../reducers/alert";
import auth from "../reducers/auth";

export const store = configureStore({
  reducer: {
    alert,
    auth,
  },
});
