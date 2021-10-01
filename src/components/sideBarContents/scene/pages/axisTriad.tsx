import { useContext, useState } from 'react';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer'
import Title from'../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title'
import BackIcon from '../shared/BackIcon'
import ToggleButton from '../components/ToogleButton'
import AxisPosition from '../components/AxisTriadPosition'

import {goBack} from 'connected-react-router/immutable';


import {selectAxisTriodList,selectShowAxis,setApplyItem, setShowAxis } from '../../../../store/sideBar/sceneSlice';
import { useAppDispatch,useAppSelector } from '../../../../store/storeHooks';

import useStyles from './axistriadstyle';
import { selectWindowSize, setEditMode, setWindowAnchor, setWindowPos } from '../../../../store/windowMgrSlice';
import { ViewerContext } from '../../../App';

export default function AxisTriad() {

const classes = useStyles(); 
const viewerContainerRef = useContext(ViewerContext); 
const listItems = useAppSelector(selectAxisTriodList);
const showAxis = useAppSelector(selectShowAxis);
const windowSize = useAppSelector((state) => selectWindowSize(state,"window"))
const dispatch = useAppDispatch();

const onClickBackIcon = () =>{
    dispatch(goBack());
} 
    
const getLeftIcon =()=>{

    return (
        <BackIcon onClick={onClickBackIcon}/>

    )
}
    
const getHeaderContent=()=>{

    return (

        <Title text={"Axis Triad"} group="Scene"/>
    )

}

const applySelcetedItem=(id:string,isSeleced:boolean)=>{
    if(viewerContainerRef?.current) {
        let rect = viewerContainerRef.current.getBoundingClientRect();
        let w = rect.width;
        let h = rect.height;
        let winWidth = windowSize[0];
        let winHeight = windowSize[1];
        let uid = "axisTriadWindow";
        switch(id) {
            case "1":
                dispatch(setWindowPos({uid,pos:[w-winWidth,0]}))
                dispatch(setWindowAnchor({uid,anchor:[winWidth,0]}));
                break;
            case "2":
                dispatch(setWindowPos({uid,pos:[0,0]}))
                dispatch(setWindowAnchor({uid,anchor:[0,0]}));
                break;
            case "3":
                dispatch(setWindowPos({uid,pos:[w-winWidth,h/2-winHeight/2]}))
                dispatch(setWindowAnchor({uid,anchor:[winWidth,0]}));
                break;
            case "4":
                dispatch(setWindowPos({uid,pos:[0,h/2-winHeight/2]}))
                dispatch(setWindowAnchor({uid,anchor:[0,0]}));
                break;
            case "5":
                dispatch(setWindowPos({uid,pos:[0,h-winHeight]}))
                dispatch(setWindowAnchor({uid,anchor:[0,winHeight]}));
                break;
            case "6":
                dispatch(setWindowPos({uid,pos:[w-winWidth,h-winHeight]}))
                dispatch(setWindowAnchor({uid,anchor:[winWidth,winHeight]}));
                break;
            case "7":
                break;
            default:
                break;
        }
        dispatch(setEditMode({uid, isEdit:id==='7'?true:false }));
        dispatch(setApplyItem(id));
    }

}

const handleToggle = (isOn:boolean) => {
    dispatch(setShowAxis(isOn));
}

const getBody=()=> {

    return  (
        
        <div>
         <ToggleButton value={showAxis} onToggle = {handleToggle}></ToggleButton>
         <div>
         
         <AxisPosition items={listItems} onSelectMenuList={applySelcetedItem}></AxisPosition>
             
        </div>   
            
        </div>
    )

}

    return (
        <SideBarContainer
        headerLeftIcon = {getLeftIcon() }
        headerContent={  getHeaderContent()}
        body ={ getBody() }
       />
     )

}