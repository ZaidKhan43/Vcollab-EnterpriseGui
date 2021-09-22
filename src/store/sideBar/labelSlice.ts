import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../index';

type Note2DList = {
    id: number,
    name: string,
    show: boolean,
    selected: boolean,
    label: string,
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
                    selected: false,
                    label:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
                {
                    id: 1,
                    name: "Note 2",
                    show: true,
                    selected: false,
                    label:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean neque mi,",
                },
                {
                    id: 2,
                    name: "Note 3",
                    show: false,
                    selected: false,
                    label:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean neque mi, vulputate ac erat vitae, scelerisque fermentum odio. Nulla rutrum consequat facilisis."
                },
                {
                    id: 3,
                    name: "Note 4",
                    show:   false,
                    selected: true,
                    label:"Lorem ipsum dolor sit amet, "
                },
            ],
        note2DSettings : {
            idGenerator : 3,
            limit : 6,
            defaultParameters : {
                id: 3,
                name: "Note",
                show:   false,
                selected: false,
                label:"",
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
              changeItem.selected = action.payload.value
              state.note2D.note2DList[index] = changeItem;
            }       
        },

        editShow : (state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index= state.note2D.note2DList.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
              let changeItem : Note2DList = state.note2D.note2DList[index];
              changeItem.show = action.payload.value;
              state.note2D.note2DList[index] = changeItem;
            }       
        },
        delete2DNote: (state) => {
            state.note2D.note2DList = state.note2D.note2DList.filter(item => item.selected === false);
        },

        editLabel: (state, action: PayloadAction<{id:number, value:string}>) => {
            const index= state.note2D.note2DList.findIndex((item) => item.id === action.payload.id);
            if ( index >= 0 ) {
                let changeItem : Note2DList = state.note2D.note2DList[index];
                changeItem.label = action.payload.value;
                state.note2D.note2DList[index] = changeItem;
            }
        },
    }
})

export default labelSlice.reducer;
export const {createNote, editSelect, editShow,delete2DNote, editLabel} = labelSlice.actions;

//Selectors

export const selectedNote2D = (state : RootState) => {
    const selectedNote = state.label.note2D.note2DList.filter(item => item.selected === true);
    if(selectedNote.length === 1)
        return(selectedNote[0])
  }