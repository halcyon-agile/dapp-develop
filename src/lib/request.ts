import axios from "axios";
import portalUrl from "../lib/portalUrl";

const request = axios.create({
  baseURL: portalUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.response.use(
  (response) => {
    // console.log('response', response)
    return response;
  },
  (error) => {
    // console.log('error response', error)
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        delete request.defaults.headers.common["Authorization"];
      }
    }
    return Promise.reject(error);
  }
);

if (!request.defaults.headers.common["Authorization"]) {
  request.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
}

export default request;
