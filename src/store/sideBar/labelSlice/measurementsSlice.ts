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
    data : {
        "0" :{
            id: "0",
            pid: "-1",
            title: "Point to Point",
            children: ["4","5","6"],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "",
        },
        "1" :{
            id: "1",
            pid: "-1",
            title: "3 Point Arc Length",
            children: ["7","8"],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "",
        },
        "2" :{
            id: "2",
            pid: "-1",
            title: "Point to Edge",
            children: ["9","10"],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "",
        },
        "3" :{
            id: "3",
            pid: "-1",
            title: "Point to Face",
            children: ["11","12"],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "",
        },
        "4" :{
            id: "4",
            pid: "0",
            title: "Measurement 1",
            children: [],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "Lorem ipsum dolor sit amet,",
        },
        "5" :{
            id: "5",
            pid: "0",
            title: "Measurement 2",
            children: [],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        "6" :{
            id: "6",
            pid: "0",
            title: "Measurement 3",
            children: [],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        "7" :{
            id: "7",
            pid: "1",
            title: "Measurement 4",
            children: [],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        "8" :{
            id: "8",
            pid: "1",
            title: "Measurement 5",
            children: [],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "Lorem ipsum dolor sit amet,",
        },
        "9" :{
            id: "9",
            pid: "2",
            title: "Measurement 6",
            children: [],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean neque mi,",
        },
        "10" :{
            id: "10",
            pid: "2",
            title: "Measurement 7",
            children: [],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        "11" :{
            id: "11",
            pid: "3",
            title: "Measurement 8",
            children: [],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "Lorem ipsum dolor sit amet,",
        },
        "12" :{
            id: "12",
            pid: "3",
            title: "Measurement 9",
            children: [],
            state: {
                checked : false,
                partiallyChecked : false,
                expanded : true,
                highlighted : false,
                visibility : true,
            },
            attributes: {},
            label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    },
    rootIds : ["0","1","2","3"],
    measurementsSettings :{
        idGenerator:12,
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
        childCount : 9,
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
                        if( state.data[key1].pid === "-1"){
                            state.data[key1].children = state.data[key1].children.filter(item => item !== key)
                        }
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
export const {saveTree , checkNode , highlightNode , invertNode, expandNode, toggleVisibility, setCheckedVisibility , createLabel,editLabel, delete3DLabel} = measurementsSlice.actions;

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