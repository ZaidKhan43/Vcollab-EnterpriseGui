import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import clipSlice from './clipSlice';

const store = configureStore({
  reducer: {
    app: appSlice,
    clip: clipSlice,
  },
});

export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;



