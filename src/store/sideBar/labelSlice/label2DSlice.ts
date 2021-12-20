import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {delete3DLabel as delete3DLabelApi, get3DLabelCanvasPos, probe} from '../../../backend/viewerAPIProxy';
import type { RootState } from '../../index';
import {LabelMode, Label2D, LabelSettings, Label2DType} from './shared/types';
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
import nextId from 'react-id-generator';
import { Layers, selectActiveLayer } from 'store/windowMgrSlice';
import { selectInteractionMode } from 'store/appSlice';
import { InteractionMode } from 'backend/ViewerManager';

export const windowPrefixId = "Label2D";
interface labels2DSettings extends LabelSettings {
    defaultParameters : Label2D,
    count: number
} 


interface InitialState extends ITreeState {
    data : {[id:string]:Label2D},
    rootIds : string[],
    labels2DSettings : labels2DSettings,
    
}

const initialState : InitialState = {
    data : {},
    rootIds : [],
    labels2DSettings :{
        defaultParameters:{
                id: "",
                pid: null,
                title: "",
                children: [],
                pos:[0,0],
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
        count: 0
    }
}

export const init = createAsyncThunk(
    "Label2DSlice/init",
    (e:any,{dispatch,getState}) => {
        const rootState = getState() as RootState;
        const treeRootIds = rootState.label2D.rootIds;
        if(treeRootIds.length === 0) {
            dispatch(createParentLabel({id:Label2DType.DEFAULT,name:"Notes"}));
          }
    }
)

export const handleLabel2DCreation = createAsyncThunk(
    "Label2DSlice/handleLabel2DCreation",
    (data:any,{dispatch,getState}) => {
        
        let e = data.data as PointerEvent;
        let rootState = getState() as RootState;
        let mode = selectInteractionMode(rootState);
        if(mode === InteractionMode.LABEL2D) {
            let pos = [e.offsetX,e.offsetY];
            console.log("e",e);
            dispatch(createLabel({id:nextId('label-2d'),pid:Label2DType.DEFAULT,pos:pos as [number,number],type:Label2DType.DEFAULT,msg:'testing label2d'}));
        }
});

export const delete3DLabel = createAsyncThunk(
    "Label2DSlice/delete3DLabel",
    (data:any,{dispatch,getState}) => {
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let state = rootState.label2D;
        let keys:string[] = [];
        Object.keys(state.data).forEach( key => {
            if( state.data[key].state.checked === true && state.data[key].pid !== "-1"){
                delete3DLabelApi(key,viewerId);
                keys.push(key);
            }
        })
        dispatch(Label2DSlice.actions.deleteLabel({keys}));
});

export const Label2DSlice = createSlice({
    name: "Label2D",
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
        setlabelMode: (state,action) => setLabelModeReducer(state.labels2DSettings,action),
        createParentLabel : (state, action : PayloadAction<{id:string,name: string}>) => {
            const {id,name} = action.payload;
            let newParent = {...state.labels2DSettings.defaultParameters};
            newParent.id = id;
            newParent.pid = "-1";
            newParent.title = name;
            newParent.label = "";
            addNodeReducer(state,{payload: newParent, type: 'ITreeNode'});
        },
        createLabel : (state , action: PayloadAction<{pid:string,id:string,pos:[number,number],type:Label2DType,msg:string}>) => {
                
                const {id,pid,pos,msg} = action.payload;
                let newNote = {...state.labels2DSettings.defaultParameters};
                newNote.id = id
                newNote.pid = pid
                newNote.label = msg;
                newNote.pos = pos;
                if(newNote.pid === Label2DType.DEFAULT){
                    state.labels2DSettings.count+= 1;
                    newNote.title = `Label ${state.labels2DSettings.count}`;
                }
                addNodeReducer(state,{payload: newNote, type: 'ITreeNode'});
        },
        setLabelPos:(state, action:PayloadAction<{id:string,pos:[number,number]}>) => {
            const {id,pos} = action.payload;
            if(id !== "-1") {
                state.data[id].pos = pos;
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

export default Label2DSlice.reducer;
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
} = Label2DSlice.actions;

//Selectors

export const selectRootIds = (state:RootState) => state.label2D.rootIds
export const select2DLabelData = (state:RootState) => state.label2D.data
export const selectedLength = (state:RootState) => {
    const array : string[] = [];
     Object.keys(state.label2D.data).forEach(key => {
        if (state.label2D.data[key].state.checked === true && state.label2D.data[key].pid !== "-1" )
            array.push(key)
     })

     return (array.length);
}
export const selectLabelMode = (state:RootState):LabelMode => state.label2D.labels2DSettings.mode;
export const selectedLabel2D = (state: RootState):Label2D | null=> {
    let node:Label2D | null = null;
    const length = selectedLength(state);

    if(length === 1){
    Object.keys(state.label2D.data).forEach(key => {
        if (state.label2D.data[key].state.checked === true && state.label2D.data[key].pid !== "-1" )
            node = state.label2D.data[key]
     })
    }
    return(node);
}
export const selectCheckedLeafNodes = (state:RootState) =>  selectCheckedLeafNodesTree(state.label2D)
export const selectUnCheckedLeafNodes = (state:RootState) =>  selectUnCheckedLeafNodesTree(state.label2D)