import React, { useState, useEffect } from 'react'
import {ITreeNode} from '../../../../shared/RsTreeTable'
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'
import {useAppDispatch} from "../../../../../store/storeHooks"
interface Props {
    source: {[id:string]:ITreeNode},
    target: {[id:string]:ITreeNode},
    targetSetVisibilityReducer?: ActionCreatorWithPayload<{
        toShow: boolean;
        nodeId: string;
    }, string>,
    targetIds: string[]
}

function useVisibility(props:Props): string[] {
    const dispatch = useAppDispatch();
    const [visibleIds, setVisibleIds] = useState<string[]>([]);
    useEffect(() => {
        console.log("targer", props.targetIds)
        // if(props.targetSetVisibilityReducer){
            const newArray:string[] = [];
            let reducer = props.targetSetVisibilityReducer;
            Object.values(props.target).forEach(e => {
                if(reducer)
                    dispatch(reducer({toShow:false,nodeId:e.id}))
            })
            Object.values(props.target).forEach(e => {
            if(props.targetIds.includes(e.id)){
                if(reducer){
                    newArray.push(e.id);
                    dispatch(reducer({toShow:true,nodeId:e.id}))
                }
            }
            })
        // }
        
        setVisibleIds(newArray)

    },[props.targetIds])

    console.log("sad",visibleIds)
    return visibleIds
}

export default useVisibility
