import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {TreeNode, ITreeState} from "./shared/ProductExplorer/types";
import {saveTreeReducer, checkNodeReducer, highlightNodeReducer, invertNodeReducer, expandNodeReducer, toggleVisibilityReducer, setCheckedVisibilityReducer} from "./shared/ProductExplorer/reducers";
import { pid } from 'process';
// Define a type for the slice state

export enum SlideType {
    GROUP = 0,
    VIEW = 1,
}

interface SlideTreeNode extends TreeNode {
    downloaded : boolean,
    slideType: SlideType,
    data : {
        cameraView?:string,
        position?: string,
        image?: string,
    },
}

interface SlideTreeState extends ITreeState {
    data: {[id:string]:SlideTreeNode},
    rootIds: string[],
    appliedSlide: string,
    selectedSlide: string,
    
    idGenerator: number,
    defaultValue: SlideTreeNode,

    currentData : {
        cameraView?:string,
        position?: string,
        image?: string,
    },

    stepCount : number,
    viewCount : number,
    groupCount : number,

}

// Define the initial state using that type
const initialState: SlideTreeState = {
    data: {
        "0" : {
            id : "0",
                pid : "-1",
                title: "Presentation 1",
                children: ["3","4","5","6","7","8"],
                state: {
                    expanded: true,
                    visibility: true,
                },
                downloaded: false,
                slideType : SlideType.GROUP,
                data:{},
                attributes: {},
        },

      "3" : {
            id : "3",
                pid : "0",
                title: "Stress Animation",
                children: ["9","10","11","12","13"],
                state: {
                    expanded: true,
                    visibility: true,
                },
                downloaded: false,
                slideType: SlideType.GROUP,
                data:{},
                attributes: {},
        },

        "9" : {
          id : "9",
              pid : "3",
              title: "Step 1",
              children: [],
              state: {
                  expanded: true,
                  visibility: true,
              },
              downloaded:false,
              slideType: SlideType.VIEW,
              data : {cameraView:"persp", position:"(3,13)", image:""},
              attributes: {},
      },

      "10" : {
        id : "10",
            pid : "3",
            title: "Step 2",
            children: [],
            state: {
                expanded: true,
                visibility: true,
            },
            downloaded: true,
            slideType: SlideType.VIEW,
            data : {cameraView:"ortho", position:"(23,13)", image:""},
            attributes: {},
    },

    "11" : {
      id : "11",
          pid : "3",
          title: "Step 3",
          children: [],
          state: {
              expanded: true,
              visibility: true,
          },
          downloaded: false,
          slideType: SlideType.VIEW,
          data : {cameraView:"persp", position:"(3,13)", image:""},
          attributes: {},
  },

  "12" : {
    id : "12",
        pid : "3",
        title: "Step 4",
        children: [],
        state: {
            expanded: true,
            visibility: true,
        },
        downloaded:false,
        slideType: SlideType.VIEW,
        data : {cameraView:"ortho", position:"(3,13)", image:""},
        attributes: {},
},

"13" : {
  id : "13",
      pid : "3",
      title: "Step 5",
      children: [],
      state: {
          expanded: true,
          visibility: true,
      },
      downloaded: true,
      slideType: SlideType.VIEW,
      data : {cameraView:"persp", position:"(3,13)", image:""},
      attributes: {},
},




        "4" : {
          id : "4",
              pid : "0",
              title: "Reaction Force",
              children: [],
              state: {
                  expanded: true,
                  visibility: true,
              },
              downloaded: true,
              slideType: SlideType.VIEW,
              data : {cameraView:"persp", position:"(123,13)", image:""},
              attributes: {},
      },

      "5" : {
        id : "5",
            pid : "0",
            title: "Applied Loads",
            children: [],
            state: {
                expanded: true,
                visibility: true,
            },
            downloaded: false,
            slideType: SlideType.VIEW,
            data : {cameraView:"persp", position:"(3,13)", image:""},
            attributes: {},
    },

    "6" : {
      id : "6",
          pid : "0",
          title: "Displacement",
          children: [],
          state: {
              expanded: true,
              visibility: true,
          },
          downloaded:true,
          slideType: SlideType.VIEW,
          data : {cameraView:"ortho", position:"(3,13)", image:""},
          attributes: {},
  },

  "7" : {
    id : "7",
        pid : "0",
        title: "View 1",
        children: [],
        state: {
            expanded: true,
            visibility: true,
        },
        downloaded: true,
        slideType: SlideType.VIEW,
        data : {cameraView:"persp", position:"(123,13)", image:""},
        attributes: {},
},

"8" : {
  id : "8",
      pid : "0",
      title: "View 2",
      children: [],
      state: {
          expanded: true,
          visibility: true,
      },
      downloaded: false,
      slideType: SlideType.VIEW,
      data : {cameraView:"ortho", position:"(3,13)", image:""},
      attributes: {},
},

        "1" : {
          id : "1",
              pid : "-1",
              title: "Group 1",
              children: [],
              state: {
                  expanded: true,
                  visibility: true,
              },
              downloaded: false,
              slideType: SlideType.GROUP,
              data:{},
              attributes: {},
      },

      "2" : {
        id : "2",
            pid : "-1",
            title: "Group 2",
            children: [],
            state: {
                expanded: true,
                visibility: true,
            },
            downloaded:false,
            slideType: SlideType.GROUP,
            data:{},
            attributes: {},
    },
    },
    rootIds: ["0","1","2"],
    appliedSlide : "8",
    selectedSlide : "6",

    idGenerator: 13,

    defaultValue: {
        id:"-1",
        title:"",
        pid:"-1",
        children: [],
                state: {
                    expanded: true,
                    visibility: true,
                },
                downloaded: false,
                slideType : SlideType.GROUP,
                data : {},
                attributes: {},

    },

    currentData : {cameraView:"ortho", position:"(23,213)", image:""},

    stepCount : 5,
    viewCount : 2,
    groupCount : 2,
}


