import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';


import BackButton from '../../../components/icons/back';
import { sideBarContentTypes } from '../../../config';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import { setSidebarActiveContent } from '../../../store/appSlice';

import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';



export default function Views(){

    const dispatch = useAppDispatch(); 

    const onClickBackIcon = () =>{
        dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
      }

    const getHeaderLeftIcon= () => {
        return (
            <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
        );
    }

    const getHeaderContent = () => {
        return <MuiTypography variant='h1' noWrap>Scene</MuiTypography>;
    }

    const getHeaderRightIcon = () => {
        return (
            null
            )
    }

    const getBody = () => {
        return null
    }

    const getFooter = () => {
        return null
    }
    
    return ( 
        <SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ getHeaderContent() }
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
      /> 
    )
}