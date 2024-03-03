import pageChangeReducer from "./feature/pageSize/pageSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  //   whitelist: [""],
};

const rootReducer = combineReducers({
  page: pageChangeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production", // 개발자도구 확인
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};
const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

export type RootState = ReturnType<AppStore["getState"]>;
// export type RootState = ReturnType<typeof store.getState>;

export default store;
export const persistor = persistStore(store);
