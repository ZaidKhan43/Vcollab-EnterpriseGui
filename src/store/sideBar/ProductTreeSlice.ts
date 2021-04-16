import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
// Define a type for the slice state
export interface TreeNode{
  id:string,
  pid:string|null,
  title:string,
  children:string[],
  state:any,
  attributes:any
}
interface ProductTreeState {
    data: any,
    rootIds: string[],
    prevSearches: any,
    searchQuery: string
}

// Define the initial state using that type
const initialState: ProductTreeState = {
    data: {},
    rootIds: [],
    prevSearches: {},
    searchQuery: ''
}

const getNode = (id:string, state:ProductTreeState):TreeNode|undefined => {
    return state.data[id];
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
    if(checkChildren == true && node.children) {
      node.children.map((c:string) => getNode(c,state)).forEach((node:TreeNode|undefined) => node ? _checkNode(toCheck,node,true,state) : null);
    }
}
const RcheckNode = (toCheck:boolean,node:TreeNode, state:ProductTreeState) => {

    _checkNode(toCheck,node,true, state);
    updateParent(node, state);
}
const RinvertNode = (node:TreeNode, state:ProductTreeState) => {
  
  if(node.children.length > 0)
  {
    node.children.map((c:string) => getNode(c,state)).forEach((e:any) => {
      RinvertNode(e,state);
    });
  }
  else{
    RcheckNode(!node.state.checked,node,state);
  }
}
const setVisibility = (value:boolean,node:TreeNode,checkChildren:boolean,state:ProductTreeState) => {
    node.state.visibility = value;
    if(node.children.length > 0 && checkChildren == true){
    
      node.children.map((c:string) => getNode(c,state)).forEach((e:TreeNode | undefined) => e ? setVisibility(value,e,true,state) : null)
    }
}
const RtoggleVisibility = (toShow:boolean, node:TreeNode,state:ProductTreeState) => {
  setVisibility(toShow,node,true,state);
  updateParent(node,state);
}
const getLeafNodes = () => {

}

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
    invertVisibility: (state) => {
      [...Object.values(state.data)].forEach((node:any) => {
            if(node.children.length == 0 ){
              let n = getNode(node.id,state);
              if(n)
              RtoggleVisibility(!node.state.visibility,n,state);
            } 
        })
    },
    setCheckedVisibility: (state, action:PayloadAction<{toShow:boolean}>) => {
        [...Object.values(state.data)].forEach((node:any) => {
          if(node.state.checked && node.children.length == 0)
          {
            let n = getNode(node.id,state);
            if(n)
            RtoggleVisibility(action.payload.toShow,n,state);
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
    updatePrevSearches: (state) => {
      if(!state.prevSearches[state.searchQuery] && state.searchQuery !== ''){
        state.prevSearches[state.searchQuery] = Object.keys(state.prevSearches).length;
      }
    },
    saveSearchQuery : (state, action: PayloadAction<{data:string}>)=> {
        state.searchQuery = action.payload.data;
    }
  },
});

//Define the Reducers
export const { 
  saveTree, 
  checkNode, 
  invertNode, 
  expandNode, 
  toggleVisibility,
  invertVisibility,
  setCheckedVisibility,
  groupSelectedNodes, 
  saveSearchQuery, 
  updatePrevSearches } = productTreeSlice.actions;

//Define the selectors
export const selectProductTreeData = (state:RootState) => state.productTree.data
export const selectRootIds = (state:RootState) => state.productTree.rootIds
export const selectPrevSearches = (state:RootState) => Object.keys(state.productTree.prevSearches)
export const selectCheckedLeafNodes = (state:RootState) => {
  return [...Object.values(state.productTree.data)].filter((item:any) => item.children.length == 0 && item.state.checked);
}

export default productTreeSlice.reducer;