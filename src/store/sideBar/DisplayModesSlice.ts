import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getDisplayModes, setDisplayMode} from "../../backend/viewerAPIProxy";
import {selectCheckedLeafNodes} from "../sideBar/ProductTreeSlice"
import {toastMsg} from "../toastSlice";
import type { RootState } from '../index';
// Define a type for the slice state
interface DisplayModesState {
    displayModesData: any[],
}
export enum DownloadStates {
    DOWNLOADED,
    IN_PROGRESS,
    NOT_DOWNLOADED,
    NO_DATA_AVAILABLE
}
interface IDisplayMenuItem{
    displayId:string,
    title: string,
    selected: boolean,
    size: number,
    status: DownloadStates
}
// Define the initial state using that type
const initialState: DisplayModesState = {
    displayModesData: [ {
        id: "Display Modes",
        icon: "ExpandMoreIcon",
        expanded: true,
        menuData: []
      },]
}

export const fetchDisplayModes = createAsyncThunk(
  "displayModes/fetchDisplayModes",
  async (data,{dispatch, getState}) => {
    let root = getState() as RootState;
    const viewerId = root.app.viewers[root.app.activeViewer || ""];
    const nodeIds = selectCheckedLeafNodes(root).map(node => node.id);
    let result = await getDisplayModes(viewerId,nodeIds);
    let menuData:IDisplayMenuItem[] = []
    result.forEach((item:any) => {
      if(item.displayOrder !== 0)
      menuData.push(
        {
          displayId: item.id,
          title: item.displayName,
          selected: false,
          size: item.downloadMetricValue,
          status: item.isDataAvailable ? DownloadStates.DOWNLOADED : DownloadStates.NOT_DOWNLOADED
        } as IDisplayMenuItem
      )
    })
    dispatch(displayModesSlice.actions.setMenuData({panelId:0,menuData}));
  }
)

export const setDisplayModeAsync = createAsyncThunk(
  "displayModes/setDisplayModeAsync",
  async (data:{menuId:number}, {dispatch,getState}) => {
    let root = getState() as RootState;
    const viewerId = root.app.viewers[root.app.activeViewer || ""];
    const nodeIds = selectCheckedLeafNodes(root).map(node => node.id);
    const item = root.displayModes.displayModesData[0].menuData[data.menuId];
    let res = await setDisplayMode(viewerId,item.displayId,nodeIds);
    if(res === "SUCCESS")
    {
      dispatch(setDownloadStatus({panelId:0,menuId: data.menuId,status:DownloadStates.DOWNLOADED}));
      dispatch(fetchDisplayModes());
      dispatch(toastMsg({msg:"Display Mode changed"}));
    }
    
  } 
)

export const displayModesSlice = createSlice({
  name: 'displayModes',
  initialState,
  reducers: {
      expandPanel: (state, action:PayloadAction<{panelId:number,value:boolean}>) => {
        let selectedPanel = state.displayModesData[action.payload.panelId];
        selectedPanel.expanded = action.payload.value;
      },
      setMenuData: (state, action:PayloadAction<{panelId:number, menuData: any[]}>) => {
        let selectedPanel = state.displayModesData[action.payload.panelId];
        selectedPanel.menuData = action.payload.menuData;
      },
      setSelectedMenu: (state, action:PayloadAction<{panelId:number,menuId:number,value:boolean}>) => {
         let selectedMenu = state.displayModesData[action.payload.panelId].menuData[action.payload.menuId];
         selectedMenu.selected = action.payload.value;
      },
      setDownloadStatus: (state, action:PayloadAction<{panelId:number,menuId:number,status:DownloadStates}>) => {
         let selectedMenu = state.displayModesData[action.payload.panelId].menuData[action.payload.menuId];
         selectedMenu.status = action.payload.status;
      }
  },
})

//Define the Reducers
export const { 
    expandPanel,
    setSelectedMenu,
    setDownloadStatus
} = displayModesSlice.actions;

//Define the selectors
export const selectDisplayModesData = (state:RootState) => state.displayModes.displayModesData;

export default displayModesSlice.reducer;