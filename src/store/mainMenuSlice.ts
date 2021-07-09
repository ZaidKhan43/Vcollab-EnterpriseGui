import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Routes } from '../routes';
import type { RootState } from './index';

export type MainMenuItemChild = {
    id:string,
    name:string,
    path: Routes
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
                    path: Routes.GEOMETRY_ASSEMBLY_TREE
                },
                {
                    id: '12',
                    name:'Search',
                    path: Routes.GEOMETRY_SEARCH
                  },
                  {
                    id: '13',
                    name:"Display Mode",
                    path: Routes.GEOMETRY_DISPLAY_MODES
                  },
                  {
                    id: '14',
                    name:"Material Color",
                    path: Routes.HOME,
                  },
                  {
                    id: '15',
                    name:"Coordinate System",
                    path: Routes.HOME
                  },
                  {
                    id: '16',
                    name:"Transformation",
                    path: Routes.HOME
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
                  },
                  {
                    id:'22',
                    name:'Steps & Subcases',
                    path:Routes.HOME,
                  },
                  {
                    id:'23',
                    name:'Sections & Layers',
                    path:Routes.HOME,
                  },
                  {
                    id:'24',
                    name:'Derived Types',
                    path:Routes.HOME,
                  },
            ]
        },
        {
            id:'3',
            expanded:false,
            name: 'Scene',
            children: []
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
            children: []
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
        }
    },

})
export const {togglePanel} = mainMenuSlice.actions;
//selectors
export const selectMainMenu = (state:RootState) => state.mainMenu  

export default mainMenuSlice.reducer;