export const slideSlice = createSlice({
  name: 'slide',
  initialState,
  reducers: {
    saveTree: saveTreeReducer,
    checkNode: checkNodeReducer,
    highlightNode: highlightNodeReducer,
    invertNode: invertNodeReducer,
    expandNode: expandNodeReducer,
    toggleVisibility: toggleVisibilityReducer,
    setCheckedVisibility: setCheckedVisibilityReducer,
   
    setSlideSelection: (state, action: PayloadAction<string>) => {

        if(state.selectedSlide === action.payload)
            state.selectedSlide = "-1";
        else 
        state.selectedSlide = action.payload;
    }, 

    createNode : (state, action :PayloadAction<string>) => {
        state.idGenerator++;
        let newData = JSON.parse(JSON.stringify(state.defaultValue))

        newData.id = `${state.idGenerator}`;
        newData.pid = action.payload;
        
        switch(action.payload){
            case "-1":
                state.groupCount ++;
                newData.title =  `Group ${state.groupCount}`;
                newData.data = {}
                state.data[`${state.idGenerator}`] =newData;
                state.rootIds.push(newData.id)
            break;

            case "3":
                state.stepCount ++;
                newData.title =  `Step ${state.stepCount}`;
                newData.slideType = SlideType.VIEW;
                newData.data = JSON.parse(JSON.stringify(state.currentData));
                state.data[`${state.idGenerator}`] =newData;
                state.data[`${action.payload}`].children.push(newData.id)
            break;

            default:
                state.viewCount ++;
                newData.title =  `View ${state.viewCount}`;
                newData.slideType = SlideType.VIEW;
                newData.data = JSON.parse(JSON.stringify(state.currentData));
                state.data[`${state.idGenerator}`] =newData;
                state.data[`${action.payload}`].children.push(newData.id) 
            break;
        }
        
    },

    downloadFile : (state, action : PayloadAction<string>) => {
        state.data[ action.payload].downloaded = true;
    },

    downloadParentFolder : (state, action: PayloadAction<string>) => {
        const downloadParentFolderFunction = (pId : string) => {
            if(pId !== "-1"){
                const parentId = state.data[pId].id
                const parentChildren = state.data[parentId ? parentId : -1].children;
                let downloadedCount = 0;
    
                parentChildren.forEach(item => {
                    if (state.data[item].downloaded)
                        downloadedCount ++;
                })
    
                if (parentChildren.length === downloadedCount)
                    state.data[parentId ? parentId : -1].downloaded = true;
                else
                    state.data[parentId ? parentId : -1].downloaded = false;
                    
                if(state.data[parentId].pid !== "-1"){
                    const newPId = state.data[parentId].pid
                    downloadParentFolderFunction(newPId ? newPId : "-1");
                }                   
            }
        }

        downloadParentFolderFunction(action.payload);      
    },

    applyView: (state, action : PayloadAction<string>) => {
        state.appliedSlide = action.payload;
    },

    replaceViewData : (state,action : PayloadAction<string>) => {
        state.data[action.payload].data = JSON.parse(JSON.stringify(state.currentData))
    },

    deleteNode : (state, action: PayloadAction<string>) => {
       const toDelete = state.data[action.payload]
       state.selectedSlide = "-1";

        if(toDelete.slideType === SlideType.VIEW){
            delete state.data[action.payload];
            Object.keys(state.data).forEach(key => {
                state.data[key].children = state.data[key].children.filter(item => item !== action.payload)
            })
        }

        const deleteGroup = (id : string) => {
        const children = state.data[id].children;
            children.forEach(item => {
                if(state.data[id].slideType === SlideType.VIEW)
                    delete state.data[id];

                else deleteGroup(item);
            })

            if(state.data[id].pid === "-1"){
                delete state.data[id];
                state.rootIds = state.rootIds.filter(item => item !== id)
            }

            else{
                delete state.data[id];
                Object.keys(state.data).forEach(key => {
                    state.data[key].children = state.data[key].children.filter(item => item !== id)
                })
            }
        }

        if(toDelete.slideType === SlideType.GROUP){
            deleteGroup(action.payload)
        }
    },


    pasteSlide : (state, action: PayloadAction<{copied: SlideTreeNode, pid : string}>) => {
        let copiedSlideData = JSON.parse(JSON.stringify(action.payload.copied));

        const copyPasteGroup = (toCopiedGroupData : any, pid : string) => {

            console.log(toCopiedGroupData)

            const toCopiedChildId = toCopiedGroupData.children;
            const toCopiedChildren : any[] = [];

            toCopiedChildId.forEach((item : string) =>{
                toCopiedChildren.push(JSON.parse(JSON.stringify(state.data[item])));
            })

            toCopiedGroupData.children = [];
            state.idGenerator ++;
            state.groupCount ++;

            toCopiedGroupData.id = `${state.idGenerator}`;
            toCopiedGroupData.pid = pid;
            toCopiedGroupData.title = `Group ${state.groupCount}`;
            toCopiedGroupData.state.expanded = false;
            copiedSlideData.downloaded = false;

            // console.log("cp[",toCopiedGroupData )

            if(pid === "-1"){
            state.data[`${state.idGenerator}`] = toCopiedGroupData;
            state.rootIds.push(toCopiedGroupData.id)
            }

            else{
                state.data[`${state.idGenerator}`] = toCopiedGroupData;
                state.data[pid].children.push(toCopiedGroupData.id)
            }

            toCopiedChildren.forEach(item => {
                if(item.slideType === SlideType.VIEW){
                    state.idGenerator ++;
                    state.viewCount ++;

                    item.id = `${state.idGenerator}`;
                    item.title = `View ${state.viewCount}`;
                    item.pid = toCopiedGroupData.id;
                    item.downloaded = false;
                
                    state.data[`${state.idGenerator}`] = item;
                    state.data[item.pid].children.push(item.id)
                }

                if(item.slideType === SlideType.GROUP){
                    pid = toCopiedGroupData.id;
                    copyPasteGroup(item, pid);
                }
            })
        }

        if(copiedSlideData.slideType === SlideType.GROUP){
            copyPasteGroup(copiedSlideData, action.payload.pid);
        }

        if(copiedSlideData.slideType === SlideType.VIEW){
            if(state.selectedSlide !== "-1"){
                state.idGenerator += 1;
                state.viewCount += 1;

                copiedSlideData.id = `${state.idGenerator}`;
                copiedSlideData.title = `View ${state.viewCount}`;
                copiedSlideData.downloaded = false;
                copiedSlideData.pid = action.payload.pid;

                state.data[`${state.idGenerator}`] = JSON.parse(JSON.stringify(copiedSlideData));
                state.data[copiedSlideData.pid].children.push(copiedSlideData.id)
            }            
        }
    },

    
  }
});

//Define the Reducers
export const { 
  saveTree, 
  checkNode, 
  invertNode, 
  expandNode,
  setSlideSelection,
  createNode,
  applyView,
  replaceViewData,
  deleteNode,
  pasteSlide,
  downloadFile,
  downloadParentFolder
   } = slideSlice.actions;

//Define the selectors
export const selectSlideData = (state:RootState) => state.slide.data
export const selectRootIds = (state:RootState) => state.slide.rootIds

export default slideSlice.reducer;