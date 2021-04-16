import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
// Define a type for the slice state
interface DisplayModesState {
    displayModesData: any[],
}
export enum DownloadStates {
    DOWNLOADED,
    IN_PROGRESS,
    NOT_DOWNLOADED
}
// Define the initial state using that type
const initialState: DisplayModesState = {
    displayModesData: [ {
        id: "Display Modes",
        icon: "ExpandMoreIcon",
        expanded: true,
        menuData: [
          { 
            title: "Bounding Box",
            selected: false,
            size: 0,
            status: DownloadStates.NOT_DOWNLOADED, 
          },
          {
            title: "Point",
            selected: false,
            size: 10,
            status: DownloadStates.NOT_DOWNLOADED,
          },
          {
            title: "Wireframe",
            selected: false,
            size: 100,
            status: DownloadStates.NOT_DOWNLOADED,
          },
          {
            title: "Hidden Line",
            selected: false,
            size: 1000,
            status: DownloadStates.NOT_DOWNLOADED,
          },
          { 
            title: "Shaded", 
            selected: false,
            size: 10000,
            status: DownloadStates.NOT_DOWNLOADED,
          },
          {
            title: "Shaded Mesh",
            selected: false,
            size: 100000,
            status: DownloadStates.NOT_DOWNLOADED,
          },
          {
            title: "Transparent",
            selected: false,
            size: 1000000,
            status: DownloadStates.NOT_DOWNLOADED,
          },
        ],
      },]
}

export const displayModesSlice = createSlice({
  name: 'displayModes',
  initialState,
  reducers: {
      expandPanel: (state, action:PayloadAction<{panelId:number,value:boolean}>) => {
        let selectedPanel = state.displayModesData[action.payload.panelId];
        selectedPanel.expanded = action.payload.value;
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
});

//Define the Reducers
export const { 
    expandPanel,
    setSelectedMenu,
    setDownloadStatus
} = displayModesSlice.actions;

//Define the selectors
export const selectDisplayModesData = (state:RootState) => state.displayModes.displayModesData;

export default displayModesSlice.reducer;