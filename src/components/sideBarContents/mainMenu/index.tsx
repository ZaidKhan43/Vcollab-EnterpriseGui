import {push} from 'connected-react-router/immutable';
import clsx from 'clsx';
import MuiTypography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import GeometryIcon  from '../../icons/geometry';
import FieldIcon from '../../icons/field';
import SceneIcon from '../../icons/scene';
import ColorMapIcon from '../../icons/colormap';
import LabelIcon from '../../icons/label';
import ClipIcon from '../../icons/clipplanes';
import TransformIcon from '../../icons/transform';
import AnimIcon from '../../icons/animation';
import SlidesIcon from '../../icons/slides';
import MessageIcon from '../../icons/Messages';
import SettingsIcon from '../../icons/settings';

import Logo from '../../../assets/images/LogoBig.svg';

import styles from './style';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

import SideBarContainer from '../../layout/sideBar/sideBarContainer'

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Routes } from '../../../routes';
import { MainMenu as MainMenuType, MainMenuItemChild, selectMainMenu, togglePanel } from '../../../store/mainMenuSlice';
import { useState } from 'react';
import { useEffect } from 'react';

//test
import Select from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction'

const getIcon = (name:string):JSX.Element | null => {
    switch(name) {
      case 'Geometry':
        return <GeometryIcon />
      case 'Field':
        return <FieldIcon/>
      case 'Scene':
        return <SceneIcon/>
      case 'Color Maps':
        return <ColorMapIcon/>
      case 'Clip Planes':
        return <ClipIcon/>
      case 'Labels':
        return <LabelIcon/>
      case 'Transformations':
        return <TransformIcon/>
      case 'Animations':
        return <AnimIcon/>
      case 'Slides':
        return <SlidesIcon/>
      case 'Messages':
        return <MessageIcon/>
      case 'Application Settings':
        return <SettingsIcon/>
      default:
        return null
    }
}

const getMainMenuData = (mainMenu:MainMenuType) => {
    let data:any[] = [];
    mainMenu.menuItems.forEach(item => {
      let newItem = {
        id: item.id,
        title: item.name,
        icon: getIcon(item.name),
        expanded: item.expanded,
        list: [] as any[]
      };

      item.children.forEach(child => {
          newItem.list.push(
            {
              id: child.id,
              title: child.name,
              path: child.path,
              disabled: child.disabled,
            }
          )
      })
      data.push(newItem);
    })
    return data;
} 
export default function MainMenu(){

    const classes = styles();
    const dispatch = useAppDispatch();
    const mainMenu = useAppSelector(selectMainMenu);
    const [mainMenuData, setMainMenuData] = useState<any[]>(getMainMenuData(mainMenu));
  
    useEffect(() => {
      setMainMenuData(getMainMenuData(mainMenu))
    },[mainMenu.menuItems])

    const handleOnClick = (path:any) => {
      dispatch(push(path));
    }

    const handleChange = (panelId: string) => {
      dispatch(togglePanel({panelId}));
    }
    const getHeaderContent = () => {
      return <img style={{paddingLeft: '12px', width:'150px'}} src={Logo} alt='VCollab Logo' />;
    }

    const getBody = () => {
      return (  
       <> 
      <Divider className={classes.divider} />
      <List disablePadding className={classes.root}>
      {
        mainMenuData?.map((item:any) => 
          <MuiAccordion 
            key = {item.id}
            expanded = {item.expanded}
            onChange = {() => handleChange(item.id)}
            classes = {{expanded:classes.accordianExpanded}}
            TransitionProps={{ unmountOnExit: true }}>
                    <MuiAccordionSummary
                        classes = {{
                          root: clsx(classes.accordianSummary,{[classes.selected]:item.expanded}),
                          expanded: classes.accordianSummaryExpanded,
                          content: classes.accordianSummaryContent
                        }}
                        expandIcon={<MuiExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Grid container alignContent='center' alignItems='flex-start'>
                      <Grid item xs={3}>
                      {item.icon}
                      </Grid>
                      <Grid item>
                      <MuiTypography noWrap>{item.title}</MuiTypography>
                      </Grid>
                    </Grid>
                </MuiAccordionSummary>
                <MuiAccordionDetails className ={classes.accordianDetails}>
                    <List classes={{root:classes.list}}>
                        { item?.list.map((element : any) =>
                            <ListItem disabled={element.disabled === false ? false : true} alignItems='flex-start' className={classes.listItem} button key={ 'divParent_' + element.id }
                            onClick={() => handleOnClick(element.path)}>
                                <ListItemText primary={element.title} >
                                </ListItemText>
                            </ListItem>
                	    )}
                    </List>
                </MuiAccordionDetails>
            </MuiAccordion>
        )
      }
      </List>
      </>
      );
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      body ={ getBody() }
      />)
}