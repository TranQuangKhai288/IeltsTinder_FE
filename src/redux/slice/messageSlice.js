import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as MessageService from "../../apis/MessageService";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (chatId, { rejectWithValue, getState }) => {
    try {
      const { access_token } = getState().user;
      const messages = await MessageService.getAllMessageForaChat(
        chatId,
        access_token
      );
      return messages.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  messages: [],
  isLoading: false,
  isSuccessful: false,
  error: null,
  inChat: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    resetMessages: (state) => {
      state.messages = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.inChat = action.payload[0].chat;
        state.isLoading = false;
        state.messages = action.payload;
        state.isSuccessful = true;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessages } = messageSlice.actions;

export default messageSlice.reducer;
