import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../index';

type Note2DList = {
    id: number,
    name: string,
    show: boolean,
    select: boolean,
}

type Node2DSettings = {
    idGenerator : number,
    limit : number,
    defaultParameters : Note2DList,
}

type Note2D = {
   note2DList : Note2DList[],
   note2DSettings : Node2DSettings,

}

type InitialState = {
    note2D : Note2D,
}

const initialState : InitialState = {
    note2D : {
        note2DList : 
            [        
                {
                    id: 0,
                    name: "Note 1",
                    show: true,
                    select: false,
                },
                {
                    id: 1,
                    name: "Note 2",
                    show: true,
                    select: false,
                },
                {
                    id: 2,
                    name: "Note 3",
                    show: false,
                    select: false,
                },
                {
                    id: 3,
                    name: "Note 4",
                    show:   false,
                    select: true,
                },
            ],
        note2DSettings : {
            idGenerator : 3,
            limit : 6,
            defaultParameters : {
                id: 3,
                name: "Note",
                show:   false,
                select: false,
            }
        }
    }
}

export const labelSlice = createSlice({
    name: "label",
    initialState : initialState,
    reducers: {
        
        createNote: (state) => {
            if(state.note2D.note2DList.length < state.note2D.note2DSettings.limit){
                state.note2D.note2DSettings.idGenerator = state.note2D.note2DSettings.idGenerator + 1;
                let newNote = {...state.note2D.note2DSettings.defaultParameters};
                newNote.id = state.note2D.note2DSettings.idGenerator;
                newNote.name = newNote.name + ` ${newNote.id +1}`;
                state.note2D.note2DList = [...state.note2D.note2DList , newNote];
            }
        },

        editSelect : (state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index= state.note2D.note2DList.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
              let changeItem : Note2DList = state.note2D.note2DList[index];
              changeItem.select = action.payload.value
              state.note2D.note2DList[index] = changeItem;
            }       
        },

        editShow : (state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index= state.note2D.note2DList.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
              let changeItem : Note2DList = state.note2D.note2DList[index];
              changeItem.show = action.payload.value
              state.note2D.note2DList[index] = changeItem;
            }       
        },
        delete2DNote: (state) => {
            state.note2D.note2DList = state.note2D.note2DList.filter(item => item.select === false);
        },
    }
})

export default labelSlice.reducer;
export const {createNote, editSelect, editShow,delete2DNote} = labelSlice.actions;