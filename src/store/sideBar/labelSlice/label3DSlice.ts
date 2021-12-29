import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {delete3DLabel as delete3DLabelApi, get3DLabelCanvasPos, probe} from '../../../backend/viewerAPIProxy';
import type { RootState } from '../../index';
import {LabelMode, Label3D, LabelSettings, Label3DType, LabelType} from './shared/types';
import { setLabelModeReducer } from './shared/reducers';
import {ITreeState} from "../shared/Tree/types";
import {   
    selectCheckedLeafNodes as selectCheckedLeafNodesTree, 
    selectUnCheckedLeafNodes as selectUnCheckedLeafNodesTree
} from 'store/sideBar/shared/Tree/selectors';
import {
    saveTreeReducer, 
    checkNodeReducer, 
    highlightNodeReducer,
    addNodeReducer,
    deleteNodeReducer, 
    invertNodeReducer, 
    expandNodeReducer, 
    toggleVisibilityReducer, 
    setCheckedVisibilityReducer, 
    invertCheckedVisibilityReducer} from "../shared/Tree/reducers";
import { batch } from 'react-redux';


export const windowPrefixId = "Label3D";
interface Labels3DSettings extends LabelSettings {
    defaultParameters : Label3D,
    pointCount : number,
    faceCount: number,
} 


interface InitialState extends ITreeState {
    data : {[id:string]:Label3D},
    rootIds : string[],
    labels3DSettings : Labels3DSettings,
    
}

const initialState : InitialState = {
    data : {},
    rootIds : [],
    labels3DSettings :{
        defaultParameters:{
                id: "",
                pid: null,
                title: "", 
                children: [],
                labelType: LabelType.LABEL3D,
                pos:[0,0],
                anchor: [-1,-1],
                state: {
                    checked : false,
                    partiallyChecked : false,
                    expanded : true,
                    highlighted : false,
                    visibility : true,
                },
                attributes: {},
                label: "Lorem ipsum dolor sit amet",
        },
        mode: LabelMode.VIEW,
        pointCount : 0,
        faceCount : 0,
    }
}

export const init = createAsyncThunk(
    "label3DSlice/init",
    (e:any,{dispatch,getState}) => {
        const rootState = getState() as RootState;
        const treeRootIds = rootState.label3D.rootIds;
        if(treeRootIds.length === 0) {
            dispatch(createParentLabel({id:Label3DType.PROBE,name:"point"}));
            //dispatch(createParentLabel({id:Label3DType.FACE,name:"Face"}));
          }
    }
)

export const handleProbeLabelCreation = createAsyncThunk(
    "label3DSlice/handleProbeLabelCreation",
    (data:any,{dispatch,getState}) => {
        
        let e = data.data;
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let pos = get3DLabelCanvasPos(e.labelId,viewerId);
        dispatch(createLabel({id:e.labelId,pid:e.type,pos:pos as [number,number],type:e.type,msg:e.msg}));
});

export const delete3DLabel = createAsyncThunk(
    "label3DSlice/delete3DLabel",
    (data:any,{dispatch,getState}) => {
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let state = rootState.label3D;
        let keys:string[] = [];
        Object.keys(state.data).forEach( key => {
            if( state.data[key].state.checked === true && state.data[key].pid !== "-1"){
                delete3DLabelApi(key,viewerId);
                keys.push(key);
            }
        })
        dispatch(label3DSlice.actions.deleteLabel({keys}));
});

export const label3DSlice = createSlice({
    name: "label3D",
    initialState : initialState,
    reducers: {
        saveTree: saveTreeReducer,
        checkNode: checkNodeReducer,
        highlightNode: highlightNodeReducer,
        invertNode: invertNodeReducer,
        expandNode: expandNodeReducer,
        toggleVisibility: toggleVisibilityReducer,
        setCheckedVisibility: setCheckedVisibilityReducer,
        invertCheckedVisibility: invertCheckedVisibilityReducer,
        setlabelMode: (state,action) => setLabelModeReducer(state.labels3DSettings,action),
        createParentLabel : (state, action : PayloadAction<{id:string,name: string}>) => {
            const {id,name} = action.payload;
            let newParent = {...state.labels3DSettings.defaultParameters};
            newParent.id = id;
            newParent.pid = "-1";
            newParent.title = name;
            newParent.label = "";
            addNodeReducer(state,{payload: newParent, type: 'ITreeNode'});
        },
        createLabel : (state , action: PayloadAction<{pid:string,id:string,pos:[number,number],type:Label3DType,msg:string}>) => {
                
                const {id,pid,pos,type,msg} = action.payload;
                let newNote = {...state.labels3DSettings.defaultParameters};
                newNote.id = id
                newNote.pid = pid
                newNote.label = msg;
                newNote.anchor = pos;
                newNote.pos = pos;
                if(newNote.pid === Label3DType.PROBE){
                    state.labels3DSettings.pointCount+= 1;
                    newNote.title = `Point Label ${state.labels3DSettings.pointCount}`;
                }
                else{
                    state.labels3DSettings.faceCount += 1;
                    newNote.title = `Face Label ${state.labels3DSettings.faceCount}`
                }
                addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});
        },
        setLabelPos:(state, action:PayloadAction<{id:string,pos:[number,number],anchor:[number,number]}>) => {
            const {id,pos,anchor} = action.payload;
            if(id !== "-1") {
                state.data[id].pos = pos;
                state.data[id].anchor = anchor; 
            }
        },
        editLabel: (state, action: PayloadAction<{id:string, value:string}>) => {
            const {id,value} = action.payload;
            if(id !== "-1"){
                state.data[id].label = value;
            }
        },
        deleteLabel: (state, action: PayloadAction<{keys:string[]}>) => {
            let keys = action.payload.keys;
            keys.forEach(k => {
                deleteNodeReducer(state, {payload:{nodeId:k},type:'string'})
            })
        }
    }
})

export default label3DSlice.reducer;
export const {
    //reuse from tree 
    saveTree , 
    checkNode, 
    highlightNode, 
    invertNode, 
    expandNode, 
    toggleVisibility, 
    setCheckedVisibility,
    invertCheckedVisibility,
    //current 
    createLabel,
    editLabel,
    setlabelMode,
    setLabelPos, 
    createParentLabel
} = label3DSlice.actions;

//Selectors

export const selectRootIds = (state:RootState) => state.label3D.rootIds
export const select3DLabelData = (state:RootState) => state.label3D.data
export const selectedLength = (state:RootState) => {
    const array : string[] = [];
     Object.keys(state.label3D.data).forEach(key => {
        if (state.label3D.data[key].state.checked === true && state.label3D.data[key].pid !== "-1" )
            array.push(key)
     })

     return (array.length);
}
export const selectLabelMode = (state:RootState):LabelMode => state.label3D.labels3DSettings.mode;
export const selectedLabel3D = (state: RootState):Label3D | null=> {
    let node:Label3D | null = null;
    const length = selectedLength(state);

    if(length === 1){
    Object.keys(state.label3D.data).forEach(key => {
        if (state.label3D.data[key].state.checked === true && state.label3D.data[key].pid !== "-1" )
            node = state.label3D.data[key]
     })
    }
    return(node);
}
export const selectCheckedLeafNodes = (state:RootState) =>  selectCheckedLeafNodesTree(state.label3D)
export const selectUnCheckedLeafNodes = (state:RootState) =>  selectUnCheckedLeafNodesTree(state.label3D)