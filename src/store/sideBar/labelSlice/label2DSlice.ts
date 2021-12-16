import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../../index';
import { LabelMode } from './shared';

export const windowPrefixId = "Label2D";

type Note2D = {
    id: number,
    name: string,
    show: boolean,
    selected: boolean,
    label: string,
    mode: LabelMode
}

type Node2DSettings = {
    idGenerator : number,
    limit : number,
    defaultParameters : Note2D,
}


type InitialState = {
    list : Note2D[],
    settings : Node2DSettings,
}

const initialState : InitialState = {
        list : [],
        settings : {
            idGenerator : -1,
            limit : 6,
            defaultParameters : {
                id: 0,
                name: "Note",
                show:   true,
                selected: false,
                label: "Lorem ipsum dolor sit amet",
                mode: LabelMode.VIEW
            }
        }
}

export const label2DSlice = createSlice({
    name: "label2D",
    initialState : initialState,
    reducers: {
        
        createNote: (state) => {
            if(state.list.length < state.settings.limit){
                state.settings.idGenerator = state.settings.idGenerator + 1;
                let newNote = {...state.settings.defaultParameters};
                newNote.id = state.settings.idGenerator;
                newNote.name = newNote.name + ` ${newNote.id +1}`;
                state.list = [...state.list , newNote];
            }
        },

        editSelect : (state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index= state.list.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
              let changeItem : Note2D = state.list[index];
              changeItem.selected = action.payload.value
              state.list[index] = changeItem;
            }       
        },

        editShow : (state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index= state.list.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
              let changeItem : Note2D = state.list[index];
              changeItem.show = action.payload.value;
              state.list[index] = changeItem;
            }       
        },
        delete2DNote: (state) => {
            state.list = state.list.filter(item => item.selected === false);
        },

        editLabel: (state, action: PayloadAction<{id:number, value:string}>) => {
            const index= state.list.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
                let changeItem : Note2D = state.list[index];
                changeItem.label = action.payload.value;
                state.list[index] = changeItem;
            }
        },

        showSelected: (state) => {

        },
        hideSelected: (state) => {

        },
        invertSelected: (state) => {

        }
    }
})

export default label2DSlice.reducer;
export const {createNote, editSelect, editShow,delete2DNote, editLabel} = label2DSlice.actions;

//Selectors

export const selectedNote2D = (state : RootState) => {
    const selectedNote = state.label2D.list.filter(item => item.selected === true);
    if(selectedNote.length === 1)
        return(selectedNote[0])
  }

export const selectAllNotes2D = (state : RootState): Note2D[] => {
    return state.label2D.list
}