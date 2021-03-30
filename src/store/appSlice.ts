import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sideBarContents } from '../config';

// Define a type for the slice state
interface appState {
    isAppBarVisible: boolean
    isFullscreenEnabled: boolean,
    isSideBarVisible : boolean,
    sideBarActiveContent : string
}

// Define the initial state using that type
const initialState: appState = {
    isAppBarVisible: false,
    isFullscreenEnabled: false,
    isSideBarVisible : false,
    sideBarActiveContent : sideBarContents.mainMenu
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppBarVisibility : (state, action : PayloadAction<boolean>) => {
        state.isAppBarVisible = action.payload
    },
    setFullscreenState : (state, action : PayloadAction<boolean>) => {
        state.isFullscreenEnabled = action.payload
    },
    setSidebarVisibility : (state, action : PayloadAction<boolean>) => {
        state.isSideBarVisible = action.payload
    },
    setSidebarActiveContent : (state, action : PayloadAction<string>) => {
      state.sideBarActiveContent = action.payload
  }
  },
});

//Define the Reducers
export const { setAppBarVisibility, setFullscreenState, setSidebarVisibility, setSidebarActiveContent } = appSlice.actions;

//Define the Selectors
export const selectAppBarVisibility = (state : RootState) => state.app.isAppBarVisible;
export const selectFullscreenStatus = (state : RootState) => state.app.isFullscreenEnabled;
export const selectSidebarVisibility = (state : RootState) => state.app.isSideBarVisible;
export const selectSideBarActiveContent = (state : RootState) => state.app.sideBarActiveContent;

export default appSlice.reducer;