import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {delete3DLabel as delete3DLabelApi, get3DLabelCanvasPos, probe} from '../../../backend/viewerAPIProxy';
import type { RootState } from '../../index';
import {LabelMode, Label2D, LabelSettings, Label2DType, LabelType, LabelGeneral, Label3DType} from './shared/types';
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
import { selectInteractionMode } from 'store/appSlice';
import { InteractionMode } from 'backend/ViewerManager';

export const windowPrefixId = "Label2D";
interface labels2DSettings extends LabelSettings {
    defaultParameters : LabelGeneral,
    count2D: number,
    countPoint : number,
    countMeasurement : number
} 


interface InitialState extends ITreeState {
    data : {[id:string]:LabelGeneral},
    rootIds : string[],
    labels2DSettings : labels2DSettings,
    activeLabel : string,
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
                labelType: LabelType.LABEL2D,
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
        count2D: 0,
        countPoint : 0,
        countMeasurement : 0,
    },
    activeLabel : "-1"
}

export const init = createAsyncThunk(
    "Label2DSlice/init",
    (e:any,{dispatch,getState}) => {
        const rootState = getState() as RootState;
        const treeRootIds = rootState.label2D.rootIds;
        if(treeRootIds.length === 0) {
            dispatch(createParentLabel({id:LabelType.LABEL2D,name:"Notes", pid:"-1"}));
            dispatch(createParentLabel({id:LabelType.LABEL3D,name:"3D Labels",pid:"-1"}));
            dispatch(createParentLabel({id:LabelType.MEASUREMENT,name:"Measurements",pid:"-1"}));

            dispatch(createParentLabel({id:Label3DType.PROBE,name:"Point",pid:LabelType.LABEL3D}))
            dispatch(createParentLabel({id:Label3DType.DISTANCE ,name:"Point to Point",pid:LabelType.MEASUREMENT}));
            dispatch(createParentLabel({id:Label3DType.ARC, name:"3 Point Arc Length",pid:LabelType.MEASUREMENT}));
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
            dispatch(createLabel({id:nextId('label-2d'),pid:LabelType.LABEL2D,pos:[-10,-10],type:Label2DType.DEFAULT,msg:'testing label2d'}));
        }
});

export const handleProbeHeadCreation = createAsyncThunk(
"label3DSlice/handleProbeLabelCreation",
(data,{dispatch, getState}) => {
    // let e = data.data;
    const idNew = nextId('label-3d')
    dispatch(createLabel({id:idNew,pid:Label3DType.PROBE,pos:[-10,-10],type:Label3DType.PROBE,msg:"nill"}));
    dispatch(setActiveLabel({id: idNew}));
}
)

export const handleMeasurementHeadCreation = createAsyncThunk(
    'measurementSlice/handleMeasurementLabelCreation',
    async (data: any, {dispatch,getState}) => {
        let e = data.pid;
        const idNew = nextId('label-3d')
        dispatch(createLabel({
            id: idNew,
            pid: e,
            type:e,
            msg: "nill",
            pos:[-10,-10],
        }));
        dispatch(setActiveLabel({id: idNew}));
    }
)

export const handleProbeLabelCreation = createAsyncThunk(
    "label3DSlice/handleProbeLabelCreation",
    (data:any,{dispatch,getState}) => {
        
        let e = data.data;
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let pos = get3DLabelCanvasPos(e.labelId,viewerId);
        dispatch(createLabel({id:e.labelId,pid: rootState.label2D.activeLabel,pos: pos as [number,number],type:e.type,msg:e.msg}));
});

export const handleMeasurementLabelCreation = createAsyncThunk(
    'measurementSlice/handleMeasurementLabelCreation',
    async (data:any, {getState,dispatch}) => {
        let e = data.data;
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let pos = get3DLabelCanvasPos(e.labelId,viewerId);
        dispatch(createLabel({
            pid: e.type,
            id: e.labelId,
            msg: e.msg,
            pos:[-10,-10],
            type: e.type
        }));
    }
)

