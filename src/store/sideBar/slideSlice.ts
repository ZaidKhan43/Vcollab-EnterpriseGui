import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {TreeNode, ITreeState} from "./shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "./shared/ProductExplorer/reducers";
// Define a type for the slice state

interface SlideTreeNode extends TreeNode {
    downloaded : boolean,
}

interface SlideTreeState extends ITreeState {
    data: {[id:string]:SlideTreeNode},
    rootIds: string[],
    appliedSlide: string,
    selectedSlide: string,
}

// Define the initial state using that type
const initialState: SlideTreeState = {
    data: {
        "0" : {
            id : "0",
                pid : "-1",
                title: "Presentation 1",
                children: ["01","02","03","04","05","06"],
                state: {
                    expanded: true,
                    visibility: true,
                },
                downloaded: false,
                attributes: {},
        },

      "01" : {
            id : "01",
                pid : "0",
                title: "Stress Animation",
                children: ["011","012","013","014","015"],
                state: {
                    expanded: true,
                    visibility: true,
                },
                downloaded: false,
                attributes: {},
        },

        "011" : {
          id : "011",
              pid : "01",
              title: "Step 1",
              children: [],
              state: {
                  expanded: true,
                  visibility: true,
              },
              downloaded:false,
              attributes: {},
      },

      "012" : {
        id : "012",
            pid : "01",
            title: "Step 2",
            children: [],
            state: {
                expanded: true,
                visibility: true,
            },
            downloaded: true,
            attributes: {},
    },

    "013" : {
      id : "013",
          pid : "01",
          title: "Step 3",
          children: [],
          state: {
              expanded: true,
              visibility: true,
          },
          downloaded: false,
          attributes: {},
  },

  "014" : {
    id : "014",
        pid : "01",
        title: "Step 4",
        children: [],
        state: {
            expanded: true,
            visibility: true,
        },
        downloaded:false,
        attributes: {},
},

"015" : {
  id : "015",
      pid : "01",
      title: "Step 5",
      children: [],
      state: {
          expanded: true,
          visibility: true,
      },
      downloaded: true,
      attributes: {},
},




        "02" : {
          id : "02",
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

      "03" : {
        id : "03",
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

    "04" : {
      id : "04",
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

  "05" : {
    id : "05",
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

"06" : {
  id : "06",
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
    appliedSlide : "012",
    selectedSlide : "014",
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
  }
});

//Define the Reducers
export const { 
  saveTree, 
  checkNode, 
  invertNode, 
  expandNode,
  setSlideSelection,
   } = slideSlice.actions;

//Define the selectors
export const selectSlideData = (state:RootState) => state.slide.data
export const selectRootIds = (state:RootState) => state.slide.rootIds

export default slideSlice.reducer;