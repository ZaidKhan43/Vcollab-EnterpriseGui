import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {add3DLabel, get3DLabelCanvasPos, probe} from '../../../backend/viewerAPIProxy';
import type { RootState } from '../../index';
import {TreeNode} from "../shared/ProductExplorer/types";

import {ITreeState} from "../shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "../shared/ProductExplorer/reducers";
import { InteractionMode } from '../../appSlice';
import { setEditMode, setHiddenState, setWindowPos } from '../../windowMgrSlice';

export const windowPrefixId = "Label3D";
type Labels3DSettings = {
    idGenerator : number,
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
        idGenerator :-1,
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
        pointCount : 0,
        faceCount : 0,
    }
}

export const handleClick = createAsyncThunk(
    "label3DSlice/handleClick",
    (e:any,{dispatch,getState}) => {
        
        const rootState = getState() as RootState;
        if(rootState.app.interactionMode !== InteractionMode.PROBE_LABEL)
        return;
        const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
        let event = e.data;
        let rect = []
        try{
            rect = event.target.getBoundingClientRect();
        }
        catch(e:any){
            throw new Error(e);
        }
        
        let xyFromTop = [
            event.clientX - rect.left,
            event.clientY - rect.top
        ];


        let data = probe({xyFromTop, width: rect.width, height: rect.height },viewerId);
        const labelId = (rootState.label3D.labels3DSettings.idGenerator + 1).toString();
        add3DLabel(labelId,data.hitPoint, viewerId);
        let pos = get3DLabelCanvasPos(labelId,viewerId) as [number,number];
        dispatch(createLabel({id:labelId,pid:"0",pos,msg:data.hitPoint.toString()}));
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

        createParentLabel : (state, action : PayloadAction<{name: string}>) => {
            state.labels3DSettings.idGenerator += 1;
            const id =state.labels3DSettings.idGenerator;
            let newParent = {...state.labels3DSettings.defaultParameters};
            newParent.id = `${state.labels3DSettings.idGenerator}`;
            newParent.pid = "-1";
            newParent.title = action.payload.name;
            newParent.label = "";
            state.data[`${id}`] =newParent;

            state.rootIds.push(newParent.id)
        },
        createLabel : (state , action: PayloadAction<{id:string,pid:string,pos:[number,number],msg:string}>) => {
                state.labels3DSettings.idGenerator += 1;
                const {id,pid,pos,msg} = action.payload;
                let newNote = {...state.labels3DSettings.defaultParameters};
                newNote.id = id
                newNote.pid = pid
                newNote.pos = pos
                newNote.label = msg;
                if(newNote.pid === "0"){
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