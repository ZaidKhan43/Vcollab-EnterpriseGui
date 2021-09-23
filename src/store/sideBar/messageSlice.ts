import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {descend, prop, sortWith} from "ramda";

export enum NotificationType {
    NETWORK_TRANSFER_MESSAGE = 0,
    SIMPLE_MESSAGE = 1,
}

export enum IconType {
    TRANSFERING = 0,
    PAUSE = 1,
    CANCELLED = 2,
    APPLIED = 3,
    COMPLETED = 4,
}

type NetworkData = {
    totalSize: number,
    transfferedSize: number,
    timeLeft: string,
    pause: boolean,
    cancel: boolean,
}

type SimpleData = {
    body: string[],
}

export type NotificationList= {
    id: number,
    time: Date,
    card:{
        icon:IconType,
        type:NotificationType,
        title: string,
        data: SimpleData | NetworkData,
    },
    collapsed:boolean,
    tags: string[],
}

type messages = {
    notificationLists : NotificationList[],
}

const initialState : messages = {
    notificationLists : [
        {
            id:0,
            time: new Date(),
            card:{
                type: NotificationType.NETWORK_TRANSFER_MESSAGE,
                title: "Downloading Simplified Mesh",
                icon: IconType.TRANSFERING,
                data:{
                    totalSize: 2024,
                    transfferedSize: 1024,
                    timeLeft: "4 munites left",
                    pause: false,
                    cancel: false,
                },
            },
            collapsed: true,
            tags: ["Display Modes",],
        },
        {
            id:1,
            time: new Date(),
            card: {
                type: NotificationType.SIMPLE_MESSAGE,
                title: "Applied ColorPlot",
                icon: IconType.APPLIED,
                data:{
                    body: [],
                },
            },
            collapsed: true,
            tags: ["Color Maps"],
        },
        {
            id:2,
            time: new Date(),
            card:{
                type:NotificationType.NETWORK_TRANSFER_MESSAGE,
                title:"Downloading Show Mesh",
                icon:IconType.COMPLETED,
                data:{
                    totalSize:2024,
                    transfferedSize:2024,
                    timeLeft:"",
                    pause:false,
                    cancel:false,
                },
            },
            collapsed:true,
            tags:["Display Modes",],
        },
        {
            id:3,
            time: new Date(),
            card:{
                type:NotificationType.NETWORK_TRANSFER_MESSAGE,
                title:"Downloading Simplified Mesh",
                icon: IconType.PAUSE,
                data:{
                    totalSize:4048,
                    transfferedSize:1028,
                    timeLeft:"4 Minutes Left",
                    pause:true,
                    cancel:false,
                },
            },
            collapsed:true,
            tags:["Display Modes",],
        },

        {
            id:4,
            time: new Date(),
            card:{
                type:NotificationType.NETWORK_TRANSFER_MESSAGE,
                title:"Downloading Simplified Mesh",
                icon: IconType.COMPLETED,
                data:{
                    totalSize:4048,
                    transfferedSize:4048,
                    timeLeft:"4 Minutes Left",
                    pause:true,
                    cancel:false,
                },
            },
            collapsed:true,
            tags:["Display Modes",],
        },
    ],
}

export const messageSlice = createSlice({
    name: "message",
    initialState : initialState,
    reducers: {
        editPause: (state,action: PayloadAction<{id:number, value:boolean}>) => {
            const index = state.notificationLists.findIndex((item) => item.id === action.payload.id);
            if(index >= 0){
                let changeItem = state.notificationLists[index];
                if(changeItem.card.type === NotificationType.NETWORK_TRANSFER_MESSAGE){
                    (changeItem.card.data as NetworkData).pause = action.payload.value;
                    if(action.payload.value === true)
                        changeItem.card.icon = IconType.PAUSE;
                    else
                        changeItem.card.icon = IconType.TRANSFERING;
                        
                    state.notificationLists[index] = changeItem;
                }
               
            }
        },
        
        editCancel: (state,action: PayloadAction<number>) => {
            const index = state.notificationLists.findIndex((item) => item.id === action.payload);
            if(index >= 0){
                let changeItem = state.notificationLists[index];
                if(changeItem.card.type === NotificationType.NETWORK_TRANSFER_MESSAGE){
                    (changeItem.card.data as NetworkData).cancel = true;
                    changeItem.card.icon = IconType.CANCELLED;
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
            if(action.payload === "All"){
                state.notificationLists.forEach( (item, index) => {
                    item.collapsed = true;
                    state.notificationLists[index] = item;
                })
            }

            else{
                if(action.payload === "Network Transfer"){
                    state.notificationLists.forEach( (item, index) => {
                        const data = item.card.data as NetworkData;
                        if(item.card.type === NotificationType.NETWORK_TRANSFER_MESSAGE && data.cancel === false && data.totalSize !== data.transfferedSize){
                            item.collapsed = true;
                            state.notificationLists[index] = item;
                        }

                        else{
                            item.collapsed = false;
                            state.notificationLists[index] = item;
                        }
                    })
                }
                else{ 
                    state.notificationLists.forEach( (item, index) => {
                        if(item.tags.includes(action.payload)){
                            item.collapsed = true;
                            state.notificationLists[index] = item;
                        }
                        else{
                            item.collapsed = false;
                            state.notificationLists[index] = item;
                        }
                    })
                }
            }
        },

        fileTransferUpdate:(state) => {
            state.notificationLists.forEach((item,index) => {
                const data = item.card.data as NetworkData;
                if(item.card.type === NotificationType.NETWORK_TRANSFER_MESSAGE && data.pause === false && data.cancel === false ){
                    const onePercentage = parseInt((data.totalSize / 100).toString());

                    if(data.transfferedSize + onePercentage < data.totalSize)
                        data.transfferedSize = data.transfferedSize + onePercentage;
                    else
                        data.transfferedSize = data.totalSize

                    if(data.transfferedSize === data.totalSize)
                        item.card.icon = IconType.COMPLETED;

                    state.notificationLists[index] = item;
                }
            })
        },
    }
})


export default messageSlice.reducer;
export const {editPause , editCancel , editCollapse, editSearch, fileTransferUpdate} = messageSlice.actions;

//selectors

export const sortedNotification = (state : RootState) => {

    const sortedNotificationList = sortWith([descend(prop("time"))], state.message.notificationLists);
    return(sortedNotificationList)
  }