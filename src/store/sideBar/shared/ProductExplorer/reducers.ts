import {PayloadAction} from '@reduxjs/toolkit'
import { TreeNode, ITreeState } from './types';
import {getNode, RcheckNode, RHighlightNode, RinvertNode, RtoggleVisibility, setVisibility, updateParent} from './helpers';
export const saveTreeReducer = (state:ITreeState, action : PayloadAction<{tree:{[id:string]:TreeNode},rootIds:string[]}>) => {
    state.data = action.payload.tree;
    state.rootIds = action.payload.rootIds;
}
export const checkNodeReducer = (state:ITreeState, action : PayloadAction<{toCheck:boolean,nodeId:string}>) => {
    const {toCheck,nodeId} = action.payload;
    let node = getNode(nodeId,state);
    if(node)
    RcheckNode(toCheck, node, state)
}
export const highlightNodeReducer = (state:ITreeState, action : PayloadAction<{toHighlight:boolean,nodeId:string}>) => {
  const {toHighlight,nodeId} = action.payload;
  let node = getNode(nodeId,state);
  if(node)
  RHighlightNode(toHighlight, node, state)
}
export const invertNodeReducer = (state:ITreeState, action : PayloadAction<{nodeId:string}>) => {
    const {nodeId} = action.payload;
    let node = getNode(nodeId,state);
    if(node)
    RinvertNode(node,state);
}
export const expandNodeReducer = (state:ITreeState, action: PayloadAction<{toOpen:boolean, nodeId:string}>) => {
    const {toOpen,nodeId} = action.payload;
    let node = state.data[nodeId];
    if(node){
      node.state.expanded = toOpen;
    }
}
export const toggleVisibilityReducer = (state:ITreeState, action : PayloadAction<{toShow:boolean,nodeId:string}>) => {
    const {toShow,nodeId} = action.payload;
    let node = getNode(nodeId,state);
    if(node)
    RtoggleVisibility(toShow,node,state);
}
export const setCheckedVisibilityReducer = (state:ITreeState, action:PayloadAction<{toShow:boolean,pids:string[],leafIds:string[]}>) => {
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
}