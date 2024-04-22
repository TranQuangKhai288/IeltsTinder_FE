import baseURL from "./Customize-axios";

// export const getAllPost = async (chatId, access_token) => {
//   const res = await baseURL.get(`/message/${chatId}`, {
//     headers: {
//       token: `Bearer ${access_token}`,
//     },
//   });
//   return res;
// };

export const addAPost = async (content, media, access_token) => {
  const res = await baseURL.post(
    `/post/`,
    {
      content: content,
      media: media,
    },
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res;
};
