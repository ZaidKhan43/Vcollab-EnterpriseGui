
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import BranchIcon from '../../../assets/images/branch.svg';
import StackIcon from '../../../assets/images/stack.svg';
import clipplanes from '../../../assets/images/clipplanes.svg';
import views from '../../../assets/images/views.svg';
import annotations from '../../../assets/images/annotations.svg';
import settings from '../../../assets/images/settings.svg';
import notifications from '../../../assets/images/notifications.svg';
import Logo from '../../../assets/images/LogoBig.svg';
import styles from './style';
import { setSidebarActiveContent } from '../../../store/appSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { sideBarContentTypes } from '../../../config';

import SideBarContainer from '../../layout/sideBar/sideBarContainer'

export default function MainMenu(){

    const classes = styles();
    const dispatch = useAppDispatch();  

    const menuItem = [
        {
          title: 'Product Explorer',
          icon: BranchIcon,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.productExplorer)),
        },
        {
          title: 'Color Maps',
          icon: StackIcon,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.colormaps)),
        },
        {
          title: 'Clip Planes',
          icon: clipplanes,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.clipsPlanes)),
        },
        {
          title: 'Views',
          icon: views,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.views)),
        },
        {
          title: 'Annotations',
          icon: annotations,
          disabled : false,
          onClick: () =>dispatch(setSidebarActiveContent(sideBarContentTypes.annotations)),
        },
        {
          title: 'Settings',
          icon: settings,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.settings)),
        },
        {
          title: 'Notifications',
          icon: notifications,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.notifications)),
        },
    ];

    const getHeaderContent = () => {
      return <img style={{paddingLeft: '12px', width:'150px'}} src={Logo} alt='VCollab Logo' />;
    }

    const getBody = () => {
      return (  
      <List style={{ padding: '0' }}>
      { 
        menuItem.map((item, index) => (
        <ListItem
      disabled = {item.disabled === true}
      onClick={item.onClick}
      className={classes.listItem}
      button
      key={item.title}
    >
      <ListItemIcon style={{minWidth:'40px'}}>
        <img style={{width:'22px', height:'22px'}} src={item.icon} alt={`${item.title} Icon`} />
      </ListItemIcon>
      <ListItemText            
        className={classes.listItemText}
        primary={
          <Typography variant='h1' className={classes.listItemText}>
            {item.title}
          </Typography>
      }
      />
    </ListItem>
        ))
      }
      </List>
      );
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      body ={ getBody() }
      />)
}