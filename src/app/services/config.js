import axios from "axios";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";

const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

baseAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  (response) => {
    const Swal = useSwalWrapper();
    if (response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not authorized",
      });
    }
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

//todo: define interceptors and other configuration like baseURL, headers etc. here
export default baseAxios;
