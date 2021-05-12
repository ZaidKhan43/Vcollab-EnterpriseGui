import { configureStore,combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import productTreeSlice from './sideBar/productTreeSlice';
import displayModesSlice from './sideBar/displayModesSlice';
import toastSlice from "./toastSlice";
import clipSlice from './clipSlice';

const store = configureStore({
    reducer:
      combineReducers({
        app: appSlice,
        clip: clipSlice,
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


