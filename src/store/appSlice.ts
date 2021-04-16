import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sideBarContentTypes } from '../config';

interface IViewer {
    name :string,
    id :string
}

// Define a type for the slice state
interface IAppState {
    isAppBarVisible: boolean
    isFullscreenEnabled: boolean,
    isSideBarVisible : boolean,
    sideBarActiveContent : string
    viewers : { [id: string]: string; },
    activeViewer : string | null
}

// Define the initial state using that type
const initialState: IAppState = {
    isAppBarVisible: false,
    isFullscreenEnabled: false,
    isSideBarVisible : false,
    sideBarActiveContent : sideBarContentTypes.mainMenu,
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
    addViewer : (state,action : PayloadAction<IViewer>) => {
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
                addViewer,
                setActiveViewer
            } = appSlice.actions;

//Define the Selectors
export const selectAppBarVisibility = (state : RootState) => state.app.isAppBarVisible;
export const selectFullscreenStatus = (state : RootState) => state.app.isFullscreenEnabled;
export const selectSidebarVisibility = (state : RootState) => state.app.isSideBarVisible;
export const selectSideBarActiveContent = (state : RootState) => state.app.sideBarActiveContent;
export const selectActiveViewerID = (state : RootState) => state.app.viewers[state.app.activeViewer  || ''];

export default appSlice.reducer;