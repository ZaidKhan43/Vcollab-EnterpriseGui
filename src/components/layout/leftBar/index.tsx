import React, { useEffect, useState } from 'react';
import LogoMini from 'assets/images/logoMini.svg'
import useStyles from './style';
import useIconStyles from '../appBar/style'
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiIcon from '@material-ui/core/Icon'
import Box from '@material-ui/core/Box'
import GeometryIcon  from '../../icons/geometry';
import FieldIcon from '../../icons/field';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useAppDispatch, useAppSelector } from 'store/storeHooks';
import { selectSidebarVisibility, setSidebarVisibility } from 'store/appSlice';
import { Routes } from 'routes';
import {push} from 'connected-react-router/immutable';
const items: any[] = [
  {
    icon: <GeometryIcon/>,
    path: Routes.GEOMETRY_ASSEMBLY_TREE
  },
  {
    icon: <FieldIcon/>,
    path: Routes.FIELD_VARIABLES
  }
]

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useTabStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab:{
    minWidth: '0px',
    color: theme.palette.text.primary
  }
}));

function LeftBar() {
  const classes = useStyles();
  const iconClasses = useIconStyles();
  const tabClasses = useTabStyles();

  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(-1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if(value === newValue){
      dispatch(setSidebarVisibility(!isSidebarVisible));
    }
    else{
      dispatch(setSidebarVisibility(true));
      setValue(newValue);
      switch(newValue){
        case 0:
          dispatch(push(Routes.GEOMETRY_ASSEMBLY_TREE));
          break;
        case 1:
          dispatch(push(Routes.FIELD_VARIABLES));
          break;
        default:
          break;
      }
    }
    
  };

  useEffect(() => {
    if(isSidebarVisible === false) {
      setValue(-1);
    }
  },[isSidebarVisible])

  return (
  <div className={classes.root}>
        <Box>
        <MuiIcon>
            <div style={{width:'100%',height:'100px'}}></div>
        </MuiIcon>
        </Box>
        <Box sx={{ width: '100%' }}>
        <Tabs
           orientation="vertical"
           variant="scrollable"
           value={value}
           onChange={handleChange}
           aria-label="Vertical tabs example"
           className={tabClasses.tabs}
         >
        {items.map( (e,i) => {
          
          return <Tab  icon = {
            <div className={iconClasses.divIcon}>
              {e.icon}
            </div>
          } 
          {...a11yProps(i)} classes={{root : tabClasses.tab}}
          />
         
        })
        }
        </Tabs>
        </Box>
  </div>
  );
}

export default LeftBar;
