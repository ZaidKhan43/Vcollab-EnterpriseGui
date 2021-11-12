import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {TreeNode, ITreeState} from "./shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "./shared/ProductExplorer/reducers";
import {setPartVisibility, setHighlightedNodes, fitView, getSearchHints} from "../../backend/viewerAPIProxy";
import {traverseNode} from "./shared/ProductExplorer/helpers"
// Define a type for the slice state


export enum ProductTreeStates {
  Tree,
  Search,
  DisplayModes
}

interface ProductTreeState extends ITreeState {
    data: {[id:string]:TreeNode},
    rootIds: string[],
    currentState: ProductTreeStates,
    searchHints: {[id:string]:any},
    prevSearches: {[id:string]:any},
    searchQuery: string,
    searchResults: any[]
}

// Define the initial state using that type
const initialState: ProductTreeState = {
    data: {},
    rootIds: [],
    currentState: ProductTreeStates.Tree,
    searchHints: {},
    prevSearches: {},
    searchQuery: '',
    searchResults: []
}



export const toggleVisibilityAsync = createAsyncThunk(
  'productTree/toggleVisibilityAsync',
  async (data:any,{dispatch, getState}) => {
     let {toShow, nodeId} = data;
     const rootState = getState() as RootState;
     let leafNodesId:string[] = [];
     traverseNode(nodeId,rootState.productTree,(node) => {
        if(node.children.length === 0)
        leafNodesId.push(node.id);
     });
     const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     let result = "";
     if(viewerId)
     result =  await setPartVisibility(viewerId,leafNodesId,toShow)
     if(result === 'SUCCESS'){
       return Promise.resolve(data);
     }
     else{
       return Promise.reject();
     }
  }
)

export const invertVisibilityAsync = createAsyncThunk(
  'productTree/invertVisibilityAsync',
  async (data,{dispatch, getState}) => {
    const rootState = getState() as RootState;
     let checkedNodes:TreeNode[] = selectCheckedLeafNodes(rootState);
     let visibleNodeIds:string[] = [];
     let visibleNodePids:string[] = [];
     let invisibleNodeIds:string[] = [];
     let invisibleNodePids:string[] = [];

     let pid:string | null = null;
     checkedNodes.forEach((node:TreeNode) => {
        if(node.pid && node.pid !== pid)
        {
          node.state.visibility ? visibleNodePids.push(node.pid) : invisibleNodePids.push(node.pid);
          pid = node.pid;
        }
        node.state.visibility ? visibleNodeIds.push(node.id) : invisibleNodeIds.push(node.id);
     });
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     
    let result = '';
    if(visibleNodeIds.length > 0) 
    result = await setPartVisibility(viewerId,visibleNodeIds,false);
    if(invisibleNodeIds.length > 0)
    result = await setPartVisibility(viewerId,invisibleNodeIds,true);
    if(result === 'SUCCESS'){
      return Promise.resolve({visibleNodeIds,visibleNodePids,invisibleNodeIds,invisibleNodePids});
    }
    else{
      return Promise.reject();
    }
 }
)

export const setCheckedNodesAsync = createAsyncThunk(
  'productTree/setCheckedNodesAsync',
  async (data:{toCheck: boolean, nodeId:string},
         {dispatch, getState}) => {
    const rootState = getState() as RootState;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    let leafNodesId:string[] = [];
    traverseNode(data.nodeId,rootState.productTree,(node) => {
       if(node.children.length == 0)
       leafNodesId.push(node.id);
    });
    let result = setHighlightedNodes(viewerId,data.toCheck, leafNodesId);
    if(result === 'SUCCESS'){
      dispatch(productTreeSlice.actions.checkNode({...data}))
      return Promise.resolve();
    }
    else{
      return Promise.reject();
    }
  }
)

export const handleHighlightAsync = createAsyncThunk(
  'productTree/handleHighlightAsync',
  (data:{nodeIds:string[], toHighlight:boolean},{dispatch,getState}) => {
    const treeData = (getState() as RootState).productTree;
    const {nodeIds,toHighlight} = data;
    if(nodeIds.length > 0)
    {
      nodeIds.forEach((nodeId:string) => {
        dispatch(setHightLightedNodesAsync({toHighlight, nodeId }))
      })
    }
    else{
      let rootIds = treeData.rootIds;
      dispatch(setHightLightedNodesAsync({toHighlight,nodeId:rootIds[0]}))
    }
  }
)
export const setHightLightedNodesAsync = createAsyncThunk(
  'productTree/setHighLightedNodesAsync',
  async (data:{toHighlight: boolean, nodeId:string},
         {dispatch, getState}) => {
    const rootState = getState() as RootState;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    let leafNodesId:string[] = [];
    traverseNode(data.nodeId,rootState.productTree,(node) => {
       if(node.children.length === 0)
       leafNodesId.push(node.id);
    });
    let result:string = setHighlightedNodes(viewerId,data.toHighlight, leafNodesId);
    
    if(result === 'SUCCESS'){
      //dispatch(productTreeSlice.actions.highlightNode({...data}))
      dispatch(productTreeSlice.actions.checkNode({toCheck:data.toHighlight,nodeId:data.nodeId}));
      return Promise.resolve();
    }
    else{
      return Promise.reject();
    }
  }
)

