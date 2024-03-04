import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as UserService from "../../apis/UserService";
import * as ChatService from "../../apis/ChatService";
export const getDetailsUser = createAsyncThunk(
  "user/getDetailsUser",
  async (user, thunkAPI) => {
    try {
      const response = await UserService.getDetailsUser(
        user.data._id,
        user.access_token
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getChatList = createAsyncThunk(
  "user/getChatList",
  async (access_token, thunkAPI) => {
    try {
      const response = await ChatService.getChatList(access_token);
      console.log(response, "response ChatList");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  userData: {
    id: "",
    name: "",
    avatar: "",
    email: "",
    phone: "",
    friends: [],
    chatList: [],
    notification: [],
    exercises: [],
    schedule: [],
    isAdmin: false,
  },
  access_token: "" | null,
  refresh_token: "" | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userData = action.payload;
      state.access_token = action.access_token;
    },

    logout: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailsUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.access_token = action.meta.arg.access_token;
    });
    builder.addCase(getChatList.fulfilled, (state, action) => {
      state.userData.chatList = action.payload;
    });
    builder.addCase(getChatList.rejected, (state, action) => {
      state.userData.chatList = action.payload;
    });
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer; // Export userSlice as default
