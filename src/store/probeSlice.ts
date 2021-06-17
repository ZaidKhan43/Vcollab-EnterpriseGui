import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '.';
import { probe } from '../backend/viewerAPIProxy';

type props = {
    position : {
        x : number,
        y : number,
    },
    showLabel: boolean,
    text : string,
    enabled : boolean,
    timeout: number
}

const initialState : props = {
    position : {
        x : 0,
        y: 0,
    },
    showLabel: false,
    text : "Position of the Point",
    enabled : false,
    timeout: 0
}

export type PointerData = {
    xyFromTop: [number,number],
    width:number,
    height:number
}

export const fetchProbeData = createAsyncThunk(
    'probeSlice/fetchProbeData',
    async (data:{pointerData:PointerData},{dispatch,getState}) => {
        let rootState = getState() as RootState;
        let viewerId = rootState.app.viewers[rootState.app.activeViewer || ''];
        if(rootState.probe.enabled) {
            let start = performance.now();
            let probeData = probe(data.pointerData,viewerId);
            let end = performance.now();
            let time = (end - start);
            dispatch(probeSlice.actions.setProbeTimeout({timeout:time}));
            let content = 'dummy';
            dispatch(probeSlice.actions.showProbeLabel({toShow:probeData?true:false}));
            if(probeData)
            content = JSON.stringify(probeData.debugInfo,null,2)
            content += ` time ${time} ms`;
            dispatch(probeSlice.actions.updateContent({text:content}))
        }

    }
)

export const probeSlice = createSlice ({
    name: "probe",
    initialState : initialState,
    reducers : {
        
        enableProbe: (state, action:PayloadAction<{isEnabled:boolean}>) => {
            state.enabled = action.payload.isEnabled;
        },

        showProbeLabel: (state, action:PayloadAction<{toShow:boolean}>) => {
            state.showLabel = action.payload.toShow;
        },

        setProbeTimeout: (state, action:PayloadAction<{timeout:number}>) => {
            state.timeout = action.payload.timeout;
        },
        updateContent: (state, action:PayloadAction<{text:string}>) => {
            if(state.enabled) {
                state.text = action.payload.text;
            }
        },
        update: (state,action:PayloadAction<{position:{x:number,y:number}}>) => {
            let {position} = action.payload;
            if(state.enabled) {
                state.position.x = Number(position.x);
                state.position.y = Number(position.y);
            }
        },
    }
})

export const {update, enableProbe } = probeSlice.actions;
export default probeSlice.reducer;