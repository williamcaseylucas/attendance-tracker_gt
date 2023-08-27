import { configureStore } from "@reduxjs/toolkit";
import websocketReducer from "./websocketSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, websocketReducer);

export const store = configureStore({
  reducer: {
    // websocket: persistedReducer,
    websocket: websocketReducer,
  },
});

// export const persistor = persistStore(store);
