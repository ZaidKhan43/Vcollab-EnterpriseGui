import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {descend, prop, sortWith} from "ramda";

export enum notificationType {
    NETWORK_TRANSFER_MESSAGE = 0,
    SIMPLE_MESSAGE = 1,
}

export enum iconType {
    DOWNLOADING = 0,
    UPLOADING = 1,
    PAUSE = 2,
    CANCELLED = 3,
    APPLIED = 4,
    COMPLETED = 5,
}

type networkData = {
    totalSize: number,
    transfferedSize: number,
    timeLeft: string,
    pause: boolean,
    cancel: boolean,
}

type simpleData = {
    body: string[],
}

interface notificationList {
    id: number,
    time: Date,
    card:{
        icon:iconType,
        type:notificationType,
        title: string,
        data: simpleData | networkData,
    },
    collapsed:boolean,
    tags: string[],
}

type messages = {
    notificationLists : notificationList[],
    search : string,
}

const initialState : messages = {
    notificationLists : [
        {
            id:0,
            time: new Date(),
            card:{
                type:notificationType.NETWORK_TRANSFER_MESSAGE,
                title:"Downloading Simplified Mesh",
                icon:iconType.DOWNLOADING,
                data:{
                    totalSize:2024,
                    transfferedSize:1024,
                    timeLeft:"4 munites left",
                    pause: false,
                    cancel: false,
                },
            },
            collapsed:true,
            tags:["Display Modes"],
        },
        {
            id:1,
            time: new Date(),
            card: {
                type:notificationType.SIMPLE_MESSAGE,
                title:"Applied ColorPlot",
                icon:iconType.APPLIED,
                data:{
                    body:[],
                },
            },
            collapsed:true,
            tags:["Color Maps"],
        },
        {
            id:2,
            time: new Date(),
            card:{
                type:notificationType.NETWORK_TRANSFER_MESSAGE,
                title:"Downloaded Show Mesh",
                icon:iconType.COMPLETED,
                data:{
                    totalSize:2024,
                    transfferedSize:2024,
                    timeLeft:"",
                    pause:false,
                    cancel:false,
                },
            },
            collapsed:true,
            tags:["Display Modes"],
        },
        {
            id:3,
            time: new Date(),
            card:{
                type:notificationType.NETWORK_TRANSFER_MESSAGE,
                title:"Paused Simplified Mesh",
                icon: iconType.PAUSE,
                data:{
                    totalSize:4048,
                    transfferedSize:1028,
                    timeLeft:"4 Minutes Left",
                    pause:true,
                    cancel:false,
                },
            },
            collapsed:true,
            tags:["Display Modes"],
        },
    ],

    search: "All",
}

export const messageSlice = createSlice({
    name: "message",
    initialState : initialState,
    reducers: {
        editPause: (state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index = state.notificationLists.findIndex((item) => item.id === action.payload.id);
            if(index >= 0){
                let changeItem = state.notificationLists[index];
                if(changeItem.card.type === notificationType.NETWORK_TRANSFER_MESSAGE){
                    changeItem.card.data.pause = action.payload.value;
                    state.notificationLists[index] = changeItem;
                }
               
            }
        },
        
        editCancel: (state,action: PayloadAction<number>) => {
            const index = state.notificationLists.findIndex((item) => item.id === action.payload);
            if(index >= 0){
                let changeItem = state.notificationLists[index];
                if(changeItem.card.type === notificationType.NETWORK_TRANSFER_MESSAGE){
                    changeItem.card.data.cancel = true;
                    state.notificationLists[index] = changeItem;
                }
            }
        },

        editCollapse:(state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index = state.notificationLists.findIndex((item) => item.id === action.payload.id);
            if(index >= 0){
                let changeItem = state.notificationLists[index];
                changeItem.collapsed = action.payload.value;
                state.notificationLists[index] = changeItem;
            }
        },

        editSearch :(state,action : PayloadAction<string>) => {
            state.search = action.payload; 
        },
    }
})


export default messageSlice.reducer;
export const {editPause , editCancel , editCollapse, editSearch} = messageSlice.actions;

//selectors

export const filteredNotificationList = (state : RootState) => {

    const search = state.message.search;
    let filteredNotificationList : notificationList[];
    if(search === "All")
        filteredNotificationList = state.message.notificationLists
    else
        filteredNotificationList = state.message.notificationLists.filter(item => item.tags.includes(search))
    // return(notificationList)

    const sortedNotificationList = sortWith([descend(prop("time"))], filteredNotificationList);
    return(sortedNotificationList)
  }