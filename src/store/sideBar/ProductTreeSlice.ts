import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {setPartVisibility, setHighlightedNodes, fitView, getSearchHints} from "../../backend/viewerAPIProxy"
// Define a type for the slice state
export type TreeNode = {
  id:string,
  pid:string|null,
  title:string,
  children:string[],
  state:any,
  attributes:any
}
type ProductTreeState = {
    data: any,
    rootIds: string[],
    searchHints: any[],
    prevSearches: any,
    searchQuery: string
}

// Define the initial state using that type
const initialState: ProductTreeState = {
    data: {},
    rootIds: [],
    searchHints: [],
    prevSearches: {},
    searchQuery: ''
}

const getNode = (id:string, state:ProductTreeState):TreeNode|undefined => {
    return state.data[id];
}

const traverseNode = (rootNodeId:string, state:ProductTreeState, callback:(node:TreeNode)=>void) => {
    let node = getNode(rootNodeId,state);
    if(node) {
      callback(node);
      if(node.children.length > 0) {
        node.children.forEach(nodeId => {
          traverseNode(nodeId,state,callback);
        })
      }
    }
    
}

const getCheckedChildCount = (nodes:TreeNode[]) => {
    let checkedCount = 0;
    let partialCount = 0;
    nodes.forEach(node => {
      if(node.state.checked){
        checkedCount++;
      }
      if(node.state.partiallyChecked){
        partialCount++;
      }
    });
    return [checkedCount,partialCount];
}
const getHiddenChildCount =(nodes:any[]) => {
  let hiddenCount =0;
  nodes.forEach(node => {
    if(node.state.visibility){
      hiddenCount++;
    }
  });
  return hiddenCount;
}
const updateVisiblityState = (parent:any,state:ProductTreeState) =>{
  let hide= getHiddenChildCount(parent.children.map((c:any) => getNode(c,state)));
      if(hide === 0 && parent.children.length >0){
        parent.state.visibility =false;
      }
      else{
        parent.state.visibility =true;
      }
}
const updateCheckedState = (parent:any,state:ProductTreeState) => {
  let [checkedCount,partialCount] = getCheckedChildCount(parent.children.map((c:any) => getNode(c,state))); 
  if(checkedCount === parent.children.length){
    parent.state.checked = true;
    parent.state.partiallyChecked = partialCount > 0 ? true: false;
  }
  else if(checkedCount === 0){
    parent.state.checked = false;
    parent.state.partiallyChecked = false;
  }
  else{
    parent.state.checked = true;
    parent.state.partiallyChecked = true;
  }
}
const updateParent = (node:TreeNode, state:ProductTreeState) => {
    let parent = node.pid ? getParent(node.pid,state): null;
    if(parent){
      updateCheckedState(parent,state);
      updateVisiblityState(parent,state);
      let grandParent = parent.pid ? getParent(parent.pid,state): null;
      if(grandParent !== null && grandParent !== undefined){
          updateParent(parent, state);
      }
    }
}
const getParent = (id:string,state:ProductTreeState):TreeNode|undefined => {
  return state.data[id];
}

