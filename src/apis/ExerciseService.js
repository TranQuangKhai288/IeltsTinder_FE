import baseURL from "./Customize-axios";

export const getAllExercise = async (id, access_token) => {
  const res = await baseURL.get(
    `/exercise/get-all-exercise`
    //   , {
    //     headers: {
    //       token: `Bearer ${access_token}`,
    //     },
    //   }
  );
  return res;
};

export const getAllQuestionInPractice = async (id, access_token) => {
  const res = await baseURL.get(
    `/exercise/get-questions-exercise/${id}`
    //   , {
    //     headers: {
    //       token: `Bearer ${access_token}`,
    //     },
    //   }
  );
  return res;
};

export const checkAnswer = async (id, answer, access_token) => {
  const res = await baseURL.post(
    `/exercise/check-answer/${id}`,
    {
      answer: answer,
    }
    //   , {
    //     headers: {
    //       token: `Bearer ${access_token}`,
    //     },
    //   }
  );
  return res;
};

export const levelUp = async (access_token) => {
  console.log("level up");
  const res = await baseURL.post(
    `/exercise/level-up`,
    {},
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res;
};
