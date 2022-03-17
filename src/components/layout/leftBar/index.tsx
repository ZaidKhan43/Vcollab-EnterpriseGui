import React, { useEffect, useRef, useState } from 'react';
import LogoMini from 'assets/images/logoMini.svg'
import useStyles from './style';
import useIconStyles from '../appBar/style'
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiIcon from '@material-ui/core/Icon'
import Box from '@material-ui/core/Box'
import GeometryIcon  from '../../icons/geometry';
import TestIcon from '../../icons/annotation'
import Nav from '../nav'
import ContextMenu from '../../shared/contextMenu'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabScrollButton from '@material-ui/core/TabScrollButton';
import { useAppDispatch, useAppSelector } from 'store/storeHooks';
import { selectSidebarVisibility, setSidebarVisibility } from 'store/appSlice';
import { Routes } from 'routes';
import {push} from 'connected-react-router/immutable';
import clsx from 'clsx';

// icons 
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { MainMenuItem, selectActiveTab, selectDefaultOptions, removeTab, setActiveTab, selectTemporaryTab, MainMenuItems, addMenuItem, addTab, selectMainMenuItems, getItem, selectMoreMenu, getIcon} from 'store/mainMenuSlice';
import useContainer from 'customHooks/useContainer';
import { topbarHeight } from 'config';
import nextId from 'react-id-generator'
import { FlashOnTwoTone } from '@material-ui/icons';
type LeftBarProps = {
    topTabs: MainMenuItem[],
    bottomTabs: MainMenuItem[]
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
    padding: '0px 5px',
    fontSize: '0.6rem',
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
  
  const moreMenuItem = useAppSelector(selectMoreMenu);
  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const temporaryTab = useAppSelector(selectTemporaryTab);
  const dispatch = useAppDispatch();
  const activeItem = useAppSelector(selectActiveTab);
  const bottomTabRef = useRef(null);
  const [btnWidth, btmHeight] = useContainer(bottomTabRef,[]);
  const mainMenuItems = useAppSelector(selectMainMenuItems);

  const contextMenuItemsArray = [
    {
      id: 'itempin', text: 'pin', icon: <ArrowLeftIcon fontSize="small" />
    },
    {
      id: 'itemunpin', text: 'unpin', icon: <ArrowRightIcon fontSize="small" />
    },
    {
      id: 'addgroup', text: 'addgroup', icon: <ArrowRightIcon fontSize="small" />
    }
  ]

  const [contextMenuID, setContextMenuID] = useState(null || String);

  const [contextMenuXPos, setContextMenuXPos] = useState(0);

  const [contextMenuYPos, setContextMenuYPos] = useState(0);

  const [contextMenuItems, setContextMenuItems] = useState(contextMenuItemsArray)

  const [contextMenuShow, setContextMenuShow] = useState(false);

  const defaultOptions = useAppSelector(selectDefaultOptions);

const handleGroup = () => {
    setContextMenuShow(false);
    const newItem = contextMenuID;
    let menuItem = getItem(newItem, mainMenuItems);
    menuItem = createGroup();
    dispatch(addMenuItem({
      menuItem
    }));
    dispatch(addTab({
      menuItemId: menuItem.id
    }))
    dispatch(setActiveTab({
      menuItem
    }))

    if (!activeItem) {
      dispatch(setActiveTab({ menuItem }));
      dispatch(setSidebarVisibility(true));
    }
    else if (activeItem.id !== menuItem.id) {
      dispatch(setActiveTab({ menuItem }));
    }
    else {
      dispatch(setSidebarVisibility(false));
      dispatch(setActiveTab({ menuItem: null }));
    }
  }

  const createGroup = () => {
    let id = nextId('customGroup');
    let menuItem = {
     id,
     disabled: false,
     expanded: false,
     name: 'New Group',
     children:[],
     type: MainMenuItems.CUSTOM_GROUP,
     path: Routes.CUSTOM_GROUP,
     isEditMode: true
   }
   return menuItem;
 }
  const handleValChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    let menuItem = getItem(newValue, mainMenuItems);

    if(menuItem.type === MainMenuItems.ADD_GROUP){
      menuItem = createGroup();
      dispatch(addMenuItem({
        menuItem
    }));
    dispatch(addTab({
      menuItemId: menuItem.id 
    }))
    dispatch(setActiveTab({
      menuItem
    }))
    }
    if(!activeItem) {
      dispatch(setActiveTab({menuItem}));
      dispatch(setSidebarVisibility(true));
    }
    else if( activeItem.id !== menuItem.id){
      dispatch(setActiveTab({menuItem}));
    }
    else{
      dispatch(setSidebarVisibility(false));
      dispatch(setActiveTab({menuItem:null}));
    }
    
  };
  //manickam --
  const setContextMenu = (event: any, id: string) => {

    event.preventDefault();
    event.stopPropagation();

    setContextMenuID(id);
    setContextMenuShow(true);

    setContextMenuXPos(event.pageX);
    setContextMenuYPos(event.pageY);

    let IDS: any[] = []

    defaultOptions.map((defaultData) => {

      IDS.push(defaultData.id)

    })

    let idExsist = IDS.includes(id);

      if (idExsist) {

            let menuItemsCopy = [...contextMenuItemsArray]

            let filteredDataSource = menuItemsCopy.filter((item) => {

              if (item.id === "itemunpin" || item.id === "addgroup") {

                return item;

              }

            });

            setContextMenuItems(filteredDataSource);

      }
      else {

          let menuItemsCopy = [...contextMenuItemsArray]

          let filteredDataSource = menuItemsCopy.filter((item) => {

            if (item.id === "itempin" || item.id === "addgroup") {

              return item;

            }

          });

          setContextMenuItems(filteredDataSource);

        }

  }

  const setContextParentMenu = (event: any) => {

    event.preventDefault();
    setContextMenuShow(true);
    setContextMenuXPos(event.pageX);
    setContextMenuYPos(event.pageY);


    let menuItemsCopy = [...contextMenuItemsArray]

    let filteredDataSource = menuItemsCopy.filter((item) => {

      if (item.id === "addgroup") {

        return item;

      }

    });

    setContextMenuItems(filteredDataSource);

  }

  const pinItems = () => {

    let menuItem = getItem(contextMenuID, mainMenuItems);

    const menuItemId = contextMenuID;

    dispatch(addTab({ menuItemId }))

    dispatch(setActiveTab({
      menuItem
    }))


    setContextMenuShow(false);


  }
  const unpinItems = () => {
    const menuItemId = contextMenuID;
    dispatch(removeTab({ menuItemId }))
    dispatch(setActiveTab({menuItem:null}))
    dispatch(setSidebarVisibility(false))
    setContextMenuShow(false);
  }
  

  const onHandleContextMenuClick = (id: string) => {


    if (id === "itempin") {

      pinItems()

    }
    if (id === "itemunpin") {

      unpinItems()
    }
    if (id === "addgroup") {

      handleGroup()
    }

  }

  const handleOutSideClick =()=> {

    setContextMenuShow(false);

  }
  //mainck end--
  useEffect(() => {

    if(activeItem)
    {
      dispatch(push(activeItem.path))
    }
    else{
      dispatch(push(Routes.HOME))
    }
    
  },[activeItem])

  useEffect(() => {
    if(!isSidebarVisible && activeItem){
      dispatch(setActiveTab({menuItem: null}))
    }
  },[isSidebarVisible])

  return (
  <>
  <div style={{height: `calc(100% - ${btmHeight}px)`}} className={classes.root}>
        {/* <Box>
        <Nav activeItem={activeItem}/>
        </Box> */}
        {
        moreMenuItem ?
        <Tabs 
          orientation="vertical"
          textColor='inherit'
          variant="scrollable"
          scrollButtons="off"
          value={activeItem ? activeItem.id : "-1"}
          onChange={handleValChange}
          aria-label="more tab"
          className={tabClasses.tabs}
        >
         <Tab  
           disableRipple
           value ={moreMenuItem.id}
           icon = {
            <div className={clsx(iconClasses.divIcon, tabClasses.tabIcon)}>
            { 
               React.createElement(getIcon(moreMenuItem.type))
            }
          </div>
         } 
         label={
           <div  className={tabClasses.label}>
             {moreMenuItem.name}
           </div>
         }
         {...a11yProps(moreMenuItem.name)} classes={{root : tabClasses.tab}}
         />
       </Tabs>
       : null
        }
        
        <div style={{height: `calc(100% - ${topbarHeight}px)`}} className={tabClasses.root} onContextMenu={(event) => setContextParentMenu(event)} >
        {contextMenuShow ? <ContextMenu mousePointer={{ mouseX: contextMenuXPos, mouseY: contextMenuYPos }} handleOutSideClick={handleOutSideClick} onHandleContextMenuClick={onHandleContextMenuClick} items={contextMenuItems} /> : null}
        <Tabs 
           orientation="vertical"
           textColor='inherit'
           variant="scrollable"
           //scrollButtons="on"
           value={activeItem ? activeItem.id : "-1"}
           onChange={handleValChange}
           aria-label="Vertical tabs example"
           className={tabClasses.tabs}
         >
        
        {props.topTabs.map( e => {
          
          return <Tab  
            disableRipple
            value ={e.id}
            onContextMenu={(event) => setContextMenu(event, e.id)}
            icon = {
            <div className={clsx(iconClasses.divIcon, tabClasses.tabIcon)}>
              { 
                React.createElement(getIcon(e.type)) 
              }
            </div>
          } 
          label={
            <div  className={tabClasses.label}>
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
             value={temporaryTab.id}
             onContextMenu={(event) => setContextMenu(event, temporaryTab.id)}
             icon = {
              <div className={clsx(iconClasses.divIcon, tabClasses.tabIcon)}>
                { React.createElement(getIcon(temporaryTab.type)) }
              </div>
            } 
            label={
              <div className={tabClasses.label}>
                {temporaryTab.name }
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
  <div  ref={bottomTabRef}  className={classes.root}>
        <div className={tabClasses.root} >
        <Tabs
           orientation="vertical"
           variant="fullWidth"
           scrollButtons='off'
           value={activeItem ? activeItem.id : "-2"}
           onChange={handleValChange}
           aria-label="sidebar bottom options"
           className={tabClasses.tabs}
         >
          
          {
              props.bottomTabs.map( e => {
                        
                return <Tab  
                  disableRipple
                  value={e.id}
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
