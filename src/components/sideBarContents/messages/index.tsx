import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiToolTip from '@material-ui/core/Tooltip';
import MuiBackIcon from '@material-ui/icons/ArrowBack'

import { useAppDispatch } from "../../../store/storeHooks";
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import styles from './style';

import {goBack, push} from 'connected-react-router/immutable';
import Title from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SelectAction from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { useState} from "react";

import BackButton from '../../../components/icons/back';


export default function Annotations(){

    const classes = styles();
    const dispatch = useAppDispatch();  

    const toSelectList = [
        {
            id:0,
            name:"All",
        },
        {
            id:1,
            name:"Color Maps",
        },
        {
            id:2,
            name:"Display Modes",
        },
    ]

    const [activeId, setActiveId] = useState(0);

    const onClickBackIcon = () =>{
        dispatch(goBack());
    }

    const onHandleSelect = (id : number) => {
        setActiveId(id);
    }

    const getHeaderLeftIcon= () => {
        return (
         <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
        );
      }

    const getAction = () => {
        return (
          <SelectAction
          labelId="display-modes-selection-label-id"
          id="display-modes-selection-id"
          value={activeId}
          onChange={(e : any) => onHandleSelect(Number(e.target.value) )}
          MenuProps={{
            disablePortal: true,
            anchorOrigin: {
              vertical:"bottom",
              horizontal:"left",
           },
           getContentAnchorEl: null
          }}
          >
           { 
            toSelectList.map((item) => 
              <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem> 
          )}
          </SelectAction>
        );
      }
  
  
    const getHeaderRightIcon = () => {
        return null;
    }

    const getBody = () => {
        return (<div style={{ height: "500px", display: "inline-flex", alignItems: "center" }}>Coming Soon</div>)
    }      
  
    const getFooter = () => {
        return null;  
    }

    return (<SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ <Title text={`${toSelectList.filter(item => item.id === activeId).map(item=> item.name)}`} group="Messages"/> }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
        />)
}