import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {TreeNode, ITreeState} from "./shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "./shared/ProductExplorer/reducers";
// Define a type for the slice state

interface SlideTreeNode extends TreeNode {
    downloaded : boolean,
    cameraView?:string,
    position?: string,
    image?: string,
}

interface SlideTreeState extends ITreeState {
    data: {[id:string]:SlideTreeNode},
    rootIds: string[],
    appliedSlide: string,
    selectedSlide: string,
    
    idGenerator: number,
    currentData: SlideTreeNode,

    stepCount : number,
    viewCount : number,
    groupCount : number,

}

// Define the initial state using that type
const initialState: SlideTreeState = {
    data: {
        "0" : {
            id : "0",
                pid : "-1",
                title: "Presentation 1",
                children: ["3","4","5","6","7","8"],
                state: {
                    expanded: true,
                    visibility: true,
                },
                downloaded: false,
                attributes: {},
        },

      "3" : {
            id : "3",
                pid : "0",
                title: "Stress Animation",
                children: ["9","10","11","12","13"],
                state: {
                    expanded: true,
                    visibility: true,
                },
                downloaded: false,
                attributes: {},
        },

        "9" : {
          id : "9",
              pid : "3",
              title: "Step 1",
              children: [],
              state: {
                  expanded: true,
                  visibility: true,
              },
              downloaded:false,
              attributes: {},
      },

      "10" : {
        id : "10",
            pid : "3",
            title: "Step 2",
            children: [],
            state: {
                expanded: true,
                visibility: true,
            },
            downloaded: true,
            attributes: {},
    },

    "11" : {
      id : "11",
          pid : "3",
          title: "Step 3",
          children: [],
          state: {
              expanded: true,
              visibility: true,
          },
          downloaded: false,
          attributes: {},
  },

  "12" : {
    id : "12",
        pid : "3",
        title: "Step 4",
        children: [],
        state: {
            expanded: true,
            visibility: true,
        },
        downloaded:false,
        attributes: {},
},

"13" : {
  id : "13",
      pid : "3",
      title: "Step 5",
      children: [],
      state: {
          expanded: true,
          visibility: true,
      },
      downloaded: true,
      attributes: {},
},




        "4" : {
          id : "4",
              pid : "0",
              title: "Reaction Force",
              children: [],
              state: {
                  expanded: true,
                  visibility: true,
              },
              downloaded: true,
              attributes: {},
      },

      "5" : {
        id : "5",
            pid : "0",
            title: "Applied Loads",
            children: [],
            state: {
                expanded: true,
                visibility: true,
            },
            downloaded: false,
            attributes: {},
    },

    "6" : {
      id : "6",
          pid : "0",
          title: "Displacement",
          children: [],
          state: {
              expanded: true,
              visibility: true,
          },
          downloaded:true,
          attributes: {},
  },

  "7" : {
    id : "7",
        pid : "0",
        title: "View 1",
        children: [],
        state: {
            expanded: true,
            visibility: true,
        },
        downloaded: true,
        attributes: {},
},

"8" : {
  id : "8",
      pid : "0",
      title: "View 2",
      children: [],
      state: {
          expanded: true,
          visibility: true,
      },
      downloaded: false,
      attributes: {},
},

        "1" : {
          id : "1",
              pid : "-1",
              title: "Group 1",
              children: [],
              state: {
                  expanded: true,
                  visibility: true,
              },
              downloaded: false,
              attributes: {},
      },

      "2" : {
        id : "2",
            pid : "-1",
            title: "Group 2",
            children: [],
            state: {
                expanded: true,
                visibility: true,
            },
            downloaded:false,
            attributes: {},
    },
    },
    rootIds: ["0","1","2"],
    appliedSlide : "8",
    selectedSlide : "6",

    idGenerator: 13,

    currentData: {
        id:"-1",
        title:"newOne",
        pid:"-1",
        children: [],
                state: {
                    expanded: true,
                    visibility: true,
                },
                downloaded: false,
                attributes: {},

    },

    stepCount : 5,
    viewCount : 2,
    groupCount : 2,
}


export const slideSlice = createSlice({
  name: 'slide',
  initialState,
  reducers: {
    saveTree: saveTreeReducer,
    checkNode: checkNodeReducer,
    highlightNode: highlightNodeReducer,
    invertNode: invertNodeReducer,
    expandNode: expandNodeReducer,
    toggleVisibility: toggleVisibilityReducer,
    setCheckedVisibility: setCheckedVisibilityReducer,
   
    setSlideSelection: (state, action: PayloadAction<string>) => {

        if(state.selectedSlide === action.payload)
            state.selectedSlide = "-1";
        else 
        state.selectedSlide = action.payload;
    }, 

    createNode : (state, action :PayloadAction<string>) => {
        state.idGenerator++;

        let newData = JSON.parse(JSON.stringify(state.currentData))

        newData.id = state.idGenerator;
        newData.pid = action.payload;

        switch(action.payload){
            case "-1":
                state.groupCount ++;
                newData.title =  `Group ${state.groupCount}`;
                state.data[`${state.idGenerator}`] =newData;
                state.rootIds.push(newData.id)
            break;

            case "3":
                state.stepCount ++;
                newData.title =  `Step ${state.stepCount}`;
                state.data[`${state.idGenerator}`] =newData;
                state.data[`${action.payload}`].children.push(newData.id)
            break;

            default:
                state.viewCount ++;
                newData.title =  `View ${state.viewCount}`;
                state.data[`${state.idGenerator}`] =newData;
                state.data[`${action.payload}`].children.push(newData.id)
            break;
        }
        
    },

    applyView: (state, action : PayloadAction<string>) => {
        state.appliedSlide = action.payload;
        state.data[ action.payload].downloaded = true;
    },

  }
});

//Define the Reducers
export const { 
  saveTree, 
  checkNode, 
  invertNode, 
  expandNode,
  setSlideSelection,
  createNode,
  applyView,
   } = slideSlice.actions;

//Define the selectors
export const selectSlideData = (state:RootState) => state.slide.data
export const selectRootIds = (state:RootState) => state.slide.rootIds

export default slideSlice.reducer;