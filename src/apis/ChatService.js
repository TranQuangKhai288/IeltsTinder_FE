import baseURL from "./Customize-axios";

export const getChatList = async (access_token) => {
  const res = await baseURL.get(`/chat/`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res;
};

export const accessChat = async (userId, access_token) => {
  const res = await baseURL.post(
    `/chat/`,
    {
      userId: userId,
    },
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res;
};
