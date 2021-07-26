import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDisplayResult } from '../../backend/viewerAPIProxy';
import type { RootState } from '../index';
import {Node, NodeState} from '../../components/shared/RsTreeWithSearch';

type FieldState = {
    data: FieldData
}

export enum Source {
    SYSTEM,
    USER
}

export enum FieldType {
    Variable,
    Step,
    Derived
}

export interface Field extends Node {
    source:Source
}
interface Variable extends Field {
    
}

interface Step extends Field {
    
}

interface DerivedType extends Field {
    
}

type FieldData = {
    idGenerator: number,
    variables: {[id:string]:Variable},
    stepsAndSubCases: {[id:string]:Step},
    derivedTypes: {[id:string]:DerivedType}
}

export const fetchFieldData = createAsyncThunk(
    "fieldSlice/fetchFieldData",
    async (data:{data:string},{dispatch,getState}) => {
       let root = (getState() as RootState)
       let viewerId = root.app.viewers[root.app.activeViewer || ""];
       let r = getDisplayResult(viewerId);
       if(r instanceof Object) {
            return Promise.resolve(r); 
       }
       else {
           return Promise.reject("unable to fetch field data")
       }
    }
  )

const initialState : FieldState = {
    data: {
        idGenerator: 1000,
        variables: {
        "0": {
                id: "0",
                pid: "-1",
                name: "Input",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: ["01","02","03"]
            },
            "01": {
                id: "01",
                pid: "0",
                name: "Material ID",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            },
            "02":  {
                id: "02",
                pid: "0",
                name: "Constraints",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            },
            "03":     {
                id: "03",
                pid: "0",
                name: "Pressure Loads",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            },
            "1": {
                id:"1",
                pid:"-1",
                name: "Results",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: ["11","12","13" ,"14", "15", "16"]
            },
            "11": {
                id:"11",
                pid:"1",
                name: "Displacement",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            },
            "12": {
                id:"12",
                pid:"1",
                name: "Reaction Force",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            },
            "13": {
                id:"13",
                pid:"1",
                name: "Stress",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            },
            "14": {
                id:"14",
                pid:"1",
                name: "Displacement 2 adfadfadfadfadadfadfadfadfadfadfadfadfadfadfdaf",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            },
            "15": {
                id:"15",
                pid:"1",
                name: "Reaction Force 2",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            },
            "16": {
                id:"16",
                pid:"1",
                name: "Stress 2",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            },
            "userDefined": {
                id:"userDefined",
                pid:"-1",
                name: "User Defined",
                state: {expanded:true,selected:false},
                source: Source.SYSTEM,
                children: []
            }
        },
        stepsAndSubCases: {
            "0" : {
                id: "0",
                name: "Subcase 1: Modal Transient",
                children: ["01","02","03","04","05","06"],
                pid: "-1",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "01" : {
                id: "01",
                name: "Time = 0.1",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "02" : {
                id: "02",
                name: "Time = 0.2",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "03" : {
                id: "03",
                name: "Time = 0.3",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "04" : {
                id: "04",
                name: "Time = 0.4",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "05" : {
                id: "05",
                name: "Time = 0.5",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "06" : {
                id: "06",
                name: "Time = 0.6",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "2" : {
                id: "2",
                name: "Subcase 2: Modal Frequency",
                children: ["21","22","23","24","25","26"],
                pid: "-1",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "21" : {
                id: "21",
                name: "Mode 1:Freq = 350.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "22" : {
                id: "22",
                name: "Mode 2:Freq = 650.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "23" : {
                id: "23",
                name: "Mode 3:Freq = 1350.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "24" : {
                id: "24",
                name: "Mode 4:Freq = 1950.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "25" : {
                id: "25",
                name: "Mode 5:Freq = 2350.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "26" : {
                id: "26",
                name: "Mode 6:Freq = 2350.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "userDefined" : {
                id:"userDefined",
                name: "User Defined",
                children: [],
                pid:"-1",
                source: Source.USER,
                state: {expanded:true,selected:false},
            } 
        },
        derivedTypes: {
            "0": {
                    id: "0",
                    pid: "-1",
                    name: "Vector",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: ["01","02","03","04"]
                },
                "01": {
                    id: "01",
                    pid: "0",
                    name: "X Component",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "02":  {
                    id: "02",
                    pid: "0",
                    name: "Y Component",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "03":     {
                    id: "03",
                    pid: "0",
                    name: "Z Component",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "04": {
                    id: "04",
                    pid:"0",
                    name: "Magnitude",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children:[]
                },
                "1": {
                    id:"1",
                    pid:"-1",
                    name: "SixDOF",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: ["11","12"]
                },
                "11": {
                    id:"11",
                    pid:"1",
                    name: "Translation Vector",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "12": {
                    id:"12",
                    pid:"1",
                    name: "Rotation Vector",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "2": {
                    id:"2",
                    pid:"-1",
                    name: "Stress Tensor",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: ["21","22","23"]
                },
                "21": {
                    id:"21",
                    pid:"2",
                    name: "Normal Stress",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "22": {
                    id:"22",
                    pid:"2",
                    name: "Shear Stress",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "23": {
                    id:"23",
                    pid:"2",
                    name: "Tensor Mean",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "userDefined": {
                    id:"userDefined",
                    pid:"-1",
                    name: "User Defined",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                }
            },
    }
}

export const addUserFieldState = createAsyncThunk(
    "fieldSlice/setNodeState",
    async (data:{fieldType:FieldType}, {dispatch,getState}) => {
        dispatch(fieldSlice.actions.incrementId());
        let state = (getState() as RootState ).field
        let id = state.data.idGenerator.toString();
            let user =  {
                id,
                name: "User Defined " + id,
                children: [],
                pid: "userDefined",
                state: {expanded:false},
                source: Source.USER
            }
        switch (data.fieldType) {
            case FieldType.Variable:
                dispatch(addUserVariable({userVariable:user}))
                break;
            case FieldType.Step:
                dispatch(addUserStepsAndSubcase({userStepAndSubcase:user}))
                break;
            case FieldType.Derived:
                dispatch(addUserDerivedType({userDerived:user}))
                break;
            default:
                break;
        }
    }
) 
export const fieldSlice = createSlice({
    name: "field",
    initialState,
    reducers: {
        incrementId: (state:FieldState) => {
            state.data.idGenerator+=1;
        },
        setVariableNodeState: (state:FieldState, action:PayloadAction<{nodeId:string, nodeState: NodeState}>) => {
            let {nodeId,nodeState} = action.payload;
            state.data.variables[nodeId].state = {...nodeState};              
        },

        addUserVariable: (state:FieldState, action:PayloadAction<{userVariable:Variable}>) => {
            let user = action.payload.userVariable;
            state.data.variables["userDefined"].children.push(user.id);
            state.data.variables[user.id] = user
        },

        setDerivedNodeState: (state:FieldState, action:PayloadAction<{nodeId:string, nodeState: NodeState}>) => {
            let {nodeId,nodeState} = action.payload;
            state.data.derivedTypes[nodeId].state = {...nodeState};              
        },

        addUserDerivedType: (state:FieldState, action:PayloadAction<{userDerived:DerivedType}>) => {
            let user = action.payload.userDerived;
            state.data.derivedTypes["userDefined"].children.push(user.id);
            state.data.derivedTypes[user.id] = user
        },

        setStepAndSubCaseNodeState: (state:FieldState, action:PayloadAction<{nodeId:string, nodeState: NodeState}>) => {
            let {nodeId,nodeState} = action.payload;
            state.data.stepsAndSubCases[nodeId].state = {...nodeState};              
        },

        addUserStepsAndSubcase: (state:FieldState, action:PayloadAction<{userStepAndSubcase:Step}>) => {
            let user = action.payload.userStepAndSubcase;
            state.data.stepsAndSubCases["userDefined"].children.push(user.id);
            state.data.stepsAndSubCases[user.id] = user
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchFieldData.fulfilled, (state:FieldState, action:PayloadAction<any>) => {
            //let result = action.payload
            // if(result) {
            //     state.data.variables = {...result.variables, source: Source.SYSTEM};
            //     state.data.steps = {...result.stepVariables, source: Source.SYSTEM};
            //     state.data.derivedTypes = {...result.derivedTypes, source: Source.SYSTEM};
            // }
        })
    }
})
export const {
    setVariableNodeState, 
    addUserVariable, 
    setStepAndSubCaseNodeState,
    addUserStepsAndSubcase,
    setDerivedNodeState, 
    addUserDerivedType
} = fieldSlice.actions;
// selectors
export const selectVariables = (root:RootState) => (root.field.data.variables)
export const selectSteps = (root:RootState) => root.field.data.stepsAndSubCases
export const selectDerivedTypes = (root:RootState) => root.field.data.derivedTypes
export default fieldSlice.reducer;