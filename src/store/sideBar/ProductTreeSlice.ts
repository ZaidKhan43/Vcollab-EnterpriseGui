import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
// Define a type for the slice state
interface ProductTreeState {
    data: any[],
    prevSearches: any,
    searchQuery: string
}

// Define the initial state using that type
const initialState: ProductTreeState = {
    data: [],
    prevSearches: {},
    searchQuery: ''
}

const getNode = (index:number, state:ProductTreeState) => {
    return state.data[index];
}
const getCheckedChildCount = (nodes:any[]) => {
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
const updateParent = (node:any, state:ProductTreeState) => {
    let parent = getParent(node.pIndex,state);
    if(parent){
      updateCheckedState(parent,state);
      updateVisiblityState(parent,state);
      let grandParent = getParent(parent.pIndex,state);
      if(grandParent !== null && grandParent !== undefined){
          updateParent(parent, state);
      }
    }
}
const getParent = (nodeIndex:number,state:ProductTreeState) => {
  return state.data[nodeIndex];
}

const _checkNode = (toCheck:boolean, node:any, checkChildren:boolean,state:ProductTreeState) => {
    node.state.checked = toCheck;
    node.state.partiallyChecked = false;
    if(checkChildren == true && node.children) {
      node.children.map((c:any) => getNode(c,state)).forEach((node:any) => _checkNode(toCheck,node,true,state));
    }
}
const RcheckNode = (toCheck:boolean,node:any, state:ProductTreeState) => {

    _checkNode(toCheck,node,true, state);
    updateParent(node, state);
}
const RinvertNode = (node:any, state:ProductTreeState) => {
  
  if(node.children.length > 0)
  {
    node.children.map((c:number) => getNode(c,state)).forEach((e:any) => {
      RinvertNode(e,state);
    });
  }
  else{
    RcheckNode(!node.state.checked,node,state);
  }
}
const setVisibility = (value:boolean,node:any,checkChildren:boolean,state:ProductTreeState) => {
    node.state.visibility = value;
    if(node.children.length > 0 && checkChildren == true){
    
      node.children.map((c:number) => getNode(c,state)).forEach((e:any) => setVisibility(value,e,true,state))
    }
}
const RtoggleVisibility = (toShow:boolean, node:any,state:ProductTreeState) => {
  setVisibility(toShow,node,true,state);
  updateParent(node,state);
}
const getLeafNodes = () => {

}

export const productTreeSlice = createSlice({
  name: 'productTree',
  initialState,
  reducers: {
    saveTree : (state, action : PayloadAction<{data:any[]}>) => {
        state.data = action.payload.data;
    },
    checkNode : (state, action : PayloadAction<{toCheck:boolean,nodeIndex:number}>) => {
        const {toCheck,nodeIndex} = action.payload;
        RcheckNode(toCheck,state.data[nodeIndex], state)
    },
    invertNode : (state, action : PayloadAction<{nodeIndex:number}>) => {
        const {nodeIndex} = action.payload;
        RinvertNode(state.data[nodeIndex],state);
    },
    expandNode : (state, action: PayloadAction<{toOpen:boolean, nodeIndex:number}>) => {
        const {toOpen,nodeIndex} = action.payload;
        state.data[nodeIndex].state.expanded = toOpen;
    },
    toggleVisibility : (state, action : PayloadAction<{toShow:boolean,nodeIndex:number}>) => {
        const {toShow,nodeIndex} = action.payload;
        RtoggleVisibility(toShow,state.data[nodeIndex],state);
    },
    invertVisibility: (state) => {
        state.data.forEach((node:any) => {
            if(node.children.length == 0 ){
              RtoggleVisibility(!node.state.visibility,state.data[node.index],state);
            } 
        })
    },
    setCheckedVisibility: (state, action:PayloadAction<{toShow:boolean}>) => {
        state.data.forEach((node:any) => {
          if(node.state.checked && node.children.length == 0)
          RtoggleVisibility(action.payload.toShow,state.data[node.index],state);
      })
    },
    groupSelectedNodes: (state, action:PayloadAction<{tagName:string}>) => {
       let {tagName} = action.payload; 
        state.data.forEach((node:any) => {
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
export const selectPrevSearches = (state:RootState) => Object.keys(state.productTree.prevSearches)
export const selectCheckedLeafNodes = (state:RootState) => {
  return state.productTree.data.filter((item:any) => item.children.length == 0 && item.state.checked);
}

export default productTreeSlice.reducer;