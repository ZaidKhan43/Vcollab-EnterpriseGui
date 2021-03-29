import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Define a type for the slice state
interface appState {
    isFullscreen: boolean
}

// Define the initial state using that type
const initialState: appState = {
    isFullscreen: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFullscreenState : (state, action : PayloadAction<boolean>) => {
        state.isFullscreen = action.payload
    }
  },
});

//Define the Reducers
export const { setFullscreenState } = appSlice.actions;

//Define the Selectors
export const selectFullscreen = (state : RootState) => state.app.isFullscreen;

export default appSlice.reducer;