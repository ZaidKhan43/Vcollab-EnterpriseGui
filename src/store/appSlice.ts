import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sideBarContentTypes, popupMenuContentTypes, displayMenuItems } from '../config';
import {enableProbe} from './probeSlice';
import * as viewerAPIProxy from '../backend/viewerAPIProxy';
type Viewer  = {
    name :string,
    id :string
}

export enum InteractionMode {
    DEFAULT,
    CONTINUOUS_PROBE,
    PROBE_LABEL,
    PICK_AND_MOVE
}
// Define a type for the slice state
type AppState = {
    isAppBarVisible: boolean
    isFullscreenEnabled: boolean,
    isSideBarVisible : boolean,
    sideBarActiveContent : string,
    isDarkModeEnable : boolean,
    popupMenuActiveContent :string,
    popupMenuDisplayMode : any | null,

    interactionMode: InteractionMode,
    isModelLoaded:boolean,
    modelLoadingStatus : string ,
    modelInfo : Array<any>,
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
    popupMenuActiveContent : popupMenuContentTypes.none,
    popupMenuDisplayMode : null,

    interactionMode: InteractionMode.DEFAULT,
    isModelLoaded:false,
    modelLoadingStatus : '' ,
    modelInfo:[],
    viewers : {},
    activeViewer : null
}

const setDefaultInteractModeAsync = createAsyncThunk("appSlice/setDefaultInteractModeAsync",
(data:any,{dispatch,getState}) => {
    let rootState:RootState = getState() as RootState;
    let viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    viewerAPIProxy.enablePickAndMove(viewerId,false);
    dispatch(enableProbe({isEnabled: false}));
});

export const setInteractionModeAsync = createAsyncThunk("appSlice/setInteractionModeAsync",
(data:InteractionMode,{dispatch, getState}) => {
    let rootState:RootState = getState() as RootState;
    let viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    dispatch(setDefaultInteractModeAsync({}));
    switch (data) {
        case InteractionMode.DEFAULT:
            break;
        case InteractionMode.CONTINUOUS_PROBE:
            dispatch(enableProbe({isEnabled:true}));
            break;
        case InteractionMode.PICK_AND_MOVE:
            viewerAPIProxy.enablePickAndMove(viewerId,true);
            break;
        case InteractionMode.PROBE_LABEL:
            
            break;
        default:
            break;
    }
    
    dispatch(appSlice.actions.setInteractionMode(data));
});
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
    setPopupMenuActiveContent : (state, action : PayloadAction<string>) => {
        state.popupMenuActiveContent = action.payload
    },
    setModelLoadedState: (state,action : PayloadAction<boolean>) => {
        state.isModelLoaded = action.payload;
    },
    setModelLoadingStatus : (state, action : PayloadAction<string>) => {
        state.modelLoadingStatus = action.payload
    },
    setModelInfo : (state, action : PayloadAction<Array<any>>) => {
        state.modelInfo = action.payload;
    },
    setInteractionMode :(state, action: PayloadAction<InteractionMode>) => {
        state.interactionMode = action.payload;
        // viewerAPIProxy.enablePickAndMove(activeViewerID,!isPickAndMoveEnabled)
    },
    addViewer : (state,action : PayloadAction<Viewer>) => {
        state.viewers[action.payload.name] = action.payload.id;
        if(state.activeViewer === null)
            state.activeViewer = action.payload.name;
    },
    setActiveViewer: (state,action : PayloadAction<string>) => {
        state.activeViewer = action.payload;
    },
    setPopupMenuDisplayMode :  (state,action : PayloadAction<any>) => {
        state.popupMenuDisplayMode = action.payload;
    }
  },
});

//Define the Reducers
export const { setAppBarVisibility, 
                setFullscreenState, 
                setSidebarVisibility, 
                setSidebarActiveContent, 
                setDarkModeEnable,
                setPopupMenuActiveContent,
                setModelLoadedState,
                setModelLoadingStatus,
                setModelInfo,
                addViewer,
                setActiveViewer,
                setPopupMenuDisplayMode,
            } = appSlice.actions;

//Define the Selectors
export const selectAppBarVisibility = (state : RootState) => state.app.isAppBarVisible;
export const selectFullscreenStatus = (state : RootState) => state.app.isFullscreenEnabled;
export const selectSidebarVisibility = (state : RootState) => state.app.isSideBarVisible;
export const selectSideBarActiveContent = (state : RootState) => state.app.sideBarActiveContent;
export const selectPopupMenuActiveContent = (state : RootState) => state.app.popupMenuActiveContent;
export const selectDarkModeEnable = (state : RootState) => state.app.isDarkModeEnable;
export const selectModelLoadedState = (state : RootState) => state.app.isModelLoaded;
export const selectModelLoadingStatus = (state : RootState) => state.app.modelLoadingStatus;
export const selectModelInfo = (state : RootState) => state.app.modelInfo;
export const selectModelName= (state : RootState) => {
    if(state.app.modelInfo && state.app.modelInfo.length > 0)
        return state.app.modelInfo[0].name
    return "";
};
export const selectInteractionMode = (state:RootState):InteractionMode => state.app.interactionMode;
export const selectActiveViewerID = (state : RootState) => state.app.viewers[state.app.activeViewer  || ''];
export const selectPopupMenuDisplayMode= (state : RootState) => {
    const data = [...displayMenuItems];
    if(state.app.popupMenuDisplayMode){
        data.forEach( (item, index) =>{
            state.app.popupMenuDisplayMode.forEach((displayMode : any) =>{ 
                if(item.id === displayMode.id){
                    data[index] = {...item, ...displayMode}
                }
            });
        });
    }
    return data;
}

export default appSlice.reducer;