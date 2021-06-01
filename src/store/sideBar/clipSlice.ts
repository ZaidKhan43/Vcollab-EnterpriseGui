import { createSlice} from '@reduxjs/toolkit';

type plane = {
    id: number,
    name: string,
    enabled: boolean,
    showClip: boolean,
    showEdge: boolean,
    showCap: boolean,
    clipCordX: number,
	  clipCordY: number,
	  clipCordZ: number,
	  clipConstD: number,
    clipNormalInverted: boolean,
    translate: number,
    translateMin: number,
    translateMax: number,
    rotate: number,
    axisX: number,
	  axisY: number,
    userInputEquation:number[],	
}

type settings= {
  defaultPlaneParameters :{
    enabled: boolean,
    showClip: boolean,
    showEdge: boolean,
    showCap: boolean,
    clipCordX: number,
	  clipCordY: number,
	  clipCordZ: number,
	  clipConstD: number,
    clipNormalInverted: boolean,
    translate: number,
    translateMin: number,
    translateMax: number,
    rotate: number,
    axisX: number,
	  axisY: number,
  },
  maxAllowedPlanes : number,
  idGenerator: number,
  clickedVal : plane | null,
}

type planes = {
  planes : plane[],
  settings : settings
};

const initialState : planes = {
  planes:[
    {
      id : 1,
      name: "Plane 1",
      enabled: true,
      showClip: true,
      showEdge: false,
      showCap: false,
      clipCordX: 5,
      clipCordY: 4,
      clipCordZ: 6,
      clipConstD:10,
      clipNormalInverted: false,
      translate: 50,
      translateMin: -200,
      translateMax: 200,
      rotate: 0,
      axisX: 0,
      axisY: 90,
      userInputEquation:[5,4,6,10 ]
    },
    {
      id : 2,
      name: "Plane 2",
      enabled: false,
      showClip: false,
      showEdge: false,
      showCap: true,
      clipCordX: 3,
      clipCordY:2,
      clipCordZ:4,
      clipConstD:10,
      clipNormalInverted: true,
      translate: -50,
      translateMin: -300,
      translateMax: 300,
      rotate: 60,
      axisX: 180,
      axisY: 90,
      userInputEquation:[3,2,4,10],
    },
  ],

  settings :{
    maxAllowedPlanes : 6,
    idGenerator :2,
    clickedVal : null,
    defaultPlaneParameters : {
      enabled: true,
      showClip: true,
      showEdge: false,
      showCap: false,
      clipCordX: 5,
      clipCordY: 4,
      clipCordZ: 6,
      clipConstD:10,
      clipNormalInverted: false,
      translate: 50,
      translateMin:-200,
      translateMax:200,
      rotate: 0,
      axisX: 0,
      axisY: 90,
    }
  }
}


