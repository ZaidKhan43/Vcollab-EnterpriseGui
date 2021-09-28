import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import Labels3D from '../../components/sideBarContents/labels/pages/labels3D';
import type { RootState } from '../../index';
import {TreeNode} from "../shared/ProductExplorer/types";

import {ITreeState} from "../shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "../shared/ProductExplorer/reducers";

type Labels3DSettings = {
    idGenerator : number,
    defaultParameters : Labels3DList,
} 

interface Labels3DList extends TreeNode {
    id: string;
    pid: string | null;
    title: string;
    children: string[];
    state: any;
    attributes: any;
    text: string,
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
            text: "",
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
            text: "",
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
            text: "",
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
            text: "",
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
            text: "",
        },
    },
    rootIds : ["1","0",],
    labels3DSettings :{
        idGenerator:5,
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
                text: "",
        },
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
                state.labels3DSettings.idGenerator = state.labels3DSettings.idGenerator + 1;
                const id =state.labels3DSettings.idGenerator;
                let newNote = {...state.labels3DSettings.defaultParameters};
                newNote.id = `${state.labels3DSettings.idGenerator}`;
                newNote.pid = `${action.payload}`;
                newNote.title = newNote.title + ` ${newNote.id +1}`;
                state.data[`${id}`] =newNote;


                state.data["1"].children.push(newNote.id)
                // Object.keys(state.data).find(key => state.data[key] === `${action.payload}`)
                label3DSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/addNode"})
        },
    }
})

export default label3DSlice.reducer;
export const {saveTree , checkNode , highlightNode , invertNode, expandNode, toggleVisibility, setCheckedVisibility , createLabel} = label3DSlice.actions;

//Selectors

export const selectRootIds = (state:RootState) => state.label3D.rootIds
export const selectProductTreeData = (state:RootState) => state.label3D.data