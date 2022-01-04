import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../../index';
import {get3DLabelCanvasPos,delete3DLabel as delete3DLabelApi} from '../../../backend/viewerAPIProxy';
import {ITreeState} from "../shared/Tree/types";
import {  
    selectCheckedLeafNodes as selectCheckedLeafNodesTree, 
    selectUnCheckedLeafNodes as selectUnCheckedLeafNodesTree 
} from 'store/sideBar/shared/Tree/selectors';
import {
    saveTreeReducer, 
    checkNodeReducer, 
    highlightNodeReducer, 
    invertNodeReducer, 
    expandNodeReducer, 
    toggleVisibilityReducer, 
    setCheckedVisibilityReducer, 
    invertCheckedVisibilityReducer, 
    addNodeReducer,
    deleteNodeReducer
} from "../shared/Tree/reducers";
import {LabelMode, ILabel2D, LabelSettings, Label3DType} from './shared/types';
import { setLabelModeReducer } from './shared/reducers';

export const windowPrefixId = "Measurement";

interface MeasurementsSettings extends LabelSettings  {
    defaultParameters : MeasurementsList,
    childCount : number,
} 

export interface MeasurementsList extends ILabel2D {
    type: Label3DType
}

interface InitialState extends ITreeState {
    data : {[id:string]:LabelMeasurements},
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
        invertCheckedVisibility: invertCheckedVisibilityReducer,
        setLabelMode: (state, action) => {setLabelModeReducer(state.measurementsSettings,action)},
        createParentLabel : (state, action: PayloadAction<{id:string,name:string}>) => {
            const id =action.payload.id;
            let newParent = {...state.measurementsSettings.defaultParameters};
            newParent.id = id;
            newParent.pid = "-1";
            newParent.title = action.payload.name;
            newParent.label = "";
            addNodeReducer(state,{payload:newParent,type:'ITreeNode'});
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
                addNodeReducer(state,{payload:newNote,type:'ITreeNode'});
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
                deleteNodeReducer(state, {payload:{nodeId:k},type:'string'})
            })
        }
    }
})

export default measurementsSlice.reducer;
export const {
    //reuse from tree
    saveTree , 
    checkNode , 
    highlightNode , 
    invertNode, 
    expandNode, 
    toggleVisibility,
    setCheckedVisibility , 
    invertCheckedVisibility, 
    setLabelPos, 
    setLabelMode,
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
export const selectedMeasurement = (state: RootState):ILabel2D | null => {
    let node:ILabel2D | null=null;
    const length = selectedLength(state);
    if(length === 1){
    Object.keys(state.measurements.data).forEach(key => {
        if (state.measurements.data[key].state.checked === true && state.measurements.data[key].pid !== "-1" )
            node = state.measurements.data[key]
     })
    }
    return(node);
}
export const selectCheckedLeafNodes = (state:RootState) =>  selectCheckedLeafNodesTree(state.measurements)
export const selectUnCheckedLeafNodes = (state:RootState) =>  selectUnCheckedLeafNodesTree(state.measurements)