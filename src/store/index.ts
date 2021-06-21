import { configureStore,combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import toastSlice from "./toastSlice";
import productTreeSlice from './sideBar/productTreeSlice';
import displayModesSlice from './sideBar/displayModesSlice';
import clipSlice from './sideBar/clipSlice';
import colormapSlice from './colormapSlice';
import probeSlice from './probeSlice';
const store = configureStore({
    reducer:
      combineReducers({
        app: appSlice,
        clipPlane: clipSlice,
        productTree: productTreeSlice,
        probe: probeSlice,
        displayModes: displayModesSlice,
        toast: toastSlice,

        colormaps: colormapSlice
      })
});

export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


