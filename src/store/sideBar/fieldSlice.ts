import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDisplayResult } from '../../backend/viewerAPIProxy';
import type { RootState } from '../index';
import {ITreeNode, ITreeNodeState} from '../../components/shared/RsTreeWithSearch';
import { expandNodeReducer, selectNodeReducer, addNodeReducer, deleteNodeReducer, toggleVisibilityReducer } from './shared/ProductExplorer/reducers';

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
    Derived,
    Section
}

export interface Field extends ITreeNode {
    source:Source
}
interface Variable extends Field {
    derivedIds: string[]
}

interface Step extends Field {
    
}

interface DerivedType extends Field {
    
}

interface Sections extends Field {

}

type FieldData = {
    idGenerator: number,
    variables: {[id:string]:Variable},
    variablesRoot: string[],
    stepsAndSubCases: {[id:string]:Step},
    stepsAndSubCasesRoot: string[],
    derivedTypes: {[id:string]:DerivedType},
    derivedTypesRoot: string[],
    sections: {[id:string]:Sections},
    sectionsRoot: string[]

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
                title: "Input",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: ["01","02","03"]
            },
            "01": {
                id: "01",
                pid: "0",
                title: "Material ID",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: []
            },
            "02":  {
                id: "02",
                pid: "0",
                title: "Constraints",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: []
            },
            "03":     {
                id: "03",
                pid: "0",
                title: "Pressure Loads",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: []
            },
            "1": {
                id:"1",
                pid:"-1",
                title: "Results",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: ["11","12","13" ,"14", "15", "16"]
            },
            "11": {
                id:"11",
                pid:"1",
                title: "Displacement",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: ["0"],
                children: []
            },
            "12": {
                id:"12",
                pid:"1",
                title: "Reaction Force",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: []
            },
            "13": {
                id:"13",
                pid:"1",
                title: "Stress",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: []
            },
            "14": {
                id:"14",
                pid:"1",
                title: "Displacement 2 adfadfadfadfadadfadfadfadfadfadfadfadfadfadfdaf",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: []
            },
            "15": {
                id:"15",
                pid:"1",
                title: "Reaction Force 2",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: []
            },
            "16": {
                id:"16",
                pid:"1",
                title: "Stress 2",
                state: {expanded:true,selected:false,visibility:true},
                source: Source.SYSTEM,
                derivedIds: [],
                children: []
            }
        },
        variablesRoot: ["0","1"],
        stepsAndSubCases: {
            "0" : {
                id: "0",
                title: "Subcase 1: Modal Transient",
                children: ["01","02","03","04","05","06"],
                pid: "-1",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "01" : {
                id: "01",
                title: "Time = 0.1",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "02" : {
                id: "02",
                title: "Time = 0.2",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "03" : {
                id: "03",
                title: "Time = 0.3",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "04" : {
                id: "04",
                title: "Time = 0.4",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "05" : {
                id: "05",
                title: "Time = 0.5",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "06" : {
                id: "06",
                title: "Time = 0.6",
                children: [],
                pid: "0",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "2" : {
                id: "2",
                title: "Subcase 2: Modal Frequency",
                children: ["21","22","23","24","25","26"],
                pid: "-1",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "21" : {
                id: "21",
                title: "Mode 1:Freq = 350.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "22" : {
                id: "22",
                title: "Mode 2:Freq = 650.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "23" : {
                id: "23",
                title: "Mode 3:Freq = 1350.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "24" : {
                id: "24",
                title: "Mode 4:Freq = 1950.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "25" : {
                id: "25",
                title: "Mode 5:Freq = 2350.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            },
            "26" : {
                id: "26",
                title: "Mode 6:Freq = 2350.02",
                children: [],
                pid: "2",
                source: Source.SYSTEM,
                state: {expanded:true,selected:false},
            }
        },
        stepsAndSubCasesRoot: ["0"],
        derivedTypes: {
            "0": {
                    id: "0",
                    pid: "-1",
                    title: "Vector",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: ["01","02","03","04"]
                },
                "01": {
                    id: "01",
                    pid: "0",
                    title: "X Component",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "02":  {
                    id: "02",
                    pid: "0",
                    title: "Y Component",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "03":     {
                    id: "03",
                    pid: "0",
                    title: "Z Component",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "04": {
                    id: "04",
                    pid:"0",
                    title: "Magnitude",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children:[]
                },
                "1": {
                    id:"1",
                    pid:"-1",
                    title: "SixDOF",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: ["11","12"]
                },
                "11": {
                    id:"11",
                    pid:"1",
                    title: "Translation Vector",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "12": {
                    id:"12",
                    pid:"1",
                    title: "Rotation Vector",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "2": {
                    id:"2",
                    pid:"-1",
                    title: "Stress Tensor",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: ["21","22","23"]
                },
                "21": {
                    id:"21",
                    pid:"2",
                    title: "Normal Stress",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "22": {
                    id:"22",
                    pid:"2",
                    title: "Shear Stress",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                },
                "23": {
                    id:"23",
                    pid:"2",
                    title: "Tensor Mean",
                    state: {expanded:true,selected:false},
                    source: Source.SYSTEM,
                    children: []
                }
        },
        derivedTypesRoot: ["0"],
        sections: {
            "0" : {
                id: "0",
                pid: "-1",
                source: Source.SYSTEM,
                children: ["01","02"],
                title: "Shell",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "01" : {
                id: "01",
                pid: "0",
                source: Source.SYSTEM,
                children: [],
                title: "Top",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "02" : {
                id: "02",
                pid: "0",
                source: Source.SYSTEM,
                children: [],
                title: "Bottom",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "1" : {
                id: "1",
                pid: "-1",
                source: Source.SYSTEM,
                children: ["11","12"],
                title: "Aggregates",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "11" : {
                id: "11",
                pid: "1",
                source: Source.SYSTEM,
                children: [],
                title: "Top",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
            "12" : {
                id: "12",
                pid: "1",
                source: Source.SYSTEM,
                children: [],
                title: "Bottom",
                state: {
                    visibility: true,
                    expanded: true
                }
            },
        },
        sectionsRoot: ["0" , "1"]
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
                title: "User Defined " + id,
                children: [],
                pid: "userDefined",
                state: {expanded:true, selected:false},
                source: Source.USER
            }
        switch (data.fieldType) {
            case FieldType.Variable:
                dispatch(addUserVariable({userVariable:{...user,derivedIds:[]}}))
                break;
            case FieldType.Step:
                dispatch(addUserStepsAndSubcase({userStepAndSubcase:user}))
                break;
            case FieldType.Derived:
                dispatch(addUserDerivedType({userDerived:user}))
                break;
            case FieldType.Section:
                dispatch(addUserSection({userSection:user}))
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
        //variables
        expandVariable: (state:FieldState, action:PayloadAction<{toOpen:boolean,nodeId:string}>) => {
           expandNodeReducer({data:state.data.variables, rootIds: state.data.variablesRoot},action)
        },
        setSelectVariable: (state:FieldState, action:PayloadAction<{leafOnly:boolean,nodeId:string}>) => {
           selectNodeReducer({data:state.data.variables, rootIds: state.data.variablesRoot},action)
        },
        
        addUserVariable: (state:FieldState, action:PayloadAction<{userVariable:Variable}>) => {

            if(state.data.variables["userDefined"] === undefined) {
                addNodeReducer({data:state.data.variables,rootIds:state.data.variablesRoot},
                    {payload:
                        <ITreeNode>{
                            id:"userDefined",
                            pid:"-1",
                            title: "User Defined",
                            state: {expanded:true,selected:false},
                            source: Source.SYSTEM,
                            children: []
                        },
                        type: "fieldSlice/addUserVariable"
                    }
                    ) 
            }
            
            addNodeReducer({data:state.data.variables,rootIds:state.data.variablesRoot},
                {payload: action.payload.userVariable,
                    type: "fieldSlice/addUserVariable"
                })
            
            
        },
        removeUserVariable: (state:FieldState, action:PayloadAction<{nodeId:string}>) => {
            deleteNodeReducer({
                data:state.data.variables,
                rootIds:state.data.variablesRoot
            },
            action
            );    
        },

        //derived types
        expandDerivedTypes: (state:FieldState, action:PayloadAction<{toOpen:boolean,nodeId:string}>) => {
           return expandNodeReducer({data:state.data.derivedTypes, rootIds: state.data.derivedTypesRoot},action)
        },
        setSelectDerivedTypes: (state:FieldState, action:PayloadAction<{leafOnly:boolean,nodeId:string}>) => {
            return selectNodeReducer({data:state.data.derivedTypes, rootIds: state.data.derivedTypesRoot},action)
        },
        setVisibleDerivedTypes: (state:FieldState, action:PayloadAction<{nodeId:string, toShow:boolean}>) => {
            toggleVisibilityReducer({data:state.data.derivedTypes,rootIds:state.data.derivedTypesRoot},action);
        },
        addUserDerivedType: (state:FieldState, action:PayloadAction<{userDerived:DerivedType}>) => {
            if(state.data.derivedTypes["userDefined"] === undefined) {
                addNodeReducer({data:state.data.derivedTypes,rootIds:state.data.derivedTypesRoot},
                    {payload:
                        <ITreeNode>{
                            id:"userDefined",
                            pid:"-1",
                            title: "User Defined",
                            state: {expanded:true,selected:false},
                            source: Source.SYSTEM,
                            children: []
                        },
                        type: "fieldSlice/addUserDerivedType"
                    }
                    ) 
            }
            
            addNodeReducer({data:state.data.derivedTypes,rootIds:state.data.derivedTypesRoot},
                {payload: action.payload.userDerived,
                    type: "fieldSlice/addUserDerivedType"
                })
        },
        removeUserDerivedType: (state:FieldState, action:PayloadAction<{nodeId:string}>) => {
            deleteNodeReducer({
                data:state.data.derivedTypes,
                rootIds:state.data.derivedTypesRoot
            },
            action
            );    
        },
        //subcase and steps
        expandStepsAndSubcase: (state:FieldState, action:PayloadAction<{toOpen:boolean,nodeId:string}>) => {
            return expandNodeReducer({data:state.data.stepsAndSubCases, rootIds: state.data.stepsAndSubCasesRoot},action)
         },
        setSelectStepsAndSubcase: (state:FieldState, action:PayloadAction<{leafOnly:boolean,nodeId:string}>) => {
            return selectNodeReducer({data:state.data.stepsAndSubCases, rootIds: state.data.stepsAndSubCasesRoot},action)
        },
        addUserStepsAndSubcase: (state:FieldState, action:PayloadAction<{userStepAndSubcase:Step}>) => {
            if(state.data.stepsAndSubCases["userDefined"] === undefined) {
                addNodeReducer({data:state.data.stepsAndSubCases,rootIds:state.data.stepsAndSubCasesRoot},
                    {payload:
                        <ITreeNode>{
                            id:"userDefined",
                            pid:"-1",
                            title: "User Defined",
                            state: {expanded:true,selected:false},
                            source: Source.SYSTEM,
                            children: []
                        },
                        type: "fieldSlice/addUserStepsAndSubcase"
                    }
                    ) 
            }
            
            addNodeReducer({data:state.data.stepsAndSubCases,rootIds:state.data.stepsAndSubCasesRoot},
                {payload: action.payload.userStepAndSubcase,
                    type: "fieldSlice/addUserStepsAndSubcase"
                })
        },
        removeUserStepsAndSubcase: (state:FieldState, action:PayloadAction<{nodeId:string}>) => {
            deleteNodeReducer({
                data:state.data.stepsAndSubCases,
                rootIds:state.data.stepsAndSubCasesRoot
            },
            action
            );    
        },
        //section & layers
        expandSection: (state:FieldState, action:PayloadAction<{toOpen:boolean,nodeId:string}>) => {
            return expandNodeReducer({data:state.data.sections, rootIds: state.data.sectionsRoot},action)
         },
        setSelectSection: (state:FieldState, action:PayloadAction<{leafOnly:boolean,nodeId:string}>) => {
            return selectNodeReducer({data:state.data.sections, rootIds: state.data.sectionsRoot},action)
        },
        addUserSection: (state:FieldState, action:PayloadAction<{userSection:Sections}>) => {
            if(state.data.sections["userDefined"] === undefined) {
                addNodeReducer({data:state.data.sections,rootIds:state.data.sectionsRoot},
                    {payload:
                        <ITreeNode>{
                            id:"userDefined",
                            pid:"-1",
                            title: "User Defined",
                            state: {expanded:true,selected:false},
                            source: Source.SYSTEM,
                            children: []
                        },
                        type: "fieldSlice/addUserSection"
                    }
                    ) 
            }
            
            addNodeReducer({data:state.data.sections,rootIds:state.data.sectionsRoot},
                {payload: action.payload.userSection,
                    type: "fieldSlice/addUserSection"
                })
        },
        removeUserSection: (state:FieldState, action:PayloadAction<{nodeId:string}>) => {
            deleteNodeReducer({
                data:state.data.sections,
                rootIds:state.data.sectionsRoot
            },
            action
            );    
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
    expandVariable, 
    setSelectVariable,
    addUserVariable, 
    removeUserVariable,
    
    expandStepsAndSubcase,
    setSelectStepsAndSubcase,
    addUserStepsAndSubcase,
    removeUserStepsAndSubcase,

    expandDerivedTypes,
    setSelectDerivedTypes,
    setVisibleDerivedTypes,
    addUserDerivedType,
    removeUserDerivedType,

    expandSection,
    setSelectSection,
    addUserSection,
    removeUserSection
} = fieldSlice.actions;
// selectors
export const selectVariables = (root:RootState) => (root.field.data.variables)
export const selectSteps = (root:RootState) => root.field.data.stepsAndSubCases
export const selectDerivedTypes = (root:RootState) => root.field.data.derivedTypes
export const selectSections = (root:RootState) => root.field.data.sections
export default fieldSlice.reducer;