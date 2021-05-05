import { configureStore,combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import productTreeSlice from './sideBar/ProductTreeSlice';
import displayModesSlice from "./sideBar/DisplayModesSlice";
import toastSlice from "./toastSlice";
const store = configureStore({
    reducer:
      combineReducers({
        app: appSlice,
        productTree: productTreeSlice,
        displayModes: displayModesSlice,
        toast: toastSlice
      })
});

export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


