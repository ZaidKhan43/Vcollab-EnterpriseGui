import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {add3DLabel, get3DLabelCanvasPos, probe} from '../../../backend/viewerAPIProxy';
import type { RootState } from '../../index';
import {TreeNode} from "../shared/ProductExplorer/types";
import {LabelMode,LabelSettings, setLabelModeReducer, Label3DType} from './shared'
import {ITreeState} from "../shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "../shared/ProductExplorer/reducers";
import {InteractionMode} from '../../../backend/viewerAPIProxy';

export const windowPrefixId = "Label3D";
interface Labels3DSettings extends LabelSettings {
    defaultParameters : Labels3DList,
    pointCount : number,
    faceCount: number,
} 

export interface Labels3DList extends TreeNode {
    pos:[number,number];
    label: string,
}

interface InitialState extends ITreeState {
    data : {[id:string]:Labels3DList},
    rootIds : string[],
    labels3DSettings : Labels3DSettings,
    
}

const initialState : InitialState = {
    data : {},
    rootIds : [],
    labels3DSettings :{
        defaultParameters:{
                id: "",
                pid: null,
                title: "",
                children: [],
                pos:[0,0],
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
        mode: LabelMode.VIEW,
        pointCount : 0,
        faceCount : 0,
    }
}

export const init = createAsyncThunk(
    "label3DSlice/init",
    (e:any,{dispatch,getState}) => {
        const rootState = getState() as RootState;
        const treeRootIds = rootState.label3D.rootIds;
        if(treeRootIds.length === 0) {
            dispatch(createParentLabel({id:Label3DType.PROBE,name:"point"}));
            dispatch(createParentLabel({id:Label3DType.FACE,name:"Face"}));
          }
    }
)

export const handleProbeLabelCreation = createAsyncThunk(
    "label3DSlice/handleProbeLabelCreation",
    (data:any,{dispatch,getState}) => {
        
        let e = data.data;
        dispatch(createLabel({id:e.labelId,pid:e.type,type:e.type,msg:e.msg}));
});

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
        setlabelMode: (state,action) => setLabelModeReducer(state.labels3DSettings,action),
        createParentLabel : (state, action : PayloadAction<{id:string,name: string}>) => {
            const {id,name} = action.payload;
            let newParent = {...state.labels3DSettings.defaultParameters};
            newParent.id = id;
            newParent.pid = "-1";
            newParent.title = name;
            newParent.label = "";
            state.data[`${id}`] =newParent;

            state.rootIds.push(newParent.id)
        },
        createLabel : (state , action: PayloadAction<{pid:string,id:string,type:Label3DType,msg:string}>) => {
                
                const {id,pid,type,msg} = action.payload;
                let newNote = {...state.labels3DSettings.defaultParameters};
                newNote.id = id
                newNote.pid = pid
                newNote.label = msg;
                if(newNote.pid === Label3DType.PROBE){
                    state.labels3DSettings.pointCount+= 1;
                    newNote.title = `Point Label ${state.labels3DSettings.pointCount}`;
                }
                else{
                    state.labels3DSettings.faceCount += 1;
                    newNote.title = `Face Label ${state.labels3DSettings.faceCount}`
                }
                state.data[id] =newNote;


                state.data[pid].children.push(newNote.id)
                // Object.keys(state.data).find(key => state.data[key] === `${action.payload}`)
                label3DSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/addNode"})
        },
        setLabelPos:(state, action:PayloadAction<{id:string,pos:[number,number]}>) => {
            const {id,pos} = action.payload;
            if(id !== "-1") {
                state.data[id].pos = pos;
            }
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
                label3DSlice.caseReducers.checkNode(state,{payload:{toCheck:false,nodeId: key}, type: "label3D/deleteNode/reverseCheckValues"});
            })
            label3DSlice.caseReducers.saveTree(state,{payload:{tree: state.data, rootIds: state.rootIds},type:"label3D/deleteNode"})
              
        },
    }
})

export default label3DSlice.reducer;
export const {
    saveTree , checkNode , highlightNode , invertNode, expandNode, toggleVisibility, setCheckedVisibility , 
    createLabel,
    editLabel,
    setlabelMode,
    setLabelPos, 
    delete3DLabel,
    createParentLabel
} = label3DSlice.actions;

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
export const selectLabelMode = (state:RootState):LabelMode => state.label3D.labels3DSettings.mode;
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