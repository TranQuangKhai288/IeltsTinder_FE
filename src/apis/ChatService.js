import baseURL from "./Customize-axios";

export const getChatList = async (access_token) => {
  const res = await baseURL.get(`/chat/`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res;
};