export const setCheckedVisibilityAsync = createAsyncThunk(
  'productTree/setCheckedVisibilityAsync',
  async (data:any,{dispatch, getState}) => {
     let {toShow} = data;
     const rootState = getState() as RootState;
     let checkedNodes:TreeNode[] = selectCheckedLeafNodes(rootState);
     let uniqueParentIds:string[] = [];
     let checkedNodesId:string[] = [];
     let pid:string | null = null;
     checkedNodes.forEach((node:TreeNode) => {
        if(node.pid && node.pid !== pid)
        {
          uniqueParentIds.push(node.pid);
          pid = node.pid;
        }
        checkedNodesId.push(node.id);
     });
     const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     let result = "";
     if(viewerId)
     result =  await setPartVisibility(viewerId,checkedNodesId,toShow)
     if(result === 'SUCCESS'){
       return Promise.resolve({toShow,pids:uniqueParentIds,leafIds:checkedNodesId});
     }
     else{
       return Promise.reject();
     }
  }
)

export const fetchSearchHints = createAsyncThunk(
  "productTree/fetchSearchHints",
  async (data,{dispatch,getState}) => {
     
     const rootState = getState() as RootState;
     const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     let result:any[] = [];
     if(viewerId)
     result =  await getSearchHints(viewerId);
     if(result instanceof Array){
       return Promise.resolve(result);
     }
     else{
       return Promise.reject();
     }
  }
)
export const removeSearchHint = createAsyncThunk(
  "productTree/removeSearchHint",
  async (data:{data:string},{dispatch,getState}) => {
     return data
  }
)

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
    groupSelectedNodes: (state, action:PayloadAction<{tagName:string}>) => {
       let {tagName} = action.payload; 
       [...Object.values(state.data)].forEach((node:any) => {
          if(node.state.checked && (node.children.length === 0))
          {
            if(node.attributes.tags) {
              if(node.attributes.tags.indexOf(tagName) < 0)
              node.attributes.tags.push(tagName);
            }
            else{
              node['attributes'] = {tags: [tagName]};
            }
          }
        })
    },
    focusSelectedNodes: (state, action:PayloadAction<{viewerId:string}>) => {
      let nodes = [...Object.values(state.data)] as TreeNode[];
      let checkedLeavesId = nodes.filter((item: TreeNode) => item.children.length === 0 && item.state.checked).map((item) => item.id);
      fitView(action.payload.viewerId,checkedLeavesId);
    },
    setProductTreeState: (state, action:PayloadAction<{data:ProductTreeStates}>) => {
      state.currentState = action.payload.data;
    },
    updatePrevSearches: (state, action:PayloadAction<string>) => {
      const query = action.payload;
      if(!state.prevSearches[query] && query !== ''){
        state.prevSearches[query] = Object.keys(state.prevSearches).length;
      }
    },
    setSearchString: (state, action:PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action:PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(toggleVisibilityAsync.fulfilled, (state,{payload}) => {
        productTreeSlice.caseReducers.toggleVisibility(state,{payload,type:"{toShow:boolean;nodeId:string}"})
    });
    builder.addCase(setCheckedVisibilityAsync.fulfilled, (state,{payload}) => {
        productTreeSlice.caseReducers.setCheckedVisibility(state,{payload,type:"{toShow:boolean}"})
    });
    builder.addCase(invertVisibilityAsync.fulfilled, (state,{payload}) => {
      let {visibleNodeIds, visibleNodePids, invisibleNodeIds, invisibleNodePids} = payload;
      let type = "{toShow:boolean, pids:string[], leafIds:string[]}";
      let outGoing = {
        toShow: false,
        pids: visibleNodePids,
        leafIds: visibleNodeIds
      }
      productTreeSlice.caseReducers.setCheckedVisibility(state,{payload:outGoing,type})
      outGoing = {
        toShow: true,
        pids: invisibleNodePids,
        leafIds: invisibleNodeIds
      }
      productTreeSlice.caseReducers.setCheckedVisibility(state,{payload:outGoing,type})

    });
    builder.addCase(fetchSearchHints.fulfilled, (state,{payload}) => {
        payload.forEach((e,idx) => {
          state.searchHints[e['code']] = idx
        })
    });
    builder.addCase(removeSearchHint.fulfilled, (state,{payload}) => {
        let key = payload.data;
        if(state.prevSearches[key] !== undefined) {
          delete state.prevSearches[key]
        }
        if(state.searchHints[key] !== undefined) {
          delete state.searchHints[key]
        }
    });
  }
});

//Define the Reducers
export const { 
  saveTree, 
  checkNode, 
  invertNode, 
  expandNode,
  groupSelectedNodes, 
  focusSelectedNodes,
  setProductTreeState,
  setSearchString,
  setSearchResults,
  updatePrevSearches } = productTreeSlice.actions;

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