import {push} from 'connected-react-router/immutable';

import MuiTypography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import BranchIcon  from '../../icons/branch';
import StackIcon from '../../icons/stackicon';
import Clipplanes from '../../icons/clipplanes';
import Views from '../../icons/views';
import Annotations from '../../icons/annotation';
import Settings from '../../icons/settings';
import Notifications from '../../icons/notification';

import MuiPhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';

import Logo from '../../../assets/images/LogoBig.svg';
import styles from './style';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { sideBarContentTypes } from '../../../config';

import SideBarContainer from '../../layout/sideBar/sideBarContainer'

import {MainMenuItem} from './type';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Routes } from '../../../routes';

export default function MainMenu(){

    const classes = styles();
    const dispatch = useAppDispatch();  

    const menuItem = [
        {
          title: 'Geometry',
          icon: <BranchIcon />,
          disabled : false,
          list :[
            {
              title:'Assembly Tree',
              onClick: () => {
                dispatch(push(Routes.GEOMETRY_ASSEMBLY_TREE))
              },
            },
            {
              title:'Search',
              onClick: () => {
                dispatch(push(Routes.GEOMETRY_SEARCH))
              },
            },
            {
              title:"Display Mode",
              onClick: () => {
                dispatch(push(Routes.GEOMETRY_DISPLAY_MODES))
              },
            },
            {
              title:"Material Color",
              onClick: () => alert("Material Color"),
            },
            {
              title:"Coordinate System",
              onClick: () => alert("Coordinate System"),
            },
            {
              title:"Transformation",
              onClick: () => alert("Transformation"),
            }
          ],
          
        },

        {
          title: 'Field',
          icon: <BranchIcon />,
          disabled : false,
          list :[
            {
              title:'Variabes',
              onClick: () => alert("Variables"),
            },
            {
              title:'Steps & Subcases',
              onClick: () => alert("Steps & Subcases"),
            },
            {
              title:'Sections & Layers',
              onClick: () => alert("Sections & Layers"),
            },
            {
              title:'Derived Types',
              onClick: () => alert("Derived Types"),
            },
          ],
          // onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.productExplorer)),
        },

        {
          title: 'Scene',
          icon: <MuiPhotoSizeSelectActualOutlinedIcon />,
          disabled : false,
          list :[
            {
              title:'Camera',
              onClick: () => alert("Camera"),
            },
            {
              title:'Background',
              onClick: () => alert("Background"),
            },
            {
              title:'Axis Traid',
              onClick: () => alert("Axis Traid"),
            },
            {
              title:'Lights',
              onClick: () => alert("Lights"),
            }
          ],
          // onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.scene)),
        },
        {
          title: 'Color Maps',
          icon: <StackIcon />,
          disabled : false,
          list :[
            {
              title:'List',
              onClick: () => alert("List"),
            },
            {
              title:'Variable',
              onClick: () => alert("Variable"),
            },
            {
              title:'Steps & Subcases',
              onClick: () => alert("Steps & Subcases"),
            },
            {
              title:'Sections & Layers',
              onClick: () => alert("Sections & Layers"),
            },
            {
              title:'Derived Types',
              onClick: () => alert("Derived Types"),
            },
            {
              title:'Color Pelette',
              onClick: () => alert("Color Pelette"),
            },
            {
              title:'Variable Settings',
              onClick: () => alert("Variable Settings"),
            },
            {
              title:'Legend Settings',
              onClick: () => alert("Legend Settings"),
            },
          ],
          // onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.colormaps)),
        },

        {
          title: 'Clip Planes',
          icon: <Clipplanes />,
          disabled : false,
          list :[
            {
              title:'List',
              onClick: () => alert("List"),
            },
            {
              title:'Settings',
              onClick: () => alert("Settings"),
            },
            {
              title:'Transformation',
              onClick: () => alert("Transformation"),
            },
          ],
          // onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.clipsPlanes)),
        },


        // {
        //   title: 'Views',
        //   icon: <Views />,
        //   disabled : false,
        //   // onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.views)),
        // },
        // {
        //   title: 'Annotations',
        //   icon: <Annotations />,
        //   disabled : false,
        //   // onClick: () =>dispatch(setSidebarActiveContent(sideBarContentTypes.annotations)),
        // },
        {
          title: 'Application Settings',
          icon: <Settings />,
          disabled : false,
          list:[
            {
              title:'Color Theme',
              onClick:() => alert("Color Theme"),
            },
            {
              title:'Mouse Control',
              onClick:() => alert("Mouse Control")
            },
          ]
          // onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.settings)),
        },
        // {
        //   title: 'Notifications',
        //   icon: <Notifications />,
        //   disabled : false,
        //   // onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.notifications)),
        // },
    ];


  
    const getHeaderContent = () => {
      return <img style={{paddingLeft: '12px', width:'150px'}} src={Logo} alt='VCollab Logo' />;
    }

    const getBody = () => {
      return (  
       <> 
      <Divider className={classes.divider} />
      <List style={{ padding: '0' }}>
      {
        menuItem.map(item => 
          <MuiAccordion style={{margin:"-2px"}}>
                    <MuiAccordionSummary
                        expandIcon={<MuiExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                       <div>{item.icon}</div>
                    <MuiTypography style={{marginLeft:"20%",}}>{item.title}</MuiTypography>
                </MuiAccordionSummary>
                <MuiAccordionDetails>
                    <div style={{width:"100%",marginTop:"-20px",}}
                      // className={classes.listClick}
                      >
                        { item.list.map((element : any, index : number) =>
                            <div  key={ 'divParent_' + index } className={classes.listItem}
                            onClick={element.onClick}>
                                <MuiTypography style={{marginLeft:"-15%"}}>
                                    {element.title}
                                </MuiTypography>
                            </div>
                	    )}
                    </div>
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