const _checkNode = (toCheck:boolean, node:TreeNode, checkChildren:boolean,state:ProductTreeState) => {
    node.state.checked = toCheck;
    node.state.partiallyChecked = false;
    if(checkChildren === true && node.children) {
      node.children.map((c:string) => getNode(c,state)).forEach((node:TreeNode|undefined) => node ? _checkNode(toCheck,node,true,state) : null);
    }
}
const _hightlightNode = (toHighlight:boolean, node:TreeNode, checkChildren:boolean,state:ProductTreeState) => {
  node.state.highlighted = toHighlight;
  if(checkChildren === true && node.children) {
    node.children.map((c:string) => getNode(c,state)).forEach((node:TreeNode|undefined) => node ? _hightlightNode(toHighlight,node,true,state) : null);
  }
}
const RcheckNode = (toCheck:boolean,node:TreeNode, state:ProductTreeState) => {

    _checkNode(toCheck,node,true, state);
    updateParent(node, state);
}
const RHighlightNode = (toHighlight:boolean, node:TreeNode, state:ProductTreeState) => {
    _hightlightNode(toHighlight,node,true,state);
    updateParent(node,state);
}
const RinvertNode = (node:TreeNode, state:ProductTreeState) => {
  
  if(node.children.length > 0)
  {
    node.children.map((c:string) => getNode(c,state)).forEach((e:any) => {
      RinvertNode(e,state);
    });
    const firstNodeId = node.children[0] as string;
    const firstNode = getNode(firstNodeId,state) as TreeNode;
    updateParent(firstNode,state);
  }
  else{
    _checkNode(!node.state.checked,node,true,state);
  }
}
const setVisibility = (value:boolean,node:TreeNode,checkChildren:boolean,state:ProductTreeState) => {
    node.state.visibility = value;
    if(node.children.length > 0 && checkChildren === true){
    
      node.children.map((c:string) => getNode(c,state)).forEach((e:TreeNode | undefined) => e ? setVisibility(value,e,true,state) : null)
    }
}
const RtoggleVisibility = (toShow:boolean, node:TreeNode,state:ProductTreeState) => {
  setVisibility(toShow,node,true,state);
  updateParent(node,state);
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
    // const rootState = getState() as RootState;
    // const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    // let leafNodesId:string[] = [];
    // traverseNode(data.nodeId,rootState.productTree,(node) => {
    //    if(node.children.length == 0)
    //    leafNodesId.push(node.id);
    // });
    // let result = setHighlightedNodes(viewerId,data.toCheck, leafNodesId);
    let result = 'SUCCESS';
    if(result === 'SUCCESS'){
      dispatch(productTreeSlice.actions.checkNode({...data}))
      return Promise.resolve();
    }
    else{
      return Promise.reject();
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
      dispatch(productTreeSlice.actions.highlightNode({...data}))
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

export const productTreeSlice = createSlice({
  name: 'productTree',
  initialState,
  reducers: {
    saveTree : (state, action : PayloadAction<{tree:Map<string,TreeNode>,rootIds:string[]}>) => {
        state.data = action.payload.tree;
        state.rootIds = action.payload.rootIds;
    },
    checkNode : (state, action : PayloadAction<{toCheck:boolean,nodeId:string}>) => {
        const {toCheck,nodeId} = action.payload;
        let node = getNode(nodeId,state);
        if(node)
        RcheckNode(toCheck, node, state)
    },
    highlightNode : (state, action : PayloadAction<{toHighlight:boolean,nodeId:string}>) => {
      const {toHighlight,nodeId} = action.payload;
      let node = getNode(nodeId,state);
      if(node)
      RHighlightNode(toHighlight, node, state)
    },
    invertNode : (state, action : PayloadAction<{nodeId:string}>) => {
        const {nodeId} = action.payload;
        let node = getNode(nodeId,state);
        if(node)
        RinvertNode(node,state);
    },
    expandNode : (state, action: PayloadAction<{toOpen:boolean, nodeId:string}>) => {
        const {toOpen,nodeId} = action.payload;
        let node = state.data[nodeId];
        if(node){
          node.state.expanded = toOpen;
        }
    },
    toggleVisibility : (state, action : PayloadAction<{toShow:boolean,nodeId:string}>) => {
        const {toShow,nodeId} = action.payload;
        let node = getNode(nodeId,state);
        if(node)
        RtoggleVisibility(toShow,node,state);
    },
    setCheckedVisibility: (state, action:PayloadAction<{toShow:boolean,pids:string[],leafIds:string[]}>) => {
        const {toShow,pids,leafIds} = action.payload;
        leafIds.forEach((nodeId:string) => {
          let node = getNode(nodeId,state);
          if(node && node.children.length === 0)
          {
            setVisibility(toShow,node,true,state);
          }
      });
        pids.forEach((pid:string) => {
          let node = getNode(pid,state);
          let firstChild = node? getNode(node.children[0],state) : null;
          if(firstChild && firstChild.children.length >= 0)
          {
            updateParent(firstChild,state);
          }
        })
    },
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
    updatePrevSearches: (state) => {
      if(!state.prevSearches[state.searchQuery] && state.searchQuery !== ''){
        state.prevSearches[state.searchQuery] = Object.keys(state.prevSearches).length;
      }
    },
    saveSearchQuery : (state, action: PayloadAction<{data:string}>)=> {
        state.searchQuery = action.payload.data;
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
        state.searchHints = payload;
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
  saveSearchQuery, 
  updatePrevSearches } = productTreeSlice.actions;

//Define the selectors
export const selectProductTreeData = (state:RootState) => state.productTree.data
export const selectRootIds = (state:RootState) => state.productTree.rootIds
export const selectSearchHints = (state:RootState) => state.productTree.searchHints
export const selectPrevSearches = (state:RootState) => Object.keys(state.productTree.prevSearches)
export const selectCheckedLeafNodes = (state:RootState):TreeNode[] => {
  let nodes = [...Object.values(state.productTree.data)] as TreeNode[];
  return nodes.filter((item: TreeNode) => item.children.length === 0 && item.state.checked);
}

export default productTreeSlice.reducer;