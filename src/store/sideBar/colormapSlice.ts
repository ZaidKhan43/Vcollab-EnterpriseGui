import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import Labels3D from '../../components/sideBarContents/labels/pages/labels3D';
import type { RootState } from '../index';
import {TreeNode} from "./shared/ProductExplorer/types";

import {ITreeState} from "./shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer, addNodeReducer} from "./shared/ProductExplorer/reducers";
import ColorPalette from '../../components/sideBarContents/colormaps/pages/colorPalette';

type ColormapSettings = {
    idGenerator : number,
    defaultParameters : Colormap,
    userDefinedCount : number,
    // headCount : number,    
} 


export interface Colormap extends TreeNode {
    id: string;
    pid: string | null;
    title: string;
    children: string[];
    state: any;
    attributes: any;
    colorPalette: string;
    variable: string;
    derivedType: string;
    section: string,
    step: string,
}

interface ColormapTreeState extends ITreeState {
    data : {[id:string]:Colormap},
    rootIds: string[],
}

export interface ColorPalette extends TreeNode {
    id: string;
    pid: string | null;
    title: string;
    children: string[];
    state: any;
    colorSet:any[];
    attributes: any;

}

interface ColorPaletteTreeState extends ITreeState {
    data : {[id:string]:ColorPalette},
    rootIds: string[],
}





type ColorPaletteSettings = {
    idGenerator : number,
    counter : number,
}

interface InitialState {
    colormapTree : ColormapTreeState,
    colormapSettings : ColormapSettings,
    
    colorPaletteTree : ColorPaletteTreeState,
    colorPaletteSettings : ColorPaletteSettings,

    selectedColorMapId : string,
    selectedColorPaletteId : string,
}

const initialState : InitialState = {
    colormapTree : {
        data : {},
        rootIds : [],
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
                variable:"13",
                derivedType:"22",
                section:"12",
                step:"01",
                attributes: {},
        },
        userDefinedCount: 0,
        // headCount: 2,
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
                colorSet:[],
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
                colorSet:[],
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
                colorSet:[
                    {id:0, color:{ r:255, g:0, b:0, a:1},},
                    {id:1, color:{ r:0, g:255, b:0, a:1},},
                    {id:2, color:{ r:0, g:0, b:255, a:1},},
                    {id:3, color:{ r:255, g:255, b:0, a:1},},
                    {id:4, color:{ r:0, g:255, b:255, a:1},},
                    {id:5, color:{ r:255, g:0, b:255, a:1},},
                    {id:6, color:{ r:192, g:192, b:192, a:1},},
                    {id:7, color:{ r:128, g:128, b:128, a:1},},
                    {id:8, color:{ r:128, g:0, b:0, a:1},},
                    {id:9, color:{ r:128, g:128, b:0, a:1},},
                    {id:10, color:{ r:0, g:128, b:0, a:1},},
                    {id:11, color:{ r:128, g:0, b:128, a:1},},
                    {id:12, color:{ r:0, g:128, b:128, a:1},},
                    {id:13, color:{ r:0, g:0, b:128, a:1},},                   
                ],
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
                colorSet:[
                    {id:0,color:{r:255, g:0, b:0, a:1},},
                    {id:1,color:{r:0, g:255, b:0, a:1},},
                    {id:2,color:{r:0, g:0, b:255, a:1},},
                ],
                attributes: {},
            },
        },

        rootIds: ["0","1"],
    },

    colorPaletteSettings : {
        idGenerator :3,
        counter : 0,
    },
    selectedColorMapId: "7",

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
        
        expandColorPaletteNode : (state, action) => expandNodeReducer(state.colorPaletteTree, action),

        addColorMap: (state, action: PayloadAction<{modelName:string, data:{
            title:string,
            variableId:string,
            derivedId:string,
            stepId:string,
            sectionId:string
        }}>) => {
            const {modelName, data} = action.payload;
            let rootNodes = state.colormapTree.rootIds.map(id => state.colormapTree.data[id])
            let parent = rootNodes.filter(n => n.title === modelName);
            function createParent(id:string,modelName:string) : Colormap{
                let p = {
                    id: id,
                    pid: "-1",
                    title: modelName,
                    state: {
                        expanded: true,
                        visibility: true
                    },
                    children: [],
                    colorPalette: "-1",
                    variable: "-1",
                    derivedType: "-1",
                    step: "-1",
                    section: "-1",
                    attributes: {}
                }
                return p
            }
            let parentNode:Colormap;

            if(parent.length >= 1) {
                parentNode = parent[0];
            } else{
                parentNode = createParent((state.colormapSettings.idGenerator++).toString(), modelName);
                state.colormapTree.rootIds.push(parentNode.id);
                addNodeReducer(state.colormapTree, {payload: parentNode, type:"colormapSlice/addColorMap/addNodeReducer"});
            } 

            addNodeReducer(state.colormapTree, {
                payload: <Colormap>{
                    id: (state.colormapSettings.idGenerator++).toString(),
                    pid: parentNode.id,
                    title: data.title,
                    attributes: {},
                    children: [],
                    colorPalette: "2",
                    state: {expanded:true,visibility:true},
                    variable: data.variableId,
                    derivedType: data.derivedId,
                    section: data.sectionId,
                    step: data.stepId
                },
                type: "colormapSlice/addColorMap/addNodeReducer"
            })
        },
        createColorMap : (state , action: PayloadAction<string>) => {
                state.colormapSettings.idGenerator += 1;
                
                const id =state.colormapSettings.idGenerator;

                let newData = JSON.parse(JSON.stringify(state.colormapTree.data[state.selectedColorMapId]))
                
                let newNote = {...newData};
                newNote.id = `${state.colormapSettings.idGenerator}`;
                newNote.pid = `${action.payload}`;
                // if(newNote.pid === "0"){
                    state.colormapSettings.userDefinedCount +=1;
                    newNote.title = `Colormap ${state.colormapSettings.userDefinedCount}`;
                // }
                // else{
                //     state.colormapSettings.headCount +=1;
                //     newNote.title = `Colormap ${state.colormapSettings.headCount}`;
                // }
                
                state.colormapTree.data[`${id}`] =newNote;
                state.colormapTree.data[`${action.payload}`].children.push(newNote.id)
                // Object.keys(state.data).find(key => state.data[key] === `${action.payload}`)
                saveTreeReducer(state.colormapTree,{payload:{tree: state.colormapTree.data, rootIds: state.colormapTree.rootIds},type:"colormap/addColormap"})
        },

        setColorMapSelection: (state, action: PayloadAction<string>) => {

            if(state.selectedColorMapId === action.payload)
                state.selectedColorMapId = "-1";
            else 
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
                colorSet:[{id : 0, color:{r:255, g:255, b:255, a:1}}],
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

        editColorPalette : (state, action : PayloadAction<{colorPaletteId : string, colorData: any[]}>) => {
            state.colorPaletteTree.data[action.payload.colorPaletteId].colorSet = action.payload.colorData;
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

        setSelectedVariable : (state , action : PayloadAction<{colorMapId :string, variableId : string}>) => {
            state.colormapTree.data[action.payload.colorMapId].variable = action.payload.variableId;
        },

        setSelectedDerivedType : (state , action : PayloadAction<{colorMapId :string, derivedTypeId : string}>) => {
            state.colormapTree.data[action.payload.colorMapId].derivedType = action.payload.derivedTypeId;
        },

        setSelectedSection : (state , action : PayloadAction<{colorMapId :string, sectionId : string}>) => {
            state.colormapTree.data[action.payload.colorMapId].section = action.payload.sectionId;
        },

        setSelectedStep : (state , action : PayloadAction<{colorMapId :string, stepId : string}>) => {
            state.colormapTree.data[action.payload.colorMapId].step = action.payload.stepId;
        },

    }
})

