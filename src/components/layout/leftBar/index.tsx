import React, { useEffect, useRef, useState } from 'react';
import LogoMini from 'assets/images/logoMini.svg'
import useStyles from './style';
import useIconStyles from '../appBar/style'
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiIcon from '@material-ui/core/Icon'
import Box from '@material-ui/core/Box'
import GeometryIcon  from '../../icons/geometry';
import Nav from '../nav'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabScrollButton from '@material-ui/core/TabScrollButton';
import { useAppDispatch, useAppSelector } from 'store/storeHooks';
import { selectSidebarVisibility, setSidebarVisibility } from 'store/appSlice';
import { Routes } from 'routes';
import {push} from 'connected-react-router/immutable';
import clsx from 'clsx';
import { MainMenuItem, selectActiveTab, selectDefaultOptions, setActiveTab, selectTemporaryTab} from 'store/mainMenuSlice';

type LeftBarProps = {
    topTabs: MainMenuItem[],
    bottomTabs: MainMenuItem[],
    onChange: (active: MainMenuItem | null) => void;
}

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
    height: '80%'
  },
  tabs: {
    width: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
    '& button' : {
      padding: '0px'
    }
  },
  tabIcon: {
    fontSize: '0.5rem',
    '& svg':{
      width: '1.25rem'
    }
  },
  label: {
    width: '100%',
    paddingLeft: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  tab:{
    minWidth: '0px',
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
    fontSize: '0.5rem'
  }
}));

function LeftBar(props: LeftBarProps) {
  const classes = useStyles();
  const iconClasses = useIconStyles();
  const tabClasses = useTabStyles();
  
  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const temporaryTab = useAppSelector(selectTemporaryTab);
  const dispatch = useAppDispatch();
  const activeItem = useAppSelector(selectActiveTab);

  const handleValChange = (event: React.ChangeEvent<{}>, newValue: MainMenuItem) => {
   
    if(!activeItem) {
      dispatch(setActiveTab({menuItem:newValue}));
      dispatch(setSidebarVisibility(true));
    }
    else if( activeItem.id !== newValue.id){
      dispatch(setActiveTab({menuItem:newValue}));
    }
    else{
      dispatch(setSidebarVisibility(false));
      dispatch(setActiveTab({menuItem:null}));
    }
    
  };

  useEffect(() => {
    if(activeItem)
    {
      dispatch(push(activeItem.path))
    }
    else{
      dispatch(push(Routes.HOME))
    }
    props.onChange(activeItem)
  },[activeItem])


  return (
  <>
  <div className={classes.root}>
        <Box>
        <Nav activeItem={activeItem}/>
        </Box>
        <div className={tabClasses.root}>
        <Tabs
           orientation="vertical"
           textColor='inherit'
           variant="scrollable"
           scrollButtons="on"
           value={activeItem}
           onChange={handleValChange}
           aria-label="Vertical tabs example"
           className={tabClasses.tabs}
         >
        
        {props.topTabs.map( e => {
          
          return <Tab  
            disableRipple
            value ={e}
            icon = {
            <div className={clsx(iconClasses.divIcon, tabClasses.tabIcon)}>
              {<GeometryIcon/>}
            </div>
          } 
          label={
            <div  style={{
              width: '100%',
              paddingLeft: '5px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {e.name}
            </div>
          }
          {...a11yProps(e.name)} classes={{root : tabClasses.tab}}
          />
         
        })
        }
        {
            temporaryTab ? 
            <Tab
             value={temporaryTab}
             icon = {
              <div className={clsx(iconClasses.divIcon, tabClasses.tabIcon)}>
                {<GeometryIcon/>}
              </div>
            } 
            label={
              <div className={tabClasses.label}>
                {temporaryTab.name}
              </div>
            }
            {...a11yProps(temporaryTab.name)} classes={{root : tabClasses.tab}}
            >
            </Tab>
            :null
          }
        </Tabs>
        </div>
  </div>
  <div className={classes.root}>
        <div className={tabClasses.root} >
        <Tabs
           orientation="vertical"
           variant="fullWidth"
           scrollButtons='off'
           value={activeItem}
           onChange={handleValChange}
           aria-label="sidebar bottom options"
           className={tabClasses.tabs}
         >
          
          {
              props.bottomTabs.map( e => {
                        
                return <Tab  
                  disableRipple
                  value={e}
                  icon = {
                  <div className={clsx(iconClasses.divIcon, tabClasses.tabIcon)}>
                    {<GeometryIcon/>}
                  </div>
                } 
                label={
                  <div className={tabClasses.label}>
                    {e.name}
                  </div>
                }
                {...a11yProps(e.name)} classes={{root : tabClasses.tab}}
                />
              
              })
          }
        </Tabs>
        </div>
  </div>
  </>
  );
}

export default LeftBar;
