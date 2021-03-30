import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Define a type for the slice state
interface appState {
    isFullscreen: boolean,
    isSidebarVisible : boolean,
}

// Define the initial state using that type
const initialState: appState = {
    isFullscreen: false,
    isSidebarVisible : false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFullscreenState : (state, action : PayloadAction<boolean>) => {
        state.isFullscreen = action.payload
    },
    setSidebarVisibilityState : (state, action : PayloadAction<boolean>) => {
        state.isSidebarVisible = action.payload
    }
  },
});

//Define the Reducers
export const { setFullscreenState, setSidebarVisibilityState } = appSlice.actions;

//Define the Selectors
export const selectFullscreen = (state : RootState) => state.app.isFullscreen;
export const selectSidebarVisibility = (state : RootState) => state.app.isSidebarVisible;

export default appSlice.reducer;