import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: false,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return error && error.response && error.response.data
      ? error.response
      : Promise.reject(error);
  }
);

export default instance;