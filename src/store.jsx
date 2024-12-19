import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "./appReducer/CrudSlice";

export const store = configureStore({
  reducer: {
    crud: crudReducer,
  },
});
