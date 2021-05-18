import { configureStore,combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import toastSlice from "./toastSlice";
import productTreeSlice from './sideBar/productTreeSlice';
import displayModesSlice from './sideBar/displayModesSlice';
import clipSlice from './sideBar/clipSlice';
import propsSlice from './propsSlice';

const store = configureStore({
    reducer:
      combineReducers({
        app: appSlice,
        clip: clipSlice,
        productTree: productTreeSlice,
        displayModes: displayModesSlice,
        toast: toastSlice,
        props: propsSlice,
      })
});

export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


