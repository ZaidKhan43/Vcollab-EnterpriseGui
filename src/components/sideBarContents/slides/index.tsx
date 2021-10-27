import SideBarContainer from '../../layout/sideBar/sideBarContainer';

import {useEffect} from 'react';

import {goBack} from 'connected-react-router/immutable';
import Title from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';

import BackButton from '../../../components/icons/back';


import MuiIconButton from '@material-ui/core/IconButton';


export default function Slides (){

    const dispatch = useAppDispatch();

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

  
    
    

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={onClickBackIcon} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return ( 
           null
        )
    }

    const getAction = () => {
        return (
            null
        )
    }

    const getBody = () => {
        return (
           <div>Coming Soon</div>
        )
    }

    const getFooter = () => {
      return(null)
    }

    return(
        <SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ <Title text={"Slides" } group=""/> }
        headerAction = {getAction()}
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
      />

    )
}