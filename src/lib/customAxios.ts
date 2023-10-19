import axios from "axios";
import portalUrl from "../lib/portalUrl";
const customAxios = axios.create({
  baseURL: portalUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

if (!customAxios.defaults.headers.common["Authorization"]) {
  customAxios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
}

export default customAxios;
