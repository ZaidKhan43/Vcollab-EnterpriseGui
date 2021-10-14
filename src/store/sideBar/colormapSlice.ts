import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import Labels3D from '../../components/sideBarContents/labels/pages/labels3D';
import type { RootState } from '../index';
import {TreeNode} from "./shared/ProductExplorer/types";

import {ITreeState} from "./shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "./shared/ProductExplorer/reducers";
import Variable from '../../components/sideBarContents/colormaps/pages/variable';

type ColormapSettings = {
    idGenerator : number,
    defaultParameters : Colormaps,
    bracketCount : number,
    headCount : number,    
} 


enum VariableType {
    MATERIAL_ID = 0,
    CONSTRAINTS = 1,
    PREASURE_LOADS = 2,
    DISPLACEMENT_X_COMPONENT = 3,
    DISPLACEMENT_Y_COMPONENT = 4,
    DISPLACEMENT_Z_COMPONENT = 5,
    DISPLACEMENT_MAGNITUDE = 6,
    REACTION_FORCE = 7,
    STRESS = 8,

    PARENT_NODE =-1,

}

export interface Colormaps extends TreeNode {
    id: string;
    pid: string | null;
    title: string;
    children: string[];
    state: any;
    attributes: any;
    colorPalette?: string,
    variable?: VariableType;
}

interface ColormapTreeState extends ITreeState {
    data : {[id:string]:Colormaps},
    rootIds: string[],
}

export interface ColorPalette extends TreeNode {
    id: string;
    pid: string | null;
    title: string;
    children: string[];
    state: any;
    attributes: any;
    variableType?: VariableType;
}

interface ColorPaletteTreeState extends ITreeState {
    data : {[id:string]:ColorPalette},
    rootIds: string[],
}


export interface variableList extends TreeNode {
    id: string;
    pid: string | null;
    title: string;
    variableType: VariableType;
    children: string[];
    state: any;
    attributes: any;
    totalSize?:number,
    downloaded?:boolean,
    processing?:boolean,
}


interface variableTreeState extends ITreeState {
    data : {[id:string]:variableList},
    rootIds: string[],
}

type ColorPaletteSettings = {
    idGenerator : number,
    counter : number,
}

interface InitialState {
    colormapTree : ColormapTreeState,
    colormapSettings : ColormapSettings,

    variableTree : variableTreeState,
    
    colorPaletteTree : ColorPaletteTreeState,
    colorPaletteSettings : ColorPaletteSettings,

    selectedColorMapId : string,
    selectedColorPaletteId : string,
}

