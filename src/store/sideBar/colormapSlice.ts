import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import Labels3D from '../../components/sideBarContents/labels/pages/labels3D';
import type { RootState } from '../../index';
import {TreeNode} from "./shared/ProductExplorer/types";

import {ITreeState} from "./shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "./shared/ProductExplorer/reducers";

type colormapSettings = {
    idGenerator : number,
    defaultParameters : colormapList,
    bracketCount : number,
    headCount : number,    
} 

export interface colormapList extends TreeNode {
    id: string;
    pid: string | null;
    title: string;
    children: string[];
    state: any;
    attributes: any;
}




interface InitialState extends ITreeState {
    data : {[id:string]:colormapList},
    rootIds : string[],
    colormapSettings : colormapSettings,
    
}

const initialState : InitialState = {
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
            attributes: {},
        },
    },
    
    rootIds : ["0","1"],
    colormapSettings : {
        idGenerator :6,
        defaultParameters : {
            id: "",
                pid: null,
                title: "",
                children: [],
                state: {
                    expanded : true,
                    visibility : true,
                },
                attributes: {},
        },
        bracketCount: 1,
        headCount: 2,
    }

}



export const colormapSlice = createSlice({
    name: "colormap",
    initialState : initialState,
    reducers: {
        saveTree: saveTreeReducer,
        checkNode: checkNodeReducer,
        highlightNode: highlightNodeReducer,
        invertNode: invertNodeReducer,
        expandNode: expandNodeReducer,
        toggleVisibility: toggleVisibilityReducer,
        setCheckedVisibility: setCheckedVisibilityReducer,
        
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
                    state.colormapSettings.bracketCount +=1;
                    newNote.title = `Colormap ${state.colormapSettings.bracketCount}`;
                }
                
                state.data[`${id}`] =newNote;
                state.data[`${action.payload}`].children.push(newNote.id)
                // Object.keys(state.data).find(key => state.data[key] === `${action.payload}`)
                colormapSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/addNode"})
        },

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
export const {saveTree , checkNode , highlightNode , invertNode, expandNode, toggleVisibility, setCheckedVisibility ,createColorMap} = colormapSlice.actions;

//Selectors

export const selectRootIds = (state:RootState) => state.colormap.rootIds
export const selectcolormapData = (state:RootState) => state.colormap.data

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