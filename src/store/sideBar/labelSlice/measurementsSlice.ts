import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../../index';
import {get3DLabelCanvasPos,delete3DLabel as delete3DLabelApi} from '../../../backend/viewerAPIProxy';
import {ITreeState} from "../shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "../shared/ProductExplorer/reducers";
import {LabelMode, Label3D, LabelSettings, setLabelModeReducer, Label3DType} from './shared';

export const windowPrefixId = "Measurement";

interface MeasurementsSettings extends LabelSettings  {
    defaultParameters : MeasurementsList,
    childCount : number,
} 

export interface MeasurementsList extends Label3D {
    type: Label3DType
}

interface InitialState extends ITreeState {
    data : {[id:string]:MeasurementsList},
    rootIds : string[],
    measurementsSettings : MeasurementsSettings,
    
}

const initialState : InitialState = {
    data : {},
    rootIds : [],
    measurementsSettings :{
        defaultParameters:{
                id: "",
                pid: null,
                title: "",
                children: [],
                pos: [0,0],
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
                type: Label3DType.ANNOTATION,
        },
        mode: LabelMode.VIEW,
        childCount : 0,
    }
}

export const init = createAsyncThunk(
    "measurementsSlice/init",
    (e:any,{dispatch,getState}) => {
        const rootState = getState() as RootState;
        const treeRootIds = rootState.measurements.rootIds;
        if(treeRootIds.length === 0) {
            dispatch(createParentLabel({id:Label3DType.DISTANCE ,name:"Point to Point"}));
            dispatch(createParentLabel({id:Label3DType.ARC, name:"3 Point Arc Length"}));
            //dispatch(createParentLabel({id:Label3DType.EDGE ,name:"Point to Edge"}));
            //dispatch(createParentLabel({id:Label3DType.FACE, name:"Point to Face"}));
          }
    }
)

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
            pos:pos as number[],
            type: e.type
        }));
    }
)

export const delete3DLabel = createAsyncThunk(
    "measurementSlice/delete3DLabel",
    (data:any,{dispatch,getState}) => {
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        let state = rootState.measurements;
        let keys:string[] = [];
        Object.keys(state.data).forEach( key => {
            if( state.data[key].state.checked === true && state.data[key].pid !== "-1"){
                delete3DLabelApi(key,viewerId);
                keys.push(key);
            }
        })
        dispatch(measurementsSlice.actions.deleteLabel({keys}));
});

export const measurementsSlice = createSlice({
    name: "measurements",
    initialState : initialState,
    reducers: {
        saveTree: saveTreeReducer,
        checkNode: checkNodeReducer,
        highlightNode: highlightNodeReducer,
        invertNode: invertNodeReducer,
        expandNode: expandNodeReducer,
        toggleVisibility: toggleVisibilityReducer,
        setCheckedVisibility: setCheckedVisibilityReducer,
        setLabelMode: (state, action) => {setLabelModeReducer(state.measurementsSettings,action)},
        createParentLabel : (state, action: PayloadAction<{id:string,name:string}>) => {
            const id =action.payload.id;
            let newParent = {...state.measurementsSettings.defaultParameters};
            newParent.id = id;
            newParent.pid = "-1";
            newParent.title = action.payload.name;
            newParent.label = "";
            state.data[id] =newParent;
            state.rootIds.push(newParent.id);
        },
        
        createLabel : (state , action: PayloadAction<{pid:string,id:string,type:Label3DType,pos:number[],msg:string}>) => {
                state.measurementsSettings.childCount +=1;
                const {id,pid,type,pos,msg} = action.payload;
                let newNote = {...state.measurementsSettings.defaultParameters};
                newNote.id = id;
                newNote.type = type;
                newNote.pid = pid;
                newNote.title = `Measurement ${state.measurementsSettings.childCount}`;
                newNote.label = msg;
                newNote.pos= pos as [number,number];
                newNote.anchor = pos as [number,number];
                state.data[id] =newNote;
                state.data[pid].children.push(newNote.id)
                // Object.keys(state.data).find(key => state.data[key] === `${action.payload}`)
                measurementsSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/addNode"})
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
            if(id !== '-1'){
                state.data[id].label = value;
            }
        },
        deleteLabel: (state, action: PayloadAction<{keys:string[]}>) => {
            let keys = action.payload.keys;
            keys.forEach(k => {
                let pid = state.data[k].pid
                delete state.data[k];
                if(pid)
                {
                    let index = state.data[pid].children.findIndex((e) => e === k);
                    if(index > -1){
                        state.data[pid].children.splice(index,1);
                        if(state.data[pid].children.length === 0){
                            state.data[pid].state.checked = false;
                        }
                    }
                }
            })
        }
    }
})

export default measurementsSlice.reducer;
export const {
    saveTree , 
    checkNode , 
    highlightNode , 
    invertNode, 
    expandNode, 
    toggleVisibility, 
    setLabelPos, 
    setLabelMode,
    setCheckedVisibility , 
    createLabel,
    editLabel, 
    createParentLabel} = measurementsSlice.actions;

//Selectors

export const selectRootIds = (state:RootState) => state.measurements.rootIds
export const selectMeasurementsData = (state:RootState) => state.measurements.data
export const selectedLength = (state:RootState) => {
    const array : string[] = [];
     Object.keys(state.measurements.data).forEach(key => {
        if (state.measurements.data[key].state.checked === true && state.measurements.data[key].pid !== "-1" )
            array.push(key)
     })

     return (array.length);
}
export const selectLabelMode = (state:RootState):LabelMode => state.measurements.measurementsSettings.mode;
export const selectedMeasurement = (state: RootState):Label3D | null => {
    let node:Label3D | null=null;
    const length = selectedLength(state);
    if(length === 1){
    Object.keys(state.measurements.data).forEach(key => {
        if (state.measurements.data[key].state.checked === true && state.measurements.data[key].pid !== "-1" )
            node = state.measurements.data[key]
     })
    }
    return(node);
}