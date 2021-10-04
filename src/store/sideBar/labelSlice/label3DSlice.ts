import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import Labels3D from '../../components/sideBarContents/labels/pages/labels3D';
import type { RootState } from '../../index';
import {TreeNode} from "../shared/ProductExplorer/types";

import {ITreeState} from "../shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "../shared/ProductExplorer/reducers";

type Labels3DSettings = {
    idGenerator : number,
    defaultParameters : Labels3DList,
    pointCount : number,
    faceCount: number,
} 

export interface Labels3DList extends TreeNode {
    id: string;
    pid: string | null;
    title: string;
    children: string[];
    state: any;
    attributes: any;
    label: string,
}




interface InitialState extends ITreeState {
    data : {[id:string]:Labels3DList},
    rootIds : string[],
    labels3DSettings : Labels3DSettings,
    
}

const initialState : InitialState = {
    data : {
        "0" :{
            id: "0",
            pid: "-1",
            title: "Point",
            children: ["2"],
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
            title: "Face",
            children: ["3","4"],
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
            pid: "0",
            title: "Point Label 1",
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
        "3" :{
            id: "3",
            pid: "1",
            title: "Face Label 1",
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
        "4" :{
            id: "4",
            pid: "1",
            title: "Face Label 2",
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
    },
    rootIds : ["0","1",],
    labels3DSettings :{
        idGenerator :4,
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
        pointCount : 1,
        faceCount : 2,
    }
}


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
        
        createLabel : (state , action: PayloadAction<number>) => {
                state.labels3DSettings.idGenerator += 1;
                const id =state.labels3DSettings.idGenerator;
                let newNote = {...state.labels3DSettings.defaultParameters};
                newNote.id = `${state.labels3DSettings.idGenerator}`;
                newNote.pid = `${action.payload}`;
                if(newNote.pid === "0"){
                    state.labels3DSettings.pointCount+= 1;
                    newNote.title = `Point Label ${state.labels3DSettings.pointCount}`;
                }
                else{
                    state.labels3DSettings.faceCount += 1;
                    newNote.title = `Face Label ${state.labels3DSettings.faceCount}`
                }
                state.data[`${id}`] =newNote;


                state.data[`${action.payload}`].children.push(newNote.id)
                // Object.keys(state.data).find(key => state.data[key] === `${action.payload}`)
                label3DSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/addNode"})
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
                label3DSlice.caseReducers.checkNode(state,{payload:{toCheck:false,nodeId: key}, type: "label3D/deleteNode/reverseCheckValues"});
            })
            label3DSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/deleteNode"})
              
        },

        
    }
})

export default label3DSlice.reducer;
export const {saveTree , checkNode , highlightNode , invertNode, expandNode, toggleVisibility, setCheckedVisibility , createLabel,editLabel, delete3DLabel} = label3DSlice.actions;

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

export const selectedLabel3D = (state: RootState) => {
    let node;
    const length = selectedLength(state);

    if(length === 1){
    Object.keys(state.label3D.data).forEach(key => {
        if (state.label3D.data[key].state.checked === true && state.label3D.data[key].pid !== "-1" )
            node = state.label3D.data[key]
     })
    }
    return(node);
}