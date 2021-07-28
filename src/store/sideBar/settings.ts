import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {Source} from '../../components/shared/List/List';

type Settings = {

    activeTheme:string, 
    themes:Theme[],
    Slidervalue:number,
    isMenuItemSelected:boolean,
    isControlReadonly:boolean,
    isItemSave:boolean,
    isResetMouseControlList:boolean,
    idGenerator:number,
    userLabelId:number,
    mouseControlListId:number,
    copyItem:boolean,
    currentPage:string,
    menuItems:MenuItem[],
    defaultSystemMouseControllist:DefaultSystemMouseControlList[],
    defaultMouseControlList:DefaultMouseControlList,
    userProvided:MouseControlList[],
    controls:Control[],
    actions:Action[],
}

export type Theme={

  id:string,
  name:string,
  selected:boolean,
  applied:boolean
}


export enum MouseSettingsType {
  SYSTEM ,
  USER 
}

export type MenuItem = {
     id:any,
     text:string,
     selected:boolean,
     applied:boolean,
     edit:boolean,
     readonly:boolean,
     type:Source   
}

export type DefaultMouseControlList= MouseControlList;

export type MouseControlList = {

  id:string,
  list:MouseControlListItem[],

}

export type MouseControlListItem = {

  id:string,
  control:string,
  action:string,
  priority:string,

}

export type DefaultSystemMouseControlList = {

  id:string,
  control:string,
  action:string

}

export type Control = {
  id:string,
  text:string,
  icon:boolean,
  priority:string
}

export type Action = {
  id:string,
  text:string,
  icon:boolean,
  priority:string
}


