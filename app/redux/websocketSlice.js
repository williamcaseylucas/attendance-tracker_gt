import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: null,
};

export const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    addWebsocket: (state, action) => {
      return action.payload;
    },
  },
});

export const { addWebsocket } = websocketSlice.actions;
export default websocketSlice.reducer;
