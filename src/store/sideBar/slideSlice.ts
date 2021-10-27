import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {TreeNode, ITreeState} from "./shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "./shared/ProductExplorer/reducers";
// Define a type for the slice state

interface ProductTreeState extends ITreeState {
    data: {[id:string]:TreeNode},
    rootIds: string[],
}

// Define the initial state using that type
const initialState: ProductTreeState = {
    data: {
        "0" : {
            id : "0",
                pid : "-1",
                title: "Presentation 1",
                children: ["2","3"],
                state: {
                    expanded: true,
                    visibility: true,
                },
                attributes: {},
        },
    },
    rootIds: [],
}


export const productTreeSlice = createSlice({
  name: 'productTree',
  initialState,
  reducers: {
    saveTree: saveTreeReducer,
    checkNode: checkNodeReducer,
    highlightNode: highlightNodeReducer,
    invertNode: invertNodeReducer,
    expandNode: expandNodeReducer,
    toggleVisibility: toggleVisibilityReducer,
    setCheckedVisibility: setCheckedVisibilityReducer,
   
  }
});

//Define the Reducers
export const { 
  saveTree, 
  checkNode, 
  invertNode, 
  expandNode,
   } = productTreeSlice.actions;

//Define the selectors
export const selectProductTreeData = (state:RootState) => state.productTree.data
export const selectModels = (state:RootState) => state.productTree.rootIds.map((id) => state.productTree.data[id]);
export const selectCurrentState = (state:RootState) => state.productTree.currentState
export const selectRootIds = (state:RootState) => state.productTree.rootIds
export const selectSearchHints = (state:RootState) => Object.keys(state.productTree.searchHints)
export const selectPrevSearches = (state:RootState) => Object.keys(state.productTree.prevSearches)
export const selectSearchString = (state:RootState) => state.productTree.searchQuery
export const selectSearchResults = (state:RootState) => state.productTree.searchResults
export const selectCheckedLeafNodes = (state:RootState):TreeNode[] => {
  let nodes = [...Object.values(state.productTree.data)] as TreeNode[];
  return nodes.filter((item: TreeNode) => item.children.length === 0 && item.state.checked);
}
export const selectUnCheckedLeafNodes = (state:RootState):TreeNode[] => {
  let nodes = [...Object.values(state.productTree.data)] as TreeNode[];
  return nodes.filter((item: TreeNode) => item.children.length === 0 && item.state.checked === false);
}
export default productTreeSlice.reducer;