import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { Routes } from '../routes';
import type { RootState } from './index';
import GeometryIcon from 'components/icons/geometry';
export type SearchItem = {
    id:string,
    name: string,
    path: Routes,
    icon?: any,
    disabled: boolean,
}

export type SearchState = {
    items: SearchItem[],
    prevSearches: string[],
    prevSearchesLimit: number
}
const initialState: SearchState ={
    items: [
                {
                    id: 'Geometry11',
                    name: "Assembly Tree",
                    path: Routes.GEOMETRY_ASSEMBLY_TREE,
                    disabled: false,
                    icon: GeometryIcon
                    
                },
                {
                    id: 'Geometry12',
                    name: "Search",
                    path: Routes.GEOMETRY_SEARCH,
                    disabled: false,
                    
                    
                  },
                  {
                    id: 'Geometry13',
                    name: "Display Mode",
                    
                    path: Routes.GEOMETRY_DISPLAY_MODES,
                    disabled: false,
                    
                    
                  },
                  {
                    id: 'Geometry14',
                    name: "Material Color",
                    
                    path: Routes.GEOMERTY_MATERIAL_COLOR,
                    disabled: false,
                    
                    
                  },
                    {
                    id:'Field21',
                    name: "Steps & Subcases",
                    
                    path:Routes.FIELD_STEPS_AND_SUBCASES,
                    disabled: false,
                    
                    
                  },
                {
                    id: 'Field22',
                    name: "Variables",
                   
                    path:Routes.FIELD_VARIABLES,
                    disabled: false,
                    
                    
                  },
                  {
                    id:'Field23',
                    name: "Derived Types",
                  
                    path:Routes.FIELD_DERIVED_TYPES,
                    disabled: false,
                    
                    
                  },
                  {
                    id:'Field24',
                    name: "Sections & Layers",
                  
                    path:Routes.FIELD_SECTIONS_AND_LAYERS,
                    disabled: false,
                    
                    
                  },
                {
                    id:'Scene31',
                    name: "Camera",
                  
                    path:Routes.SCENE_CAMERA,
                    disabled:false,
                    
                    
                },
                {
                    id:'Scene32',
                    name: "Background",
                  
                    path:Routes.SCENE_BACKGROUND,
                    disabled: false,
                    
                    
                },
                {
                    id:'Scene33',
                    name: "Axis Triad",
                    
                    path:Routes.SCENE_AXIS_TRIAD,
                    disabled: false,
                    
                    
                },

                {
                    id:'Color Maps41',
                    name: "List",
                  
                    path:Routes.COLORMAPS_LIST,
                    disabled: false,
                    
                    
                },    
                {
                    id:'Color Maps42',
                    name: "Edit",
                   
                    path:Routes.COLORMAPS_EDIT,
                    disabled: true,
                    
                    
                },
                {
                    id:'Color Maps43',
                    name: "Variable",
                    
                    path:Routes.COLORMAPS_VARIABLE,
                    disabled: true,
                    
                    
                },
                {
                    id:'Color Maps44',
                    name: "Steps & Subcase",
                    
                    path:Routes.COLORMAPS_STEPS_AND_SUBCASE,
                    disabled: true,
                    
                    
                },
                {
                    id:'Color Maps45',
                    name: "Section & Layer",
                   
                    path:Routes.COLORMAPS_SELECTION_AND_LAYER,
                    disabled: true,
                    
                    
                },
                {
                    id:'Color Maps46',
                    name: "Derived Type",
                  
                    path:Routes.COLORMAPS_DERIVED_TYPES,
                    disabled: true,
                    
                    
                },
                {
                    id:'Color Maps47',
                    name: "Color Palette",
                    
                    path:Routes.COLORMAPS_COLOR_PALETTE,
                    disabled: true,
                    
                    
                },
                {
                    id:'Color Maps48',
                    name: "Value Setting",
                  
                    path:Routes.COLORMAPS_VALUE_SETTINGS,
                    disabled: true,
                    
                    
                },
                {
                    id:'Color Maps49',
                    name: "Legend Setting",
                   
                    path:Routes.COLORMAPS_LEGEND_SETTINGS,
                    disabled: true,
                    
                    
                },

                {
                    id:'Clip Plane51',
                    name: "List",
                  
                    path:Routes.CLIPPLANES_LIST,
                    disabled: false,
                    
                    
                },
                {
                    id:'Clip Plane52',
                    name: "Settings",
             
                    path:Routes.CLIPPLANES_SETTINGS,
                    disabled: true,
                    
                    
                },
                {
                    id:'Clip Plane53',
                    name: "Transform",
                    
                    path:Routes.CLIPPLANES_TRANSFORMATION,
                    disabled: true,
                    
                    
                },
        {
            id:'6',
            name: "Labels",
          
            path:Routes.LABELS_LIST,
            disabled: false,
            
        },
        {
            id:'7',
            
            name: "Transformations",
            
            path:Routes.HOME,
            disabled: false,
         
        },
        {
            id:'8',
            
            name: "Animations",
            
            path:Routes.HOME,
            disabled: false,
         
        },

        {
            id:'9',
            
            name: "3D Slides",
           
            path:Routes.SLIDES,
            disabled: false,
           
        },

        {
            id:'10',
            
            name: "Messages",
           
            path:Routes.MESSAGES,
            disabled: false,
          
        },
        
                {

                    id:'Application Settings111',
                    name: "Color Theme",
                   
                    path:Routes.SETTINGS_THEME ,
                    disabled: false,
               
                },
                {

                    id:'Application Settings112',
                    name: "Mouse Controls",
    
                    path:Routes.SETTINGS_MOUSE_CONTROLS,
                    disabled: false,
                }

    ],
    prevSearches: [],
    prevSearchesLimit: 3
}

export const moreSlice = createSlice({
    name: 'more',
    initialState,
    reducers: {
        addPrevSearchItem: (state , action: PayloadAction<string>) => {
            if(action.payload === "" || state.prevSearches.includes(action.payload))
            {

            }
            else{
                state.prevSearches.push(action.payload);
                if(state.prevSearches.length > state.prevSearchesLimit)
                state.prevSearches.shift();
            }
        }
    },

})
export const {addPrevSearchItem} = moreSlice.actions;
//selectors
export const selectList = (state:RootState) => state.more.items; 
export const selectPrevSearches = (state:RootState) => state.more.prevSearches;

export default moreSlice.reducer;