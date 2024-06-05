import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://192.168.1.4:5000/api",
});

export default instance;

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // const token = AsyncStorage.getItem("token");
    // if (token) {
    //   config.headers["token"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.data.message === "jwt expired") {
      try {
        console.log("calling refresh token");
        const result = await instance.post(`/user/refresh-token`, {
          withCredentials: true,
        });
        console.log("Refresh token result", result.access_token);
        const access_token = result.access_token;
        originalRequest.headers["token"] = `Bearer ${access_token}`;
        return instance(originalRequest);
      } catch (error) {
        console.log("Refresh token failed", error);
      }
    }
  }
);
