import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Routes } from '../routes';
import type { RootState } from './index';

export type MainMenuItem = {
    id:string,
    name: string,
    type: MainMenuItems,
    path: Routes,
    expanded: boolean,
    disabled: boolean,
    isEditMode?: boolean,
    children: MainMenuItem[]
}

export enum MainMenuItems {
    GEOMETRY,
    GEOMETRY_ASSEMBLY_TREE,
    GEOMETRY_SEARCH,
    GEOMETRY_DISPLAY_MODE,
    GEOMETRY_MATERIAL_COLOR,
    GEOMETRY_COORDINATE_SYSTEM,
    GEOMETRY_TRANSFORMATION,

    FIELD,
    FIELD_VARIABLES,
    FIELD_STEPS_AND_SUBCASES,
    FIELD_SECTIONS_AND_LAYERS,
    FIELD_DERIVED_TYPES,
    
    SCENE,
    SCENE_CAMERA,
    SCENE_BACKGROUND,
    SCENE_AXIS_TRIAD,
    SCENE_LIGHT,

    COLOR_MAPS,
    COLOR_MAPS_LIST,
    COLOR_MAPS_EDIT,
    COLOR_MAPS_VARIABLE,
    COLOR_MAPS_STEPS_AND_SUBCASE,
    COLOR_MAPS_SELECTION_AND_LAYER,
    COLOR_MAPS_DERIVED_TYPES,
    COLOR_MAPS_COLOR_PALETTE,
    COLOR_MAPS_VALUE_SETTINGS,
    COLOR_MAPS_LEGEND_SETTINGS,

    CLIP_PLANE,
    CLIP_PLANE_LIST,
    CLIP_PLANE_SETTINGS,
    CLIP_PLANE_TRANSFORM,

    LABELS,
    LABELS_LIST,

    TRANSFORMATIONS,

    ANIMATIONS,

    SLIDES,

    MESSAGES,

    SETTINGS,
    SETTINGS_THEME, 
    SETTINGS_MOUSE_CONTROLS,

    MORE,
    ADD_GROUP,
    NEW_GROUP,
    CUSTOM_GROUP

}

