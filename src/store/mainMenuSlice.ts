import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Routes } from '../routes';
import type { RootState } from './index';

export type MainMenuItemChild = {
    id:string,
    name:string,
    path: Routes,
    disabled: boolean,
}

export type MainMenuItem = {
    id:string,
    name: string,
    expanded: boolean,
    children: MainMenuItemChild[]
}

export type MainMenu = {
    menuItems: MainMenuItem[] 
}
const initialState: MainMenu ={
    menuItems: [
        {
            id:'1',
            expanded: false,
            name: 'Geometry',
            children: [
                {
                    id: '11',
                    name:'Assembly Tree',
                    path: Routes.GEOMETRY_ASSEMBLY_TREE,
                    disabled: false,
                },
                {
                    id: '12',
                    name:'Search',
                    path: Routes.GEOMETRY_SEARCH,
                    disabled: false,
                  },
                  {
                    id: '13',
                    name:"Display Mode",
                    path: Routes.GEOMETRY_DISPLAY_MODES,
                    disabled: false,
                  },
                  {
                    id: '14',
                    name:"Material Color",
                    path: Routes.HOME,
                    disabled: false,
                  },
                  {
                    id: '15',
                    name:"Coordinate System",
                    path: Routes.HOME,
                    disabled: false,
                  },
                  {
                    id: '16',
                    name:"Transformation",
                    path: Routes.HOME,
                    disabled: false,
                  }
            ]
        },
        {
            id:'2',
            expanded: false,
            name: 'Field',
            children: [
                {
                    id: '21',
                    name:'Variabes',
                    path:Routes.HOME,
                    disabled: false,
                  },
                  {
                    id:'22',
                    name:'Steps & Subcases',
                    path:Routes.HOME,
                    disabled: false,
                  },
                  {
                    id:'23',
                    name:'Sections & Layers',
                    path:Routes.HOME,
                    disabled: false,
                  },
                  {
                    id:'24',
                    name:'Derived Types',
                    path:Routes.HOME,
                    disabled: false,
                  },
            ]
        },
        {
            id:'3',
            expanded:false,
            name: 'Scene',
            children: [
                {
                    id:'31',
                    name:'Camera',
                    path:Routes.HOME,
                },
                {
                    id:'32',
                    name:'Background',
                    path:Routes.HOME,
                },
                {
                    id:'33',
                    name:'Axis Triad',
                    path:Routes.HOME,
                },
                {
                    id:'34',
                    name:'Light',
                    path:Routes.HOME,
                },
            ]
        },
        {
            id:'4',
            expanded:false,
            name:'Color Maps',
            children:[]
        },
        {
            id:'5',
            expanded: false,
            name: 'Clip Planes',
            children: [
                {
                    id:'51',
                    name:'List',
                    path:Routes.CLIPPLANES_LIST,
                    disabled: false,
                },
                {
                    id:'52',
                    name:'Settings',
                    path:Routes.CLIPPLANES_SETTINGS,
                    disabled: true,
                },
                {
                    id:'53',
                    name:'Transformation',
                    path:Routes.CLIPPLANES_TRANSFORMATION,
                    disabled: true,
                },
            ]
        },
        {
            id:'6',
            expanded: false,
            name: 'Labels',
            children: []
        },
        {
            id:'7',
            expanded: false,
            name: 'Transformations',
            children: []
        },
        {
            id:'8',
            expanded: false,
            name: 'Animations',
            children: []   
        },
        {
            id:'9',
            expanded: false,
            name: 'Slides', 
            children: []
        },
        {
            id:'10',
            expanded: false,
            name: 'Messages',
            children:[]
        },
        {
            id:'11',
            expanded: false,
            name: 'Application Settings',
            children: []
        }
    ]
}

export const mainMenuSlice = createSlice({
    name: 'mainMenu',
    initialState,
    reducers: {
        togglePanel: (state, action:PayloadAction<{panelId:string}>) => {
            const {panelId} = action.payload; 
            state.menuItems.forEach(item => {
                if(item.id === panelId) {
                    item.expanded = !item.expanded
                }
                else {
                    item.expanded = false;
                }
            })
        },
        setChildItem: (state, action:PayloadAction<{panelId:string, childId:string, boolean: boolean}>) => {
            const menuItemIndex = state.menuItems.findIndex(item => item.id === action.payload.panelId);
            let changeItem: MainMenuItem  = state.menuItems[menuItemIndex]

            const childItemIndex = changeItem.children.findIndex(item => item.id === action.payload.childId);
            changeItem.children[childItemIndex].disabled = action.payload.boolean;
            
            state.menuItems[menuItemIndex] = changeItem;

        }
    },

})
export const {togglePanel, setChildItem} = mainMenuSlice.actions;
//selectors
export const selectMainMenu = (state:RootState) => state.mainMenu 

export default mainMenuSlice.reducer;