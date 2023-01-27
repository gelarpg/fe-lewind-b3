import axios from "axios";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";

const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//todo: define interceptors and other configuration like baseURL, headers etc. here
export default baseAxios;
