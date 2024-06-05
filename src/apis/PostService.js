import baseURL from "./Customize-axios";

export const getAll = async () => {
  const res = await baseURL.get(`/post/`);
  return res;
};

export const getPostOfAUser = async (userId) => {
  const res = await baseURL.get(`/post/${userId}`);
  return res;
};

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

export const getAllCommentsofAPost = async (postId) => {
  const res = await baseURL.get(`/post/comments/${postId}`);
  return res;
};
export const postComment = async (postId, data, access_token) => {
  const res = await baseURL.post(
    `/post/comment/${postId}`,
    {
      content: data?.content,
      media: data?.media,
    },
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res;
};
