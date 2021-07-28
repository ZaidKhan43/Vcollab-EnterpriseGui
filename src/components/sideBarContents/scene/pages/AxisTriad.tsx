import { useState } from 'react';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer'
import Title from'../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title'
import BackIcon from '../shared/BackIcon'
import ToggleButton from '../components/ToogleButton'
import AxisPosition from '../components/AxisTriadPosition'

import {goBack} from 'connected-react-router/immutable';


import {selectAxisTriodList,setApplyItem } from '../../../../store/sideBar/sceneSlice';
import { useAppDispatch,useAppSelector } from '../../../../store/storeHooks';

import useStyles from './axistriadstyle';

export default function AxisTriad() {

const classes = useStyles(); 

const listItems = useAppSelector(selectAxisTriodList);
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


    dispatch(setApplyItem(id));
    
//     let newArray =[...listItems];

//     newArray.map((item)=>{

// // set which items selected         

//           if(item.id === id) {

//             item.selected = true

//           }
//           else{

//             item.selected = false
//           }

// // Apply selected item             

//           if(item.selected === true) {

//             item.applied = true
//             item.selected = false // 
//           }
//           else {
    
//             item.applied = false
    
//             }
//     })

//     setListItems(newArray);
}

const getBody=()=> {

    return  (

        <div>
         <ToggleButton ></ToggleButton>
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