const initialState : InitialState = {
    colormapTree : {
        data : {
        "0" : {
            id:"0",
            title:"Bracket",
            pid: "-1",
            children: ["2","3"],
            state: {
              visibility : true,
              expanded : true,
            },
            colorPalette: "-1",
            attributes: {},
        },
        "1" : {
            id:"1",
            title:"Head",
            pid: "-1",
            children: ["4","5","6"],
            state: {
              visibility : true,
              expanded : true,
            },
            colorPalette: "-1",
            attributes: {},
        },
      
        "2" : {
            id:"2",
            title:"System",
            pid: "0",
            children: [],
            state: {
              visibility : true,
              expanded : true,
            },
            colorPalette: "3",
            attributes: {},
        },
        "3" : {
            id:"3",
            title:"Colormap 1",
            pid: "0",
            children: [],
            state: {
              visibility : true,
              expanded : true,
            },
            colorPalette: "2",
            attributes: {},
        },
        "4" : {
            id:"4",
            title:"System",
            pid: "1",
            children: [],
            state: {
              visibility : true,
              expanded : true,
            },
            colorPalette: "3",
            attributes: {},
        },
        "5" : {
            id:"5",
            title:"Colormap 1",
            pid: "1",
            children: [],
            state: {
              visibility : true,
              expanded : true,
            },
            colorPalette: "2",
            attributes: {},
        },
        "6" : {
            id:"6",
            title:"Colormap 2",
            pid: "1",
            children: [],
            state: {
              visibility : true,
              expanded : true,
            },
            colorPalette: "3",
            attributes: {},
        },
    },
    
    rootIds : ["0","1"],
},
    colormapSettings : {
        idGenerator :6,
        defaultParameters : {
            id: "",
                pid: "-1",
                title: "",
                children: [],
                state: {
                    expanded : true,
                    visibility : true,
                },
                colorPalette: "2",
                attributes: {},
        },
        bracketCount: 1,
        headCount: 2,
    },

    variableTree : {
        data : {
            "0" : {
                id:"0",
                pid: "-1",
                title:"Input",
                variableType:VariableType.PARENT_NODE,
                children:["2","3","4"],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "1" : {
                id:"1",
                pid: "-1",
                title:"Result",
                variableType:VariableType.PARENT_NODE,
                children:["5","6","7"],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "2" : {
                id:"2",
                pid: "0",
                title:"Material ID",
                variableType:VariableType.MATERIAL_ID,
                children:[],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },
            
            "3" : {
                id:"3",
                pid: "0",
                title:"Constraints",
                variableType:VariableType.CONSTRAINTS,
                children:[],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "4" : {
                id:"4",
                pid: "0",
                title:"Pressure Loads",
                variableType:VariableType.PREASURE_LOADS,
                children:[],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "5" : {
                id:"5",
                pid: "1",
                title:"Displacement",
                variableType:VariableType.PARENT_NODE,
                children:["8","9","10","11"],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "6" : {
                id:"6",
                pid: "1",
                title:"Reaction Force",
                variableType:VariableType.REACTION_FORCE,
                children:[],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "7" : {
                id:"7",
                pid: "1",
                title:"Stress",
                variableType:VariableType.STRESS,
                children:[],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "8" : {
                id:"8",
                pid: "5",
                title:"X-Component",
                variableType:VariableType.DISPLACEMENT_X_COMPONENT,
                children:[],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "9" : {
                id:"9",
                pid: "5",
                title:"Y-Component",
                variableType:VariableType.DISPLACEMENT_Y_COMPONENT,
                children:[],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "10" : {
                id:"10",
                pid: "5",
                title:"Z-Component",
                variableType:VariableType.DISPLACEMENT_Z_COMPONENT,
                children:[],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },

            "11" : {
                id:"11",
                pid: "5",
                title:"Magnitude",
                variableType: VariableType.DISPLACEMENT_MAGNITUDE,
                children:[],
                state:{
                    expanded : true,
                    visibility: true,
                },
                attributes:{},
            },
        },

        rootIds : ["0","1"],
    },

    colorPaletteTree : {
        data :{
            "0" : {
                id : "0",
                pid : "-1",
                title: "System Defined",
                children: ["2","3"],
                state: {
                    expanded: true,
                    visibility: true,
                },
                attributes: {},
            },
            "1" : {
                id : "1",
                pid : "-1",
                title: "User Defined",
                children: [],
                state: {
                    expanded: true,
                    visibility: true,
                },
                attributes: {},
            },
            "2" : {
                id : "2",
                pid : "0",
                title: "Vcollab - 14 color",
                children: [],
                state: {
                    expanded: true,
                    visibility: true,
                },
                attributes: {},
            },
            "3" : {
                id : "3",
                pid : "0",
                title: "Abaqus",
                children: [],
                state: {
                    expanded: true,
                    visibility: true,
                },
                attributes: {},
            },
        },

        rootIds: ["0","1"],
    },

    colorPaletteSettings : {
        idGenerator :3,
        counter : 0,
    },
    selectedColorMapId: "2",

    selectedColorPaletteId: "-1",
}



export const colormapSlice = createSlice({
    name: "colormap",
    initialState : initialState,
    reducers: {
        saveTree: (state,action) =>  saveTreeReducer(state.colormapTree, action),
        checkNode:(state,action) => checkNodeReducer (state.colormapTree, action),
        highlightNode: (state,action) =>highlightNodeReducer(state.colormapTree, action),
        invertNode: (state,action) =>invertNodeReducer(state.colormapTree, action),
        expandNode: (state,action) =>expandNodeReducer(state.colormapTree, action),
        toggleVisibility: (state,action) =>toggleVisibilityReducer(state.colormapTree, action),
        setCheckedVisibility: (state,action) =>setCheckedVisibilityReducer(state.colormapTree, action),
        
        expandVariableNode : (state, action) => expandNodeReducer(state.variableTree, action),
        expandColorPaletteNode : (state, action) => expandNodeReducer(state.colorPaletteTree, action),

        createColorMap : (state , action: PayloadAction<string>) => {
                state.colormapSettings.idGenerator += 1;
                
                const id =state.colormapSettings.idGenerator;
                let newNote = {...state.colormapSettings.defaultParameters};
                newNote.id = `${state.colormapSettings.idGenerator}`;
                newNote.pid = `${action.payload}`;
                if(newNote.pid === "0"){
                    state.colormapSettings.bracketCount +=1;
                    newNote.title = `Colormap ${state.colormapSettings.bracketCount}`;
                }
                else{
                    state.colormapSettings.headCount +=1;
                    newNote.title = `Colormap ${state.colormapSettings.headCount}`;
                }
                
                state.colormapTree.data[`${id}`] =newNote;
                state.colormapTree.data[`${action.payload}`].children.push(newNote.id)
                // Object.keys(state.data).find(key => state.data[key] === `${action.payload}`)
                saveTreeReducer(state.colormapTree,{payload:{tree: state.colormapTree.data, rootIds: state.colormapTree.rootIds},type:"colormap/addColormap"})
        },

        handleColorMapSelection: (state, action: PayloadAction<string>) => {
            if(state.colormapTree.data[action.payload].pid !== "-1")
                state.selectedColorMapId = action.payload;
        },

        createPalette : (state) => {
            state.colorPaletteSettings.idGenerator += 1;
            state.colorPaletteSettings.counter += 1;
            const newPalette = {
                id : `${state.colorPaletteSettings.idGenerator}`,
                pid : "1",
                title: `User defined ${state.colorPaletteSettings.counter}`,
                children: [],
                state: {
                    expanded: true,
                    visibility: true,
                },
                attributes: {},
            }

            state.colorPaletteTree.data[`${state.colorPaletteSettings.idGenerator}`] = newPalette;
            state.colorPaletteTree.data["1"].children.push(newPalette.id)

            saveTreeReducer(state.colorPaletteTree,{payload:{tree: state.colorPaletteTree.data, rootIds: state.colorPaletteTree.rootIds},type:"colormap/addColorPalette"})
        },

        setSelectedColorPalette : (state , action : PayloadAction<string>) => {
            if(state.selectedColorPaletteId === action.payload)
                state.selectedColorPaletteId = "-1";
            else
                state.selectedColorPaletteId = action.payload;
        },

        setColorPalette : (state , action : PayloadAction<{colorMapId :string, colorPaletteId : string}>) => {
            state.colormapTree.data[action.payload.colorMapId].colorPalette = action.payload.colorPaletteId;
        },

        deleteColorPalette : (state, action : PayloadAction<string>) => {

                    state.selectedColorPaletteId = "-1";
                    delete state.colorPaletteTree.data[action.payload];
                    Object.keys(state.colorPaletteTree.data).forEach(key => {
                        state.colorPaletteTree.data[key].children = state.colorPaletteTree.data[key].children.filter(item => item !== action.payload)
                    })
        },

        pasteColorPalette : (state, action: PayloadAction<string>) => {
            let copiedColorPaletteData = JSON.parse(JSON.stringify(state.colorPaletteTree.data[action.payload]));
            state.colorPaletteSettings.idGenerator += 1;
            state.colorPaletteSettings.counter += 1;

            copiedColorPaletteData.id = state.colorPaletteSettings.idGenerator;
            copiedColorPaletteData.title = `User defined ${state.colorPaletteSettings.counter}`;
            copiedColorPaletteData.pid = "1";

            state.colorPaletteTree.data[`${state.colorPaletteSettings.idGenerator}`] = copiedColorPaletteData;
            state.colorPaletteTree.data["1"].children.push(copiedColorPaletteData.id)

            
        },
        // expandVariableNode :(state,action) => {

        // }

        // editLabel: (state, action: PayloadAction<{id:number, value:string}>) => {
        //     if( action.payload.id >= 0){
        //         const key = `${action.payload.id}`
        //         state.data[key].label = action.payload.value;
        //     }
        // },

        // delete3DLabel:(state) => {
        //     Object.keys(state.data).forEach(key => {
        //         if( state.data[key].state.checked === true && state.data[key].pid !== "-1"){
        //             delete state.data[key];
        //             Object.keys(state.data).forEach(key1 => {
        //                 if( state.data[key1].pid === "-1"){
        //                     state.data[key1].children = state.data[key1].children.filter(item => item !== key)
        //                 }
        //             });
        //         }    
        //     });
        //     Object.keys(state.data).forEach(key => {
        //         measurementsSlice.caseReducers.checkNode(state,{payload:{toCheck:false,nodeId: key}, type: "label3D/deleteNode/reverseCheckValues"});
        //     })
        //     measurementsSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/deleteNode"})
              
        // },

        
    }
})

export default colormapSlice.reducer;
export const {saveTree , checkNode , highlightNode , invertNode, expandNode, toggleVisibility, setCheckedVisibility ,createColorMap, expandVariableNode, handleColorMapSelection, expandColorPaletteNode, createPalette, setColorPalette, setSelectedColorPalette, deleteColorPalette, pasteColorPalette} = colormapSlice.actions;

//Selectors

export const selectColormapRootIds = (state:RootState) => state.colormap.colormapTree.rootIds
export const selectcolormapData = (state:RootState) => state.colormap.colormapTree.data;

export const selectColorPaletteData = (state:RootState) => state.colormap.colorPaletteTree.data;
export const selectColorPaletteRootIds = (state:RootState) => state.colormap.colorPaletteTree.rootIds;


export const selectVariableData = (state: RootState) => state.colormap.variableTree.data;
export const selectVariableRootIds = (state : RootState) => state.colormap.variableTree.rootIds;

export const selectedColorPaletteId = (state : RootState) => state.colormap.selectedColorPaletteId;

export const colormapElements = (state:RootState) => {
    let array : any[] = [];
    Object.keys(state.colormap.colormapTree.data).forEach(key => {
        if(state.colormap.colormapTree.data[key].pid !== "-1")
        array.push({id:key, name: state.colormap.colormapTree.data[key].title});
    })

    return(array);
}

// export const selectedLength = (state:RootState) => {
//     const array : string[] = [];
//      Object.keys(state.measurements.data).forEach(key => {
//         if (state.measurements.data[key].state.checked === true && state.measurements.data[key].pid !== "-1" )
//             array.push(key)
//      })

//      return (array.length);
// }

// export const selectedMeasurement = (state: RootState) => {
//     let node;
//     const length = selectedLength(state);

//     if(length === 1){
//     Object.keys(state.measurements.data).forEach(key => {
//         if (state.measurements.data[key].state.checked === true && state.measurements.data[key].pid !== "-1" )
//             node = state.measurements.data[key]
//      })
//     }
//     return(node);
// }