import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sideBarContentTypes } from '../config';

type Viewer = {
    name :string,
    id :string
}

// Define a type for the slice state
type AppState = {
    isAppBarVisible: boolean
    isFullscreenEnabled: boolean,
    isSideBarVisible : boolean,
    sideBarActiveContent : string,
    isDarkModeEnable : boolean,
    isModelLoaded:boolean,
    modelLoadingStatus : string ,
    viewers : { [id: string]: string; },
    activeViewer : string | null
}

// Define the initial state using that type
const initialState: AppState = {
    isAppBarVisible: false,
    isFullscreenEnabled: false,
    isSideBarVisible : false,
    sideBarActiveContent : sideBarContentTypes.mainMenu,
    isDarkModeEnable: true,
    isModelLoaded:false,
    modelLoadingStatus : '' ,
    viewers : {},
    activeViewer : null
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
    },
    setDarkModeEnable : (state, action : PayloadAction<boolean>) => {
        state.isDarkModeEnable = action.payload
    },
    setModelLoadedState: (state,action : PayloadAction<boolean>) => {
        state.isModelLoaded = action.payload;
    },
    setModelLoadingStatus : (state, action : PayloadAction<string>) => {
        state.modelLoadingStatus = action.payload
    },
    addViewer : (state,action : PayloadAction<Viewer>) => {
        state.viewers[action.payload.name] = action.payload.id;
        if(state.activeViewer === null)
            state.activeViewer = action.payload.name;
    },
    setActiveViewer: (state,action : PayloadAction<string>) => {
        state.activeViewer = action.payload;
    }
  },
});

//Define the Reducers
export const { setAppBarVisibility, 
                setFullscreenState, 
                setSidebarVisibility, 
                setSidebarActiveContent, 
                setDarkModeEnable,
                setModelLoadedState,
                setModelLoadingStatus,
                addViewer,
                setActiveViewer,
                
            } = appSlice.actions;

//Define the Selectors
export const selectAppBarVisibility = (state : RootState) => state.app.isAppBarVisible;
export const selectFullscreenStatus = (state : RootState) => state.app.isFullscreenEnabled;
export const selectSidebarVisibility = (state : RootState) => state.app.isSideBarVisible;
export const selectSideBarActiveContent = (state : RootState) => state.app.sideBarActiveContent;
export const selectDarkModeEnable = (state : RootState) => state.app.isDarkModeEnable;
export const selectModelLoadedState = (state : RootState) => state.app.isModelLoaded;
export const selectModelLoadingStatus = (state : RootState) => state.app.modelLoadingStatus;
export const selectActiveViewerID = (state : RootState) => state.app.viewers[state.app.activeViewer  || ''];

export default appSlice.reducer;