export default colormapSlice.reducer;
export const {addColorMap, saveTree , checkNode , highlightNode , invertNode, expandNode, toggleVisibility, setCheckedVisibility ,createColorMap, setColorMapSelection, expandColorPaletteNode, createPalette, setColorPalette, setSelectedColorPalette, deleteColorPalette, pasteColorPalette, setSelectedVariable, setSelectedDerivedType, setSelectedSection, setSelectedStep, editColorPalette} = colormapSlice.actions;

//Selectors

export const selectColormapRootIds = (state:RootState) => state.colormap.colormapTree.rootIds
export const selectcolormapData = (state:RootState) => state.colormap.colormapTree.data;

export const selectColorPaletteData = (state:RootState) => state.colormap.colorPaletteTree.data;
export const selectColorPaletteRootIds = (state:RootState) => state.colormap.colorPaletteTree.rootIds;


// export const selectVariableData = (state: RootState) => state.colormap.variableTree.data;
// export const selectVariableRootIds = (state : RootState) => state.colormap.variableTree.rootIds;

export const selectedColorPaletteId = (state : RootState) => state.colormap.selectedColorPaletteId;

export const colormapElements = (state:RootState) => {
    let array : any[] = [];
    Object.keys(state.colormap.colormapTree.data).forEach(key => {
        if(state.colormap.colormapTree.data[key].children.length === 0)
        array.push({id:key, name: state.colormap.colormapTree.data[key].title});
    })

    return(array);
}

export const colorPaletteElements = (state: RootState) => {
    let array : any[] = [];
    Object.keys(state.colormap.colorPaletteTree.data).forEach(key => {
        if(state.colormap.colorPaletteTree.data[key].pid !== "-1")
        array.push({id:key, name: state.colormap.colorPaletteTree.data[key].title});
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
