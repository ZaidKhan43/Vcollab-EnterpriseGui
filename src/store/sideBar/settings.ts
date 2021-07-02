import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

type Settings = {

    Slidervalue:number,
    isMenuItemSelected:boolean,
    idGenerator:number,
    userLabelId:number,
    mouseControlListId:number,
    copyItem:boolean,
    currentPage:string,
    menuItems:MenuItem[],
    mouseControllist:mouseControlsList[],
    controls:Controls[],
    actions:Actions[],
}

export enum MouseSettingsType {
  SYSTEM,
  USER
}
export type MenuItem = {
     id:any,
     text:string,
     selected:boolean,
     applied:boolean,
     type:MouseSettingsType   
}

export type mouseControlsList = {

  id:number,
  column1:string,
  column2:string,

}

export type Controls = {
  id:any,
  text:string,
  icon:boolean,
}

export type Actions = {
  id:any,
  text:string,
  icon:boolean,
}


const initialState:Settings = {

    isMenuItemSelected:false,
    Slidervalue:15,
    idGenerator:7,
    userLabelId:2,
    mouseControlListId:5,
    copyItem:false,
    currentPage:"ApplicationSettings",
    menuItems:[
      {id:'1',selected:false,text:'VCollab Default',applied:true,type:MouseSettingsType.SYSTEM},
      {id:'2',selected:false,text:'Catia V5 Controls',applied:false,type:MouseSettingsType.SYSTEM},
      {id:'3',selected:false,text:'ProE Controls',applied:false,type:MouseSettingsType.SYSTEM},
      {id:'4',selected:false,text:'Abaqus Viewer',applied:false,type:MouseSettingsType.SYSTEM},
      {id:'5',selected:false,text:'Hyperview',applied:false,type:MouseSettingsType.SYSTEM},
      {id:'6',selected:false,text:'User 1',applied:false,type:MouseSettingsType.USER},
      {id:'7',selected:false,text:'User 2',applied:false,type:MouseSettingsType.USER}
    ],
    mouseControllist:[
      {id:1,column1:'Left Click & Drag',column2:'Pan'},
      {id:2,column1:'Right Click & Darg',column2:'Rotate'},
      {id:3,column1:'Alt Click',column2:'Zoom in'},
      {id:4,column1:'Ctrl Shift Click',column2:'Zoom out'},
      {id:5,column1:'Double Click',column2:'Highlight'},
    ],
    controls:[
      {id:'1',text:'Left Click & Drag',icon:false},
      {id:'2',text:'Right Click & Darg',icon:false},
      {id:'3',text:'Alt Click',icon:false},
      {id:'4',text:'Ctrl Shift Click',icon:false},
      {id:'5',text:'Double Click',icon:false},
    ],
    actions:[
      {id:'1',text:'Pan',icon:true},
      {id:'2',text:'Rotate',icon:true},
      {id:'3',text:'Zoom in',icon:true},
      {id:'4',text:'Zoom out',icon:true},
      {id:'5',text:'Highlight',icon:true},
    ]
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {

    setmenuItems:(state,action:PayloadAction<any>)  => {

      state.menuItems = action.payload

    },
    addItemToMouseControlsList:(state) => {

      state.mouseControlListId +=1;

      state.mouseControllist= [...state.mouseControllist , {
        id:state.mouseControlListId,
        column1:'select',
        column2:'select'
     }]

    },

    deleteItemToMouseControlList:(state,action:PayloadAction<number>) => {

      const newMouseControlList = state.mouseControllist.filter((item) => item.id !== action.payload);

      state.mouseControllist = [...newMouseControlList];


    },
    
    setControls:(state,actions:PayloadAction<any>) => {


      state.mouseControllist.forEach((item) =>{

        if(item.id === actions.payload.id){

          item.column1=actions.payload.text;
        }
      })

    },
    setActions:(state,actions:PayloadAction<any>) => {


      state.mouseControllist.forEach((item) =>{

        if(item.id === actions.payload.id){

          item.column2=actions.payload.text;
        }
      })

    },

    setSlidervalue : (state, action : PayloadAction<number>) => {

          state.Slidervalue = action.payload
    },


     setSelectedItem:(state,action: PayloadAction<{id:string,isSelected:boolean}>) => {

          state.menuItems.forEach((item:MenuItem) => {

          if(item.id === action.payload.id) {

            item.selected = action.payload.isSelected

          }
          else {

            item.selected = false
          }
            })
     },

     setApplyItem:(state) => {

        state.menuItems.forEach((item:MenuItem) => {

        if(item.selected === true) {

          item.applied = true
          item.selected = false // 
        }
        else {

          item.applied = false

          }
          })

     },

     addItemToMenuItems:(state) => {

      state.idGenerator +=1 ;
      state.userLabelId +=1;

           state.menuItems= [...state.menuItems , {
           id:state.idGenerator.toString(),
           selected:false,
           text:`User ${state.userLabelId}`,
           applied:false,
           type:MouseSettingsType.USER
        }]
      

     },

     pasteItem:(state,action:PayloadAction<any>) => {

      state.idGenerator +=1 ;

          state.menuItems.filter((item) => {

          if(item.id === action.payload.id) {

            state.menuItems= [...state.menuItems , {
              id:state.idGenerator.toString(),
              selected:false,
              text:item.text+'Copy',
              applied:false,
              type:MouseSettingsType.USER
          }]
          }

        });

     },

     deleteItem:(state, action:PayloadAction<any>) => {


       let index = action.payload.id ;

       if (index !== -1) 
       state.menuItems.splice(index-1, 1);
        
       state.copyItem = false;

    },
   
    setcopyItem:(state,action :PayloadAction<boolean>) => {

      state.copyItem=action.payload
    },
    setcurrentPage:(state,action :PayloadAction<string>) => {

      state.currentPage=action.payload
    }
    },
  });

//Define the Reducers  

  export const { 

    setmenuItems,
    setSlidervalue,
    setSelectedItem,
    setApplyItem,
    addItemToMenuItems,
    addItemToMouseControlsList,
    deleteItemToMouseControlList,
    setControls,
    setActions,
    setcopyItem,
    pasteItem,
    deleteItem,
    setcurrentPage,
 
    
} = settingsSlice.actions;

//Define the Selector

//export const selectisMenuItemSelected = (state:RootState) => state.settings.isMenuItemSelected;
export const selectmenuItems = (state:RootState) => state.settings.menuItems;

export const selectmouseControllist = (state:RootState) => state.settings.mouseControllist; 
export const selectcontrols = (state:RootState) => state.settings.controls;
export const selectactions = (state:RootState) => state.settings.actions;

export const selectSlidervalue= (state:RootState) => state.settings.Slidervalue;
export const selectIdGenerator= (state:RootState) => state.settings.idGenerator;
export const selectcopyItem=(state:RootState) => state.settings.copyItem;
export const selectcurrentPage=(state:RootState) =>state.settings.currentPage;


export default settingsSlice.reducer;