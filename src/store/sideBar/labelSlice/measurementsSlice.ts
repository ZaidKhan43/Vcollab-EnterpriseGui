import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import Labels3D from '../../components/sideBarContents/labels/pages/labels3D';
import type { RootState } from '../../index';
import {TreeNode} from "../shared/ProductExplorer/types";

import {ITreeState} from "../shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "../shared/ProductExplorer/reducers";

type MeasurementsSettings = {
    idGenerator : number,
    defaultParameters : MeasurementsList,
    childCount : number,
} 

export interface MeasurementsList extends TreeNode {
    id: string;
    pid: string | null;
    title: string;
    children: string[];
    state: any;
    attributes: any;
    label: string,
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
        idGenerator: -1,
        defaultParameters:{
                id: "",
                pid: null,
                title: "",
                children: [],
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
        childCount : 0,
    }
}


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

        createParentLabel : (state, action: PayloadAction<{name:string}>) => {
            state.measurementsSettings.idGenerator += 1;
            const id =state.measurementsSettings.idGenerator;
            let newParent = {...state.measurementsSettings.defaultParameters};
            newParent.id = `${state.measurementsSettings.idGenerator}`;
            newParent.pid = "-1";
            newParent.title = action.payload.name;
            newParent.label = "";
            state.data[`${id}`] =newParent;

            state.rootIds.push(newParent.id);
        },
        
        createLabel : (state , action: PayloadAction<number>) => {
                state.measurementsSettings.idGenerator += 1;
                state.measurementsSettings.childCount +=1;
                const id =state.measurementsSettings.idGenerator;
                let newNote = {...state.measurementsSettings.defaultParameters};
                newNote.id = `${state.measurementsSettings.idGenerator}`;
                newNote.pid = `${action.payload}`;
                newNote.title = `Measurement ${state.measurementsSettings.childCount}`;
                state.data[`${id}`] =newNote;
                state.data[`${action.payload}`].children.push(newNote.id)
                // Object.keys(state.data).find(key => state.data[key] === `${action.payload}`)
                measurementsSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/addNode"})
        },

        editLabel: (state, action: PayloadAction<{id:number, value:string}>) => {
            if( action.payload.id >= 0){
                const key = `${action.payload.id}`
                state.data[key].label = action.payload.value;
            }
        },

        delete3DLabel:(state) => {
            Object.keys(state.data).forEach(key => {
                if( state.data[key].state.checked === true && state.data[key].pid !== "-1"){
                    delete state.data[key];
                    Object.keys(state.data).forEach(key1 => {
                        state.data[key1].children = state.data[key1].children.filter(item => item !== key)
                    });
                }    
            });
            Object.keys(state.data).forEach(key => {
                measurementsSlice.caseReducers.checkNode(state,{payload:{toCheck:false,nodeId: key}, type: "label3D/deleteNode/reverseCheckValues"});
            })
            measurementsSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/deleteNode"})
              
        },

        
    }
})

export default measurementsSlice.reducer;
export const {saveTree , checkNode , highlightNode , invertNode, expandNode, toggleVisibility, setCheckedVisibility , createLabel,editLabel, delete3DLabel, createParentLabel} = measurementsSlice.actions;

//Selectors

export const selectRootIds = (state:RootState) => state.measurements.rootIds
export const selectmeasurementsData = (state:RootState) => state.measurements.data
export const selectedLength = (state:RootState) => {
    const array : string[] = [];
     Object.keys(state.measurements.data).forEach(key => {
        if (state.measurements.data[key].state.checked === true && state.measurements.data[key].pid !== "-1" )
            array.push(key)
     })

     return (array.length);
}

export const selectedMeasurement = (state: RootState) => {
    let node;
    const length = selectedLength(state);

    if(length === 1){
    Object.keys(state.measurements.data).forEach(key => {
        if (state.measurements.data[key].state.checked === true && state.measurements.data[key].pid !== "-1" )
            node = state.measurements.data[key]
     })
    }
    return(node);
}