export const delete3DLabel = createAsyncThunk(
    "Label2DSlice/delete3DLabel",
    (data:any,{dispatch,getState}) => {
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let state = rootState.label2D;
        let keys:string[] = [];
        Object.keys(state.data).forEach( key => {
            if( state.data[key].state.checked === true && state.data[key].pid !== "-1" && state.data[key].id !== Label3DType.PROBE && state.data[key].id !== Label3DType.DISTANCE && state.data[key].id !== Label3DType.ARC){
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
        createParentLabel : (state, action : PayloadAction<{id:string,name: string, pid: string}>) => {
            const {id,name, pid} = action.payload;
            let newParent = {...state.labels2DSettings.defaultParameters};
            newParent.id = id;
            newParent.pid = pid;
            newParent.title = name;
            newParent.label = "";
            addNodeReducer(state,{payload: newParent, type: 'ITreeNode'});
        },
        createLabel : (state , action: PayloadAction<{pid:string,id:string,pos:[number,number],type:Label2DType | Label3DType ,msg:string}>) => {
                
                const {id,pid,pos,msg} = action.payload;
                let newNote = {...state.labels2DSettings.defaultParameters};
                newNote.id = id
                newNote.pid = pid
                newNote.label = msg;
                newNote.pos = pos;
                if(newNote.pid === LabelType.LABEL2D){
                    state.labels2DSettings.count2D+= 1;
                    newNote.title = `Label ${state.labels2DSettings.count2D}`;
                }

                if(newNote.pid === Label3DType.PROBE){
                    newNote.anchor = pos;
                    state.labels2DSettings.countPoint+= 1;
                    newNote.title = `Point Label ${state.labels2DSettings.countPoint}`;
                }

                if(newNote.pid === Label3DType.DISTANCE || newNote.pid === Label3DType.ARC){
                    newNote.anchor = pos; 
                    state.labels2DSettings.countMeasurement+= 1;
                    newNote.title = `Measurement ${state.labels2DSettings.countMeasurement}`;
                }
                
                if(newNote.pid === state.activeLabel){

                    if(state.data[state.activeLabel].pid === Label3DType.PROBE){
                        newNote.title = `N: ${[21323,213,12312,1232][Math.floor(Math.random()*[21323,213,12312,1232].length)]}`;
                    }

                    if(state.data[state.activeLabel].pid === Label3DType.DISTANCE){
                        newNote.title = `N: ${[21323,213,12312,1232][Math.floor(Math.random()*[21323,213,12312,1232].length)]} - N: ${[1232,1223,4324,3423][Math.floor(Math.random()*[1232,1223,4324,3423].length)]}`;
                    }

                    if(state.data[state.activeLabel].pid === Label3DType.ARC){
                        newNote.title = `N: ${[21323,213,12312,1232][Math.floor(Math.random()*[21323,213,12312,1232].length)]} - N: ${[1232,1223,4324,3423][Math.floor(Math.random()*[1232,1223,4324,3423].length)]} - N: ${[545,6456,4654,462][Math.floor(Math.random()*[545,6456,4654,462].length)]}`;
                    }
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
            console.log("deleteKeys", keys)
            keys.forEach(k => {
                deleteNodeReducer(state, {payload:{nodeId:k},type:'string'})
            })
        },

        setActiveLabel : (state, action: PayloadAction<{id:string}>) => {

            if(action.payload.id === state.activeLabel){
                state.activeLabel = "-1";
            }

            else{
                if(state.data[action.payload.id].pid === Label3DType.PROBE ||state.data[action.payload.id].pid === Label3DType.DISTANCE || state.data[action.payload.id].pid === Label3DType.ARC)
                    state.activeLabel = action.payload.id;
            }
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
    createParentLabel,
    setActiveLabel,
} = Label2DSlice.actions;

//Selectors

export const selectRootIds = (state:RootState) => state.label2D.rootIds
export const select2DLabelData = (state:RootState) => state.label2D.data
export const selectedLength = (state:RootState) => {
    const array : string[] = [];
     Object.keys(state.label2D.data).forEach(key => {
        if (state.label2D.data[key].state.checked === true)
            if(state.label2D.data[key].pid === "-1" || state.label2D.data[key].pid === LabelType.LABEL3D || state.label2D.data[key].pid === LabelType.MEASUREMENT)
                return null
            else
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