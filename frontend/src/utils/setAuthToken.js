import axios from "axios";
import Cookies from "js-cookie";

const setAuthToken = (custom) => {
  if (custom) {
    Cookies.set("custom", custom);
    axios.defaults.headers.common["x-auth-token"] = custom;
  } else {
    Cookies.remove("custom");
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;