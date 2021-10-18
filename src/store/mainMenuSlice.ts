import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Routes } from '../routes';
import type { RootState } from './index';

export type MainMenuItemChild = {
    id:string,
    name: string,
    type: MainMenuItems,
    path: Routes,
    disabled: boolean,
}

export type MainMenuItem = {
    id:string,
    name: string,
    type: MainMenuItems,
    path: Routes,
    expanded: boolean,
    children: MainMenuItemChild[]
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
    LABELS_2D_NOTES,
    LABELS_3D_LABELS,
    LABELS_MEASUREMENTS,

    TRANSFORMATIONS,

    ANIMATIONS,

    SLIDES,

    MESSAGES,

    SETTINGS,
    SETTINGS_THEME, 
    SETTINGS_MOUSE_CONTROLS

}

export type MainMenu = {
    menuItems: MainMenuItem[] 
}
const initialState: MainMenu ={
    menuItems: [
        {
            id:'1',
            expanded: false,
            name: "Geometry",
            type: MainMenuItems.GEOMETRY,
            path: Routes.GEOMETRY,
            children: [
                {
                    id: '11',
                    name: "Assembly Tree",
                    type:MainMenuItems.GEOMETRY_ASSEMBLY_TREE,
                    path: Routes.GEOMETRY_ASSEMBLY_TREE,
                    disabled: false,
                },
                {
                    id: '12',
                    name: "Search",
                    type:MainMenuItems.GEOMETRY_SEARCH,
                    path: Routes.GEOMETRY_SEARCH,
                    disabled: false,
                  },
                  {
                    id: '13',
                    name: "Display Mode",
                    type:MainMenuItems.GEOMETRY_DISPLAY_MODE,
                    path: Routes.GEOMETRY_DISPLAY_MODES,
                    disabled: false,
                  },
                  {
                    id: '14',
                    name: "Material Color",
                    type:MainMenuItems.GEOMETRY_MATERIAL_COLOR,
                    path: Routes.GEOMERTY_MATERIAL_COLOR,
                    disabled: false,
                  },
                  {
                    id: '15',
                    name: "Coordinate System",
                    type:MainMenuItems.GEOMETRY_COORDINATE_SYSTEM,
                    path: Routes.HOME,
                    disabled: false,
                  },
                  {
                    id: '16',
                    name: "Transform",
                    type:MainMenuItems.GEOMETRY_TRANSFORMATION,
                    path: Routes.HOME,
                    disabled: false,
                  }
            ]
        },
        {
            id:'2',
            expanded: false,
            name: "Field",
            type: MainMenuItems.FIELD,
            path: Routes.HOME,
            children: [
                {
                    id:'21',
                    name: "Steps & Subcases",
                    type:MainMenuItems.FIELD_STEPS_AND_SUBCASES,
                    path:Routes.FIELD_STEPS_AND_SUBCASES,
                    disabled: false,
                  },
                {
                    id: '22',
                    name: "Variables",
                    type:MainMenuItems.FIELD_VARIABLES,
                    path:Routes.FIELD_VARIABLES,
                    disabled: false,
                  },
                  {
                    id:'23',
                    name: "Derived Types",
                    type:MainMenuItems.FIELD_DERIVED_TYPES,
                    path:Routes.FIELD_DERIVED_TYPES,
                    disabled: false,
                  },
                  {
                    id:'24',
                    name: "Sections & Layers",
                    type:MainMenuItems.FIELD_SECTIONS_AND_LAYERS,
                    path:Routes.FIELD_SECTIONS_AND_LAYERS,
                    disabled: false,
                  },
            ]
        },
        {
            id:'3',
            expanded:false,
            name: "Scene",
            type: MainMenuItems.SCENE,
            path:Routes.SCENE,
            children: [
                {
                    id:'31',
                    name: "Camera",
                    type:MainMenuItems.SCENE_CAMERA,
                    path:Routes.SCENE_CAMERA,
                    disabled:false
                },
                {
                    id:'32',
                    name: "Background",
                    type:MainMenuItems.SCENE_BACKGROUND,
                    path:Routes.SCENE_BACKGROUND,
                    disabled: false,
                },
                {
                    id:'33',
                    name: "Axis Triad",
                    type:MainMenuItems.SCENE_AXIS_TRIAD,
                    path:Routes.SCENE_AXIS_TRIAD,
                    disabled: false
                },
                {
                    id:'34',
                    name: "Light",
                    type:MainMenuItems.SCENE_LIGHT,
                    path:Routes.SCENE_LIGHT,
                    disabled: false
                },
            ]
        },
        {
            id:'4',
            expanded:false,
            name: "Color Maps",
            type:MainMenuItems.COLOR_MAPS,
            path:Routes.COLORMAPS,
            children:[
                {
                    id:'41',
                    name: "List",
                    type:MainMenuItems.COLOR_MAPS_LIST,
                    path:Routes.COLORMAPS_LIST,
                    disabled: false,
                },    
                {
                    id:'42',
                    name: "Edit",
                    type:MainMenuItems.COLOR_MAPS_EDIT,
                    path:Routes.COLORMAPS_EDIT,
                    disabled: false,
                },
                {
                    id:'43',
                    name: "Variable",
                    type:MainMenuItems.COLOR_MAPS_VARIABLE,
                    path:Routes.COLORMAPS_VARIABLE,
                    disabled: false,
                },
                {
                    id:'44',
                    name: "Steps & Subcase",
                    type:MainMenuItems.COLOR_MAPS_STEPS_AND_SUBCASE,
                    path:Routes.COLORMAPS_STEPS_AND_SUBCASE,
                    disabled: false,
                },
                {
                    id:'45',
                    name: "Section & Layer",
                    type:MainMenuItems.COLOR_MAPS_SELECTION_AND_LAYER,
                    path:Routes.COLORMAPS_SELECTION_AND_LAYER,
                    disabled: false,
                },
                {
                    id:'46',
                    name: "Derived Type",
                    type:MainMenuItems.COLOR_MAPS_DERIVED_TYPES,
                    path:Routes.COLORMAPS_DERIVED_TYPES,
                    disabled: false,
                },
                {
                    id:'47',
                    name: "Color Palette",
                    type:MainMenuItems.COLOR_MAPS_COLOR_PALETTE,
                    path:Routes.COLORMAPS_COLOR_PALETTE,
                    disabled: false,
                },
                {
                    id:'48',
                    name: "Value Setting",
                    type:MainMenuItems.COLOR_MAPS_VALUE_SETTINGS,
                    path:Routes.COLORMAPS_VALUE_SETTINGS,
                    disabled: false,
                },
                {
                    id:'49',
                    name: "Legend Setting",
                    type:MainMenuItems.COLOR_MAPS_LEGEND_SETTINGS,
                    path:Routes.COLORMAPS_LEGEND_SETTINGS,
                    disabled: false,
                },
            ]
        },
        {
            id:'5',
            expanded: false,
            name: "Clip Plane",
            type: MainMenuItems.CLIP_PLANE,
            path:Routes.CLIPPLANES,
            children: [
                {
                    id:'51',
                    name: "List",
                    type:MainMenuItems.CLIP_PLANE_LIST,
                    path:Routes.CLIPPLANES_LIST,
                    disabled: false,
                },
                {
                    id:'52',
                    name: "Settings",
                    type:MainMenuItems.CLIP_PLANE_SETTINGS,
                    path:Routes.CLIPPLANES_SETTINGS,
                    disabled: true,
                },
                {
                    id:'53',
                    name: "Transform",
                    type:MainMenuItems.CLIP_PLANE_TRANSFORM,
                    path:Routes.CLIPPLANES_TRANSFORMATION,
                    disabled: true,
                },
            ]
        },
        // {
        //     id:'6',
        //     expanded: false,
        //     name: "Labels",
        //     type: MainMenuItems.LABELS,
        //     path:Routes.LABELS,
        //     children: [
        //         {
        //             id:'61',
        //             name: "2D Notes",
        //             type:MainMenuItems.LABELS_2D_NOTES,
        //             path:Routes.LABELS_2D_NOTES,
        //             disabled: false,
        //         },
        //         {
        //             id:'62',
        //             name: "3D Labels",
        //             type:MainMenuItems.LABELS_3D_LABELS,
        //             path:Routes.LABELS_3D_LABELS,
        //             disabled: false,
        //         },
        //         {
        //             id:'63',
        //             name: "Measurements",
        //             type:MainMenuItems.LABELS_MEASUREMENTS,
        //             path:Routes.LABELS_MEASUREMENTS,
        //             disabled: false,
        //         },
        //     ],
        // },
        // {
        //     id:'7',
        //     expanded: false,
        //     name: "Transformations",
        //     type: MainMenuItems.TRANSFORMATIONS,
        //     path:Routes.HOME,
        //     children: []
        // },
        // {
        //     id:'8',
        //     expanded: false,
        //     name: "Animations",
        //     type: MainMenuItems.ANIMATIONS,
        //     path:Routes.HOME,
        //     children: []   
        // },
        // {
        //     id:'9',
        //     expanded: false,
        //     name: "Slides",
        //     type: MainMenuItems.SLIDES, 
        //     path:Routes.HOME,
        //     children: []
        // },
        {
            id:'10',
            expanded: false,
            name: "Messages",
            type: MainMenuItems.MESSAGES,
            path:Routes.MESSAGES,
            children:[]
        },
        {
            id:'11',
            expanded: false,
            name: "Application Settings",
            type: MainMenuItems.SETTINGS,
            path:Routes.HOME,
            children: [
                {

                    id:'111',
                    name: "Color Theme",
                    type:MainMenuItems.SETTINGS_THEME,
                    path:Routes.SETTINGS_THEME ,
                    disabled: false,
                },
                {

                    id:'112',
                    name: "Mouse Controls",
                    type:MainMenuItems.SETTINGS_MOUSE_CONTROLS,
                    path:Routes.SETTINGS_MOUSE_CONTROLS,
                    disabled: false,
                }

                    
            ]
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