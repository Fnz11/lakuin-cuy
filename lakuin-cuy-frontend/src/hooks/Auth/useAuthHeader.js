import { axiosInstance } from "../../lib/axios";

const setAuthHeader = (token) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };

  export default setAuthHeader