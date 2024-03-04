import baseURL from "./Customize-axios";

export const loginUser = async (data) => {
  const res = await baseURL.post(`/user/login`, data);
  return res;
};
export const registerUser = async (data) => {
  const res = await baseURL.post(`/user/register`, data);
  return res;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await baseURL.get(`/user/get-details/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res;
};

export const deleteUser = async (id, access_token, data) => {
  const res = await baseURL.delete(`/user/delete-user/${id}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res;
};

export const getAllUser = async (access_token) => {
  const res = await baseURL.get(`/user/getAll`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res;
};

export const refreshToken = async () => {
  console.log("refreshToken", refreshToken);
  const res = await baseURL.post(`/user/refresh-token`, {
    withCredentials: true,
  });
  return res;
};

export const logoutUser = async () => {
  const res = await baseURL.post(`/user/log-out`);
  return res;
};

export const updateUser = async (id, data, access_token) => {
  console.log("data", data);
  const res = await baseURL.put(`/user/update-user/${id}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res;
};
