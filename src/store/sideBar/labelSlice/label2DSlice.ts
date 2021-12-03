import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../../index';
import { LabelMode } from './shared';

export const windowPrefixId = "Label2D";

type Note2DList = {
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
    defaultParameters : Note2DList,
}


type InitialState = {
    note2DList : Note2DList[],
   note2DSettings : Node2DSettings,
}

const initialState : InitialState = {
        note2DList : [],
        note2DSettings : {
            idGenerator : -1,
            limit : 6,
            defaultParameters : {
                id: 0,
                name: "Note",
                show:   false,
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
            if(state.note2DList.length < state.note2DSettings.limit){
                state.note2DSettings.idGenerator = state.note2DSettings.idGenerator + 1;
                let newNote = {...state.note2DSettings.defaultParameters};
                newNote.id = state.note2DSettings.idGenerator;
                newNote.name = newNote.name + ` ${newNote.id +1}`;
                state.note2DList = [...state.note2DList , newNote];
            }
        },

        editSelect : (state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index= state.note2DList.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
              let changeItem : Note2DList = state.note2DList[index];
              changeItem.selected = action.payload.value
              state.note2DList[index] = changeItem;
            }       
        },

        editShow : (state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index= state.note2DList.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
              let changeItem : Note2DList = state.note2DList[index];
              changeItem.show = action.payload.value;
              state.note2DList[index] = changeItem;
            }       
        },
        delete2DNote: (state) => {
            state.note2DList = state.note2DList.filter(item => item.selected === false);
        },

        editLabel: (state, action: PayloadAction<{id:number, value:string}>) => {
            const index= state.note2DList.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
                let changeItem : Note2DList = state.note2DList[index];
                changeItem.label = action.payload.value;
                state.note2DList[index] = changeItem;
            }
        },
    }
})

export default label2DSlice.reducer;
export const {createNote, editSelect, editShow,delete2DNote, editLabel} = label2DSlice.actions;

//Selectors

export const selectedNote2D = (state : RootState) => {
    const selectedNote = state.label2D.note2DList.filter(item => item.selected === true);
    if(selectedNote.length === 1)
        return(selectedNote[0])
  }

export const selectAllNotes2D = (state : RootState): Note2DList[] => {
    return state.label2D.note2DList
}