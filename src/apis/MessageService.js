import baseURL from "./Customize-axios";

export const getAllMessageForaChat = async (chatId, access_token) => {
  const res = await baseURL.get(`/message/${chatId}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res;
};
