import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

type Scene = {

    listItem : ListItem[],
}

export type ListItem = {
    id:any
    text:string,
    selected:boolean,
    applied:boolean,
}

const initialState:Scene={

    listItem:[
        {id:'1',text:'Top Right',selected:false,applied:false},
        {id:'2',text:'Top Left',selected:false,applied:false},
        {id:'3',text:'Middle Right',selected:false,applied:false},
        {id:'4',text:'Middle Left',selected:false,applied:false},
        {id:'5',text:'Bottom Left',selected:false,applied:false},
        {id:'6',text:'Bottom Right',selected:false,applied:false},
        {id:'7',text:'Custom',selected:false,applied:false}]
}


export const sceneSlice = createSlice({
    name: 'Scene',
    initialState,
    reducers: {
   
        setApplyItem:(state, action:PayloadAction<any>)=>{

        state.listItem.forEach((item)=>{

             // set which items selected         

          if(item.id === action.payload) {

            item.selected = true

          }
          else{

            item.selected = false
          }

// Apply selected item             

          if(item.selected === true) {

            item.applied = true
            item.selected = false // 
          }
          else {
    
            item.applied = false
    
            }


            })

        }

    }

});


export const {

    setApplyItem


}= sceneSlice.actions;

export const selectlistItems = (state:RootState) => state.scene.listItem;

export default sceneSlice.reducer;