const initialState:Settings = {

    activeTheme:'dark', 
    isMenuItemSelected:false,
    isResetMouseControlList:false,
    isControlReadonly:false,
    Slidervalue:15,
    idGenerator:6,
    userLabelId:1,
    isItemSave:false,
    mouseControlListId:5,
    copyItem:false,
    currentPage:"ApplicationSettings",
    themes:[
      {id:'1',name:'Dark',selected:true,applied:true},
      {id:'2',name:'Light',selected:false,applied:false},
      {id:'3',name:'Light +',selected:false,applied:false}],

    defaultSystemMouseControllist:[
      {id:'1',control:'Left Click & Drag',action:'Pan'},
      {id:'2',control:'Right Click & Darg',action:'Rotate'},
      {id:'3',control:'Alt Click',action:'Zoom in'}],

    defaultMouseControlList:{
    id:'-1',
    list:[
    {id:'1',control:'1',action:'1',priority:'5'},
    {id:'2',control:'2',action:'2',priority:'4'},
    {id:'3',control:'3',action:'3',priority:'3'}]},

    menuItems:[
      {id:'1',selected:false,text:'VCollab Default',applied:true,edit:false,readonly:true,type:Source.SYSTEM},
      {id:'2',selected:false,text:'Catia V5 Controls',applied:false,edit:false,readonly:true,type:Source.SYSTEM},
      {id:'3',selected:false,text:'ProE Controls',applied:false,edit:false,readonly:true,type:Source.SYSTEM},
      {id:'4',selected:false,text:'Abaqus Viewer',applied:false,edit:false,readonly:true,type:Source.SYSTEM},
      {id:'5',selected:false,text:'Hyperview',applied:false,edit:false,readonly:true,type:Source.SYSTEM},
      {id:'6',selected:false,text:'User1',applied:false,edit:false,readonly:false,type:Source.USER},
    ],
    userProvided:[
      {
        id:'6',list:[
          {id:'1',control:'1',action:'1',priority:'5'},
          {id:'2',control:'2',action:'2',priority:'4'},
          {id:'3',control:'3',action:'3',priority:'3'}]
    } 
    ],
    controls:[

      {id:'1',text:'Left Click & Drag',icon:false,priority:'5'},
      {id:'2',text:'Right Click & Darg',icon:false,priority:'4'},
      {id:'3',text:'Alt Click',icon:false,priority:'3'},
      {id:'4',text:'Mouse Scroll',icon:false,priority:'2'},
      {id:'5',text:'Shift & Drag',icon:false,priority:'1'},

    ],
    actions:[
      {id:'1',text:'Pan',icon:true,priority:'5'},
      {id:'2',text:'Rotate',icon:true,priority:'4'},
      {id:'3',text:'Zoom in',icon:true,priority:'3'},
      {id:'4',text:'Zoom out',icon:true,priority:'2'},
      {id:'5',text:'Highlight',icon:true,priority:'1'},
    ]
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {

    setmenuItems:(state,action:PayloadAction<any>)  => {

      state.menuItems = action.payload

    },

    setControlReadOnly:(state,action:PayloadAction<string>) =>{

      state.menuItems.find((item)=>{

        if(item.id === action.payload && item.type === Source.SYSTEM) {

          state.isControlReadonly = true;

        }
        else if(item.id === action.payload && item.type === Source.USER )
        
          state.isControlReadonly = false;

      })

    },
    
    setMenuItemEditable:(state,action:PayloadAction<{edit:boolean,activeMenuId:string}>)=> {

      state.menuItems.map((item)=>{

         if(item.id === action.payload.activeMenuId) {

          item.edit = action.payload.edit;
         }

      })

    },

    setMenuItemEditableText:(state,action:PayloadAction<{text:string,activeMenuId:string}>) => {

      state.menuItems.map((item)=>{

        if(item.id === action.payload.activeMenuId) {

         item.text = action.payload.text;

        }

     })

    },

    setMouseControlListReset:(state,action:PayloadAction<boolean>) => {

      state.isResetMouseControlList = action.payload;

    },

    resetControlAction:(state,action:PayloadAction<string>)=> {

      state.userProvided.map((item:MouseControlList) => {

        if(item.id === action.payload) {

          item.id = action.payload;
          item.list = JSON.parse(JSON.stringify(state.defaultMouseControlList.list));

        }

      })  

     //state.isResetMouseControlList = false;

    },

    addItemToMouseControlsList:(state,action:PayloadAction<string>) => {

      const controlPriority:any[] = [];
      const actionPriority:any[]  = [];
      const userPriority:any[]    = [];
      
      state.controls.forEach((item)=> {

        controlPriority.push(item.priority);

      })

      state.actions.forEach((item)=> {

        actionPriority.push(item.priority);

      })

      state.userProvided.map((item)=> {

        if(item.id === action.payload)
        {

          item.list.forEach((list)=>{

            userPriority.push(list.priority);

          })
        }
      })


      const controlPriorityCompare = controlPriority.filter(val => !userPriority.includes(val));
      
      const controlHigherpriority  =  Math.max.apply(null, controlPriorityCompare);

      const actionPriorityCompare  =  actionPriority.filter(val => !userPriority.includes(val));

      const actionHigherpriority   =  Math.max.apply(null, actionPriorityCompare);


      const getControlText=(priority:string)=>{

        let controlId:string='';

        state.controls.map((item:Control)=>{

          if(item.priority === priority) {
  
            controlId = item.id
          }

        })

        return controlId ;

      }

      const getActionText=(priority:string)=>{

        let actionId:string='';

        state.actions.map((item:Control)=>{

          if(item.priority === priority) {
  
            actionId = item.id
          }

        })

        return actionId ;

      }

      const controlTextId = getControlText(controlHigherpriority.toString());
      const actionTextId = getActionText(actionHigherpriority.toString());

      

      state.userProvided.map((item)=> {

      if(item.id === action.payload) {

      let newRowpriority:any ='';  

      state.controls.forEach((item)=>{

        if(item.id === controlTextId )
        {
           
          newRowpriority = item.priority
        }
      })


      const newRowId = (item.list.length+1).toString();
      const addNewRow = {id:newRowId,control:controlTextId,action:actionTextId,priority:newRowpriority}

      item.list = [...item.list , addNewRow]       

          }
      })

    },

    deleteItemToMouseControlList:(state,action:PayloadAction<{rowId:string,activeMenuId:string}>) => {
      

      state.userProvided.map((item:MouseControlList) => {

        if(item.id === action.payload.activeMenuId) {


          item.list.forEach((listItem:MouseControlListItem)=> {


            if(listItem.id === action.payload.rowId) {

              var index = item.list.findIndex(listItem=> listItem.id === action.payload.rowId);

              item.list.splice(index,1);

              

              // var index = (parseInt(action.payload.rowId)-1);

              // console.log(index);

              //  

            }

              

          })


      //   // item.list.splice(item.list.findIndex(item => item.id === action.payload.rowId),1);

      //   let index = item.list.map((listItem) => listItem.id).indexOf(action.payload.rowId);

      //   if (index > -1) {

      //       item.list.splice(index, 1);
          
      //      }

          }

        })


    },
    
    setControls:(state,action:PayloadAction<{controlItemId:string,rowId:string,activeMenuId:string}>) => {

      const updateControls =(item:MouseControlListItem[]) => {

        item.forEach((item)=>{

          if(item.id == action.payload.rowId) {

            item.control = action.payload.controlItemId;

          }
        })


       }


         state.userProvided.map((item:MouseControlList) => {
            
           if(item.id === action.payload.activeMenuId) {

                 updateControls(item.list);

           }

         })

    },

    setActions:(state,action:PayloadAction<{actionItemId:string,rowId:string,activeMenuId:string}>) => {

      const updateActions =(item:MouseControlListItem[]) => {

        item.forEach((item)=>{

          if(item.id == action.payload.rowId) {

            item.action = action.payload.actionItemId;

          }
        })


       }


         state.userProvided.map((item:MouseControlList) => {
            
           if(item.id === action.payload.activeMenuId) {

            updateActions(item.list);

           }

         })


    },

    setSlidervalue : (state, action : PayloadAction<number>) => {

          state.Slidervalue = action.payload
    },

    setSelectedThemeItem:(state,action: PayloadAction<{id:string,isSelected:boolean}>) =>{

      state.themes.forEach((item:Theme) => {

        if(item.id === action.payload.id) {

          item.selected = action.payload.isSelected

        }
        else {

          item.selected = false
        }
          })


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

    setThemeApply:(state) => {

      state.themes.forEach((item:Theme) => {

      if(item.selected === true) {

        item.applied = true
        item.selected = false // 

        state.activeTheme = item.id;
      }
      else {

        item.applied = false

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

    // add item into menulist
              state.menuItems= [...state.menuItems , {
              id:state.idGenerator.toString(),
              selected:false,
              text:`User ${state.userLabelId}`,
              applied:false,
              edit:false,
              readonly:false,
              type:Source.USER
            }]

    // add item into userprovidedList

            state.userProvided=[...state.userProvided , {

            id:state.idGenerator.toString(), 
            list:JSON.parse(JSON.stringify(state.defaultMouseControlList.list)),

            }]    

    },

    pasteItem:(state,action:PayloadAction<any>) => {

    state.idGenerator +=1 ;

        state.menuItems.map((item) => {

        if(item.id === action.payload) {

          state.menuItems= [...state.menuItems , {
            id:state.idGenerator.toString(),
            selected:false,
            text:item.text+''+'Copy',
            applied:false,
            edit:false,
            readonly:false,
            type:Source.USER
        }]
        }

      });

      state.userProvided=[...state.userProvided , {

        id:state.idGenerator.toString(), 
        list:JSON.parse(JSON.stringify(state.defaultMouseControlList.list)),

        }] 

    },

    deleteItem:(state, action:PayloadAction<string>) => {

      state.menuItems.splice(state.menuItems.findIndex(item => item.id === action.payload),1);
      state.copyItem = false;

    },

    setItemSave:(state,action:PayloadAction<boolean>)=> {

      state.isItemSave = action.payload;

    },
   
    setcopyItem:(state,action :PayloadAction<boolean>) => {

      state.copyItem = action.payload
    },
    setcurrentPage:(state,action :PayloadAction<string>) => {

      state.currentPage = action.payload
    }
    },

});

//Define the Reducers  

export const { 
    setThemeApply,
    setmenuItems,
    setSlidervalue,
    setSelectedThemeItem,
    setSelectedItem,
    setControlReadOnly,
    setApplyItem,
    addItemToMenuItems,
    addItemToMouseControlsList,
    deleteItemToMouseControlList,
    resetControlAction,
    setControls,
    setActions,
    setcopyItem,
    pasteItem,
    deleteItem,
    setcurrentPage,
    setItemSave,
    setMouseControlListReset,
    setMenuItemEditable,
    setMenuItemEditableText
    
} = settingsSlice.actions;

//Define the Selector

//export const selectisMenuItemSelected = (state:RootState) => state.settings.isMenuItemSelected;
export const selectmenuItems = (state:RootState) => state.settings.menuItems;
export const selectThems = (state:RootState)=> state.settings.themes;
export const selectActiveTheme = (state:RootState)=> state.settings.activeTheme;
export const selectisResetMouseControlList =(state:RootState) => state.settings.isResetMouseControlList;
export const selectdefaultMouseControlList =(state:RootState) => state.settings.defaultMouseControlList;

export const selectIsControlReadOnly =(state:RootState) =>state.settings.isControlReadonly;

export const selectUserProvided = (state:RootState) => state.settings.userProvided; 
export const selectcontrols = (state:RootState) => state.settings.controls;
export const selectactions = (state:RootState) => state.settings.actions;

export const selectSlidervalue= (state:RootState) => state.settings.Slidervalue;
export const selectIdGenerator= (state:RootState) => state.settings.idGenerator;
export const selectcopyItem=(state:RootState) => state.settings.copyItem;
export const selectcurrentPage=(state:RootState) =>state.settings.currentPage;

export const selectActiveMenuId = (state:RootState) => {


    const selectedItems = state.settings.menuItems.filter((item) => {

     return  item.selected === true

    })

    if(selectedItems.length === 1 ) {
      
      return selectedItems[0].id 

    }
    else {

        return -1 
    }
  

}

export const selectItemSaved =(state:RootState) => state.settings.isItemSave;

export default settingsSlice.reducer;