import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export type WindowState = {
    id:string,
    zOrder: number,
    isEditMode: boolean,
    isHidden: boolean
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
            state.windows[uid] = {id:uid, isEditMode: false, isHidden: false, zOrder: state.windowsCount} as WindowState
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
        }
    }
}) 

export const {
    addWindow,
    removeWindow,
    setEditMode,
    setHiddenState,
    setWindowAccess
} = windowMgrSlice.actions;

export const selectWindowMgr = (state: RootState) => state.windowMgr
export default windowMgrSlice.reducer