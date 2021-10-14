import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';

import {goBack,push} from 'connected-react-router/immutable';

import {useState} from 'react';

import {colormapElements, selectcolormapData} from '../../../../store/sideBar/colormapSlice';

import styles from './style';

import MuiTypography from '@material-ui/core/Typography';
// import MuiGrid from '@material-ui/core/Grid';
import MuiKeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Routes } from '../../../../routes';

import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';

export default function Edit(){

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeId, setActiveId] = useState(selectedColorMapId);  

  const list = useAppSelector(colormapElements)

  const dispatch = useAppDispatch(); 
  const classes = styles();

  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleSelect = (id : string) => {
    setActiveId(id)
  }
  

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getAction = () => {
    return(
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeId}
      onChange={(e : any) => onHandleSelect(e.target.value)}
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
            list.map((item : any) => 
              <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem>  
          )}
      </SelectAction>
    )
  }

  const getHeaderRightIcon = () => {
    return (
        <div>
        </div>
    )
  }

  const getBody = () => {
    return (
      <div className={classes.scrollBar}>
        <MuiMenuList>
          	<MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_VARIABLE))}>
              <MuiListItemText>
                <MuiTypography variant="h3" align="left">
                  Variable
                </MuiTypography>
                <MuiTypography variant="h1" align="left">
                  Displacement - Magnitude
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

          <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_STEPS_AND_SUBCASE))}>
              <MuiListItemText>
                <MuiTypography variant="h3" align="left">
                  Step
                </MuiTypography>
                <MuiTypography variant="h1" align="left">
                  Step 1 - Frame 1
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

          <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_COLOR_PALETTE))}>
              <MuiListItemText>
                <MuiTypography variant="h3" align="left">
                  Color Palette
                </MuiTypography>
                <MuiTypography variant="h1" align="left">
                  VCollab - 2 Color
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

          <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_VALUE_SETTINGS))}>
              <MuiListItemText>
                <MuiTypography variant="h2" align="left">
                  Value Settings
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

          <MuiMenuItem onClick={()=> dispatch(push(Routes.COLORMAPS_LEGEND_SETTINGS))}>
              <MuiListItemText>
                <MuiTypography variant="h2" align="left">
                  Legend Settings
                </MuiTypography>
              </MuiListItemText>
              <MuiListItemIcon style={{marginLeft:"250px"}}><MuiKeyboardArrowRightIcon /></MuiListItemIcon>           
          </MuiMenuItem>

        </MuiMenuList>
      </div>
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={"Edit" } group="Color Maps"/> }
            headerAction = {getAction()} 
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}