export const clipSlice = createSlice({
  name: "clip",
  initialState : initialState,
  reducers: {
    createPlane: (state) => {
      if (state.planes.length < state.settings.maxAllowedPlanes){
        state.settings.idGenerator +=1 ;
        state.planes= [...state.planes,{  id: state.settings.idGenerator,name:`Plane ${state.settings.idGenerator}`, 
                                          enabled: state.settings.defaultPlaneParameters.enabled, 
                                          showClip: state.settings.defaultPlaneParameters.showClip, 
                                          showEdge: state.settings.defaultPlaneParameters.showEdge,
                                          showCap: state.settings.defaultPlaneParameters.showCap,
                                          clipCordX:state.settings.defaultPlaneParameters.clipCordX,
                                          clipCordY:state.settings.defaultPlaneParameters.clipCordY, 
                                          clipCordZ:state.settings.defaultPlaneParameters.clipCordZ,
                                          clipConstD:state.settings.defaultPlaneParameters.clipConstD,
                                          clipNormalInverted: state.settings.defaultPlaneParameters.clipNormalInverted,
                                          translate: state.settings.defaultPlaneParameters.translate,
                                          translateMin: state.settings.defaultPlaneParameters.translateMin,
                                          translateMax: state.settings.defaultPlaneParameters.translateMax,
                                          rotate: state.settings.defaultPlaneParameters.rotate,
                                          axisX: state.settings.defaultPlaneParameters.axisX,
                                          axisY: state.settings.defaultPlaneParameters.axisY,
                                          userInputEquation: [state.settings.defaultPlaneParameters.clipCordX,
                                                              state.settings.defaultPlaneParameters.clipCordY ,
                                                              state.settings.defaultPlaneParameters.clipCordZ, 
                                                              state.settings.defaultPlaneParameters.clipConstD             
                                                            ],
                                        }]
      }
    },

    editEnabled: (state, action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0 ) {
        let changeItem : any = state.planes[index];
        if(changeItem.enabled === true && changeItem.showClip === true)
          changeItem.showClip = !changeItem.showClip
        if(changeItem.enabled === false && changeItem.showClip === false)
          changeItem.showClip = !changeItem.showClip   
        changeItem.enabled = !changeItem.enabled
        
        state.planes[index] = changeItem;
      }
    },

    editShowClip : (state,action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0 ) {
        let changeItem : any = state.planes[index];
        changeItem.showClip = !changeItem.showClip;
        state.planes[index] = changeItem;
      }
    },

    editEdgeClip : (state,action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0 ) {
        let changeItem : any = state.planes[index];
        changeItem.showEdge = !changeItem.showEdge
        state.planes[index] = changeItem;
      }       
    },

    editShowCap : (state,action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.showCap = !changeItem.showCap
        state.planes[index] = changeItem;
      }
    },

    pastePlane : (state, action) => {
      if (state.planes.length < 6){
        let clone : any = {}; 
        for (let key in action.payload) {
          clone[key] = action.payload[key];
        }
        state.settings.idGenerator+=1;
        clone.id=state.settings.idGenerator;
        clone.name = `${clone.name} (Copy)`
        clone.checkbox= false;
        state.planes=[...state.planes, clone];
        //console.log("clone",clone)
        //console.log("After", state.planes)
      }
    },

    deletePlane : (state, action) => {
      const newArray = state.planes.filter(item => item.id !== action.payload);
      state.planes=[...newArray]
    },

    editPlane: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.clipCordX = action.payload.clipCordX;
        changeItem.clipCordY = action.payload.clipCordY;
        changeItem.clipCordZ = action.payload.clipCordZ;
        changeItem.clipConstD = action.payload.clipConstD;
        changeItem.clipNormalInverted = action.payload.clipNormalInverted;
        changeItem.translate = action.payload.translate;
        changeItem.rotate = action.payload.rotate;
        changeItem.axisX = action.payload.axisX;
        changeItem.axisY = action.payload.axisY;
        state.planes[index] = changeItem;
      }      
    },

    editEquation: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        if(changeItem.clipCordX !== action.payload.clipCordX || changeItem.clipCordY !== action.payload.clipCordY || changeItem.clipCordZ !== action.payload.clipCordZ)
          {
            changeItem.rotate = 0;
            changeItem.axisX = 0;
            changeItem.axisY = 0;
          }
        changeItem.clipCordX = action.payload.clipCordX;
        changeItem.clipCordY = action.payload.clipCordY;
        changeItem.clipCordZ = action.payload.clipCordZ;
        changeItem.clipConstD = action.payload.clipConstD;

        changeItem.userInputEquation[0] = action.payload.clipCordX;
        changeItem.userInputEquation[1] = action.payload.clipCordY;
        changeItem.userInputEquation[2] = action.payload.clipCordZ;
        changeItem.userInputEquation[3] = action.payload.clipConstD;
        
        state.planes[index] = changeItem;
      }
    },

    editNormalInverted: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.clipNormalInverted = !changeItem.clipNormalInverted;
        changeItem.clipCordX = (changeItem.clipCordX < 0) ? Math.abs(changeItem.clipCordX) : - Math.abs(changeItem.clipCordX);
        changeItem.clipCordY = (changeItem.clipCordY < 0) ? Math.abs(changeItem.clipCordY) : - Math.abs(changeItem.clipCordY);
        changeItem.clipCordZ = (changeItem.clipCordZ < 0) ? Math.abs(changeItem.clipCordZ) :  - Math.abs(changeItem.clipCordZ);
        changeItem.clipConstD = (changeItem.clipConstD < 0) ? Math.abs(changeItem.clipConstD) : - Math.abs(changeItem.clipConstD);
        changeItem.translate = (changeItem.translate < 0) ? Math.abs(changeItem.translate) : - Math.abs(changeItem.translate);
        state.planes[index] = changeItem;
      }
    },

    editTranslate: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.translate= action.payload.translate;
        // state.planes[index] = changeItem;
      }
    },

    editRotate: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.rotate= action.payload.rotate;
        state.planes[index] = changeItem;
      }
    },

    editAxisX: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.axisX= action.payload.axisX;
        state.planes[index] = changeItem;
      }
    },

    editAxisY: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.axisY= action.payload.axisY;
        state.planes[index] = changeItem;
      }
    },

    editPlaneName: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.name = action.payload.editName;
        state.planes[index] = changeItem;
      }
    },

    saveClickedVal: (state, action) => {
      state.settings.clickedVal= action.payload;
    },
  }
})

export const { createPlane,editEnabled,editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane, editPlane, editEquation, editNormalInverted , editTranslate, editRotate, editAxisX, editAxisY, editPlaneName, saveClickedVal} = clipSlice.actions;

export default clipSlice.reducer;