export type MainMenu = {
    menuItems: MainMenuItem[],
    userCreatedMenuItems: MainMenuItem[],
    activeTab: MainMenuItem | null,
    defaultOptions: string[] ,
    bottomTabOptions: string[],
    temporaryTab: string | null
}
const initialState: MainMenu ={
    menuItems: [
        {
            id:'1',
            expanded: false,
            name: "Geometry",
            type: MainMenuItems.GEOMETRY,
            path: Routes.GEOMETRY,
            disabled: false,
            children: [
                {
                    id: 'Geometry11',
                    name: "Assembly Tree",
                    type:MainMenuItems.GEOMETRY_ASSEMBLY_TREE,
                    path: Routes.GEOMETRY_ASSEMBLY_TREE,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                {
                    id: 'Geometry12',
                    name: "Search",
                    type:MainMenuItems.GEOMETRY_SEARCH,
                    path: Routes.GEOMETRY_SEARCH,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                  {
                    id: 'Geometry13',
                    name: "Display Mode",
                    type:MainMenuItems.GEOMETRY_DISPLAY_MODE,
                    path: Routes.GEOMETRY_DISPLAY_MODES,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                  {
                    id: 'Geometry14',
                    name: "Material Color",
                    type:MainMenuItems.GEOMETRY_MATERIAL_COLOR,
                    path: Routes.GEOMERTY_MATERIAL_COLOR,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                //   {
                //     id: '15',
                //     name: "Coordinate System",
                //     type:MainMenuItems.GEOMETRY_COORDINATE_SYSTEM,
                //     path: Routes.HOME,
                //     disabled: false,
                //   },
                //   {
                //     id: '16',
                //     name: "Transform",
                //     type:MainMenuItems.GEOMETRY_TRANSFORMATION,
                //     path: Routes.HOME,
                //     disabled: false,
                //   }
            ]
        },
        {
            id:'2',
            expanded: false,
            name: "Field",
            type: MainMenuItems.FIELD,
            path: Routes.FIELD,
            disabled: false,
            children: [
                {
                    id:'Field21',
                    name: "Steps & Subcases",
                    type:MainMenuItems.FIELD_STEPS_AND_SUBCASES,
                    path:Routes.FIELD_STEPS_AND_SUBCASES,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                {
                    id: 'Field22',
                    name: "Variables",
                    type:MainMenuItems.FIELD_VARIABLES,
                    path:Routes.FIELD_VARIABLES,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                  {
                    id:'Field23',
                    name: "Derived Types",
                    type:MainMenuItems.FIELD_DERIVED_TYPES,
                    path:Routes.FIELD_DERIVED_TYPES,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
                  {
                    id:'Field24',
                    name: "Sections & Layers",
                    type:MainMenuItems.FIELD_SECTIONS_AND_LAYERS,
                    path:Routes.FIELD_SECTIONS_AND_LAYERS,
                    disabled: false,
                    children: [],
                    expanded: false
                  },
            ]
        },
        {
            id:'3',
            expanded:false,
            name: "Scene",
            type: MainMenuItems.SCENE,
            path:Routes.SCENE,
            disabled:false,
            children: [
                {
                    id:'Scene31',
                    name: "Camera",
                    type:MainMenuItems.SCENE_CAMERA,
                    path:Routes.SCENE_CAMERA,
                    disabled:false,
                    children: [],
                    expanded: false
                },
                {
                    id:'Scene32',
                    name: "Background",
                    type:MainMenuItems.SCENE_BACKGROUND,
                    path:Routes.SCENE_BACKGROUND,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                {
                    id:'Scene33',
                    name: "Axis Triad",
                    type:MainMenuItems.SCENE_AXIS_TRIAD,
                    path:Routes.SCENE_AXIS_TRIAD,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                // {
                //     id:'34',
                //     name: "Light",
                //     type:MainMenuItems.SCENE_LIGHT,
                //     path:Routes.SCENE_LIGHT,
                //     disabled: false
                // },
            ]
        },
        {
            id:'4',
            expanded:false,
            name: "Color Maps",
            type:MainMenuItems.COLOR_MAPS,
            path:Routes.COLORMAPS,
            disabled:false,
            children:[
                {
                    id:'Color Maps41',
                    name: "List",
                    type:MainMenuItems.COLOR_MAPS_LIST,
                    path:Routes.COLORMAPS_LIST,
                    disabled: false,
                    children: [],
                    expanded: false
                },    
                {
                    id:'Color Maps42',
                    name: "Edit",
                    type:MainMenuItems.COLOR_MAPS_EDIT,
                    path:Routes.COLORMAPS_EDIT,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps43',
                    name: "Variable",
                    type:MainMenuItems.COLOR_MAPS_VARIABLE,
                    path:Routes.COLORMAPS_VARIABLE,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps44',
                    name: "Steps & Subcase",
                    type:MainMenuItems.COLOR_MAPS_STEPS_AND_SUBCASE,
                    path:Routes.COLORMAPS_STEPS_AND_SUBCASE,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps45',
                    name: "Section & Layer",
                    type:MainMenuItems.COLOR_MAPS_SELECTION_AND_LAYER,
                    path:Routes.COLORMAPS_SELECTION_AND_LAYER,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps46',
                    name: "Derived Type",
                    type:MainMenuItems.COLOR_MAPS_DERIVED_TYPES,
                    path:Routes.COLORMAPS_DERIVED_TYPES,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps47',
                    name: "Color Palette",
                    type:MainMenuItems.COLOR_MAPS_COLOR_PALETTE,
                    path:Routes.COLORMAPS_COLOR_PALETTE,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps48',
                    name: "Value Setting",
                    type:MainMenuItems.COLOR_MAPS_VALUE_SETTINGS,
                    path:Routes.COLORMAPS_VALUE_SETTINGS,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Color Maps49',
                    name: "Legend Setting",
                    type:MainMenuItems.COLOR_MAPS_LEGEND_SETTINGS,
                    path:Routes.COLORMAPS_LEGEND_SETTINGS,
                    disabled: true,
                    children: [],
                    expanded: false
                },
            ]
        },
        {
            id:'5',
            expanded: false,
            name: "Clip Plane",
            type: MainMenuItems.CLIP_PLANE,
            path:Routes.CLIPPLANES,
            disabled:false,
            children: [
                {
                    id:'Clip Plane51',
                    name: "List",
                    type:MainMenuItems.CLIP_PLANE_LIST,
                    path:Routes.CLIPPLANES_LIST,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                {
                    id:'Clip Plane52',
                    name: "Settings",
                    type:MainMenuItems.CLIP_PLANE_SETTINGS,
                    path:Routes.CLIPPLANES_SETTINGS,
                    disabled: true,
                    children: [],
                    expanded: false
                },
                {
                    id:'Clip Plane53',
                    name: "Transform",
                    type:MainMenuItems.CLIP_PLANE_TRANSFORM,
                    path:Routes.CLIPPLANES_TRANSFORMATION,
                    disabled: true,
                    children: [],
                    expanded: false
                },
            ]
        },
        {
            id:'6',
            expanded: false,
            name: "Labels",
            type: MainMenuItems.LABELS,
            path:Routes.LABELS_LIST,
            disabled: false,
            children: [],
        },
        {
            id:'7',
            expanded: false,
            name: "Transformations",
            type: MainMenuItems.TRANSFORMATIONS,
            path:Routes.HOME,
            disabled: false,
            children: []
        },
        {
            id:'8',
            expanded: false,
            name: "Animations",
            type: MainMenuItems.ANIMATIONS,
            path:Routes.HOME,
            disabled: false,
            children: []   
        },

        {
            id:'9',
            expanded: false,
            name: "3D Slides",
            type: MainMenuItems.SLIDES,
            path:Routes.SLIDES,
            disabled: false,
            children:[]
        },

        {
            id:'10',
            expanded: false,
            name: "Messages",
            type: MainMenuItems.MESSAGES,
            path:Routes.MESSAGES,
            disabled: false,
            children:[]
        },
        
        {
            id:'11',
            expanded: false,
            name: "Application Settings",
            type: MainMenuItems.SETTINGS,
            path:Routes.HOME,
            disabled:false,
            children: [
                {

                    id:'Application Settings111',
                    name: "Color Theme",
                    type:MainMenuItems.SETTINGS_THEME,
                    path:Routes.SETTINGS_THEME ,
                    disabled: false,
                    children: [],
                    expanded: false
                },
                {

                    id:'Application Settings112',
                    name: "Mouse Controls",
                    type:MainMenuItems.SETTINGS_MOUSE_CONTROLS,
                    path:Routes.SETTINGS_MOUSE_CONTROLS,
                    disabled: false,
                    children: [],
                    expanded: false
                }

                    
            ]
        },

        // leftbar bottom options
        {
            id:'12',
            name: 'More',
            type:MainMenuItems.MORE,
            path:Routes.MORE,
            disabled: false,
            children: [],
            expanded: false

        },
        {
            id:'13',
            name: 'Add Group',
            type: MainMenuItems.ADD_GROUP,
            path: Routes.ADD_GROUP,
            disabled: false,
            children: [],
            isEditMode: true,
            expanded: false
        }
    ],
    userCreatedMenuItems: [

    ],
    activeTab: null,
    defaultOptions: [
        '1',
        'Geometry11',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7'
    ],
    bottomTabOptions: [
        '12',
        '13'
    ],
    temporaryTab: null
}

export const mainMenuSlice = createSlice({
    name: 'mainMenu',
    initialState,
    reducers: {
        addMenuItem: (state, action: PayloadAction<{menuItem: MainMenuItem}>) => {
            const {menuItem} = action.payload;
            state.menuItems.push(menuItem);

        },
        updateMenuItem: (state, action: PayloadAction<{menuItem: MainMenuItem}>) => {
            const {menuItem} = action.payload;
            let idx = state.menuItems.findIndex(e => e.id === menuItem.id);
            if(idx !== -1){
                state.menuItems[idx].id = menuItem.id;
                state.menuItems[idx].isEditMode = menuItem.isEditMode;
                state.menuItems[idx].disabled = menuItem.disabled;
                state.menuItems[idx].expanded = menuItem.expanded;
                state.menuItems[idx].name = menuItem.name;
                state.menuItems[idx].path = menuItem.path;
                state.menuItems[idx].type = menuItem.type;
                state.menuItems[idx].children = menuItem.children;
            }
        },
        deleteMenuItem: (state, action: PayloadAction<{menuItemId: string}>) => {
            const {menuItemId} = action.payload;
            let idx = state.menuItems.findIndex(e => e.id === menuItemId);
            if(idx !== -1) {
                state.menuItems.splice(idx, 1);
            }
        },
        addTab: (state, action: PayloadAction<{menuItemId:string}>) => {
            state.defaultOptions.push(action.payload.menuItemId);
        },
        removeTab: (state, action: PayloadAction<{menuItemId: string}>) => {
            let id = action.payload.menuItemId;
            let idx = state.defaultOptions.findIndex(e => e === id);
            if(idx !== -1)
            state.defaultOptions.splice(idx,1);
        },
        setActiveTab: (state, action: PayloadAction<{menuItem: MainMenuItem | null}>) => {
            const {menuItem} = action.payload;
            if(menuItem && 
                (state.defaultOptions.includes(menuItem.id) || state.bottomTabOptions.includes(menuItem.id))
            ) {
                mainMenuSlice.caseReducers.setTemporartyTab(state,{
                    payload: {
                        menuItemID: null
                    },
                    type: 'mainMenuSlice/setTemporaryTab'
                })
            }
            else{
                mainMenuSlice.caseReducers.setTemporartyTab(state,{
                    payload: {
                        menuItemID: menuItem? menuItem.id: null
                    },
                    type: 'mainMenuSlice/setTemporaryTab'
                })
            }
            state.activeTab = menuItem;
        },
        setTemporartyTab: (state, action: PayloadAction<{menuItemID: string | null}>) => {
            state.temporaryTab = action.payload.menuItemID;
        },
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
export const {togglePanel, addMenuItem, updateMenuItem, deleteMenuItem, addTab, removeTab, setChildItem, setActiveTab} = mainMenuSlice.actions;
//selectors
export const selectMainMenu = (state:RootState) => state.mainMenu 
export const selectMainMenuItems = (state:RootState) => state.mainMenu.menuItems
export const getItem = (id:string, items: MainMenuItem[]): MainMenuItem => {
    let r = null;
    for(let i=0; i< items.length; i++) {
        let item = items[i];
        if(item.id === id){
            r = item;
            break;
        }
        else{
           r = getItem(id,item.children);
           if(r)
           break;
        }
    }
    return r as MainMenuItem;
}
export const getItemFromPath = (path:string, items: MainMenuItem[]): MainMenuItem | null => {
    let r = null;
    for(let i=0; i< items.length; i++) {
        let item = items[i];
        if(item.path === path){
            r = item;
            break;
        }
        else{
           r = getItemFromPath(path,item.children);
           if(r)
           break;
        }
    }
    return r as MainMenuItem;
}
export const selectActiveTab = (state:RootState): MainMenuItem | null => state.mainMenu.activeTab 
export const selectDefaultOptions = (state:RootState): MainMenuItem[] => state.mainMenu.defaultOptions.map(id => getItem(id, state.mainMenu.menuItems)) as MainMenuItem[]
export const selectBottonTabOptions = (state:RootState): MainMenuItem[] => state.mainMenu.bottomTabOptions.map(id =>  getItem(id, state.mainMenu.menuItems)) as MainMenuItem[]
export const selectLeafMainMenuItems = (state:RootState): MainMenuItem[] => {
    let items: MainMenuItem[] = [];
    state.mainMenu.menuItems.forEach(item => {
        if(item.children.length > 0) {
            items.push(...item.children);
        }
        else{
            items.push(item);
        }
    })
    return items;
}
export const selectTemporaryTab = (state:RootState): MainMenuItem | null => state.mainMenu.temporaryTab ? getItem(state.mainMenu.temporaryTab,state.mainMenu.menuItems) : null
export default mainMenuSlice.reducer;