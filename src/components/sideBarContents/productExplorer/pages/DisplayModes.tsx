import {goBack} from 'connected-react-router/immutable';
import BackIcon from '../shared/BackIcon';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';

import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import {selectCheckedLeafNodes} from "../../../../store/sideBar/productTreeSlice";
import DisplayModeBody from '../DisplayModes/DisplayModesBody'
import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import { useEffect } from 'react';

export default function DisplayModes(props:any){
    
    const dispatch = useAppDispatch();  
    useEffect(() => {
        console.log("mounting DisplayModes page")
    },[])

    const onClickBackIcon = () =>{
      dispatch(goBack());
    }

    const getHeaderLeftIcon= () => {
      return (
        <BackIcon onClick={onClickBackIcon}/>
      );
    }

    const getHeaderContent = () => {
      return (<Title text={"Display Modes" } group="Geometry"/>)
    }
    

    const getHeaderRightIcon = () => {
        return null
    }

    const getBody = () => {
      return (
        <DisplayModeBody/>
      )
    }      

    const getFooter = () => {
      return null    
    }

    return (<SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      headerAction = { <SelectAction/>}
      body ={ getBody() }
      footer = { getFooter() }
      />)
}