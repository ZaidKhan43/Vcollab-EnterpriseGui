import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stringify } from 'querystring';
import type { RootState } from './index';

export type WindowState = {
    id:string,
    zOrder: number,
    isEditMode: boolean,
    isHidden: boolean,
    pos: [number,number],
    anchor: [number,number],
    size: [number, number]
}

type WindowMgrState = {
    windows : {[id: string] : WindowState},
    windowsCount: number,
    isEnabled: boolean,
    editModeZIndex: number,
    viewModeZIndex: number
}

const initialState = {
    isEnabled: false,
    windowsCount: 0,
    windows: {},
    editModeZIndex: 100,
    viewModeZIndex: 5
} as WindowMgrState

export const windowMgrSlice = createSlice({
    name: 'windowMgr',
    initialState,
    reducers: {
        addWindow: (state, action: PayloadAction<{uid:string}>) => {
            const { uid } = action.payload;
            if(state.windows[uid] !== undefined)
            {
                throw new Error("The provided window id in not unique")
            }
            state.windows[uid] = {
                id:uid, 
                pos:[-1,-1],
                anchor:[0,0],
                size: [300,300],
                isEditMode: false, 
                isHidden: false, 
                zOrder: state.windowsCount
            };
            state.windowsCount = state.windowsCount+1;
        },
        removeWindow: (state, action: PayloadAction<{uid:string}>) => {
            const { uid } = action.payload;
            if(state.windows[uid] !== undefined)
            {
                delete state.windows[uid]
                state.windowsCount = state.windowsCount-1;
            }
            else{
                throw new Error("The provided window id does not exist")
            }
        },
        setWindowAccess: (state, action:PayloadAction<{enable:boolean}>) => {
            let windows = state.windows;
            const {enable} = action.payload;
          
            const windowsSorted = [...Object.values(windows)].sort((a,b) => {
                return (a.zOrder < b.zOrder) ? -1 : 1
            });
            windowsSorted.forEach((v,i) => {
                v.zOrder = i + (enable ? state.editModeZIndex : state.viewModeZIndex);
                windows[v.id] = v;
            })
            
            state.isEnabled = enable;
        },
        setEditMode: (state, action:PayloadAction<{uid:string,isEdit:boolean}>) => {
            const {uid, isEdit} = action.payload;
            if(state.windows[uid] !== undefined) {
                state.windows[uid].isEditMode = isEdit;
                if(isEdit === true)
                {
                    let selectedWindow = state.windows[uid];
                    [...Object.entries(state.windows)].forEach(([id,window]) => {
                        if(window.zOrder > selectedWindow.zOrder){
                            window.zOrder = window.zOrder-1;
                        }
                    })
                    const topIndex = state.windowsCount -1 + state.editModeZIndex;
                    if(selectedWindow.zOrder !== topIndex)
                    {
                        let diffToTop = topIndex-selectedWindow.zOrder;
                        selectedWindow.zOrder = selectedWindow.zOrder + diffToTop;
                    }
                    
                }
            }
            else{
                throw new Error("Invalid window uid");
            }
        },
        setHiddenState: (state, action:PayloadAction<{uid:string,isHidden:boolean}>) => {
            const {uid, isHidden} = action.payload;
            if(state.windows[uid] !== undefined) {
                state.windows[uid].isHidden = isHidden;
            }
            else{
                throw new Error("Invalid window uid");
            }
        },
        setWindowPos: (state, action:PayloadAction<{uid:string, pos:[number,number]}>) => {
            let {uid,pos} = action.payload;
            if(state.windows[uid])
            state.windows[uid].pos = pos;
        },
        setWindowAnchor: (state, action:PayloadAction<{uid:string, anchor:[number,number]}>) => {
            const {uid,anchor} = action.payload;
            state.windows[uid].anchor = anchor;
        },
        setWindowSize: (state, action:PayloadAction<{uid:string, size:[number,number]}>) => {
            let {uid,size} = action.payload;
            state.windows[uid].size = size;
        }
    }
}) 

export const {
    addWindow,
    removeWindow,
    setEditMode,
    setHiddenState,
    setWindowAccess,
    setWindowPos,
    setWindowSize,
    setWindowAnchor
} = windowMgrSlice.actions;

export const selectWindowMgr = (state: RootState) => state.windowMgr
export const selectWindowSize = (state: RootState, id:string) => state.windowMgr.windows[id]? state.windowMgr.windows[id].size : [-1,-1];
export const selectWindowXY =  (state: RootState, id:string) => state.windowMgr.windows[id]? state.windowMgr.windows[id].pos : [-1,-1];
export const selectWindowAnchor = (state: RootState, id:string) => state.windowMgr.windows[id]? state.windowMgr.windows[id].anchor : [0,0];  
export default windowMgrSlice.reducer