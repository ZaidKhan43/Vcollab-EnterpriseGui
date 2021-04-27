
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import BranchIcon  from '../../../assets/images/branch';
import StackIcon from '../../../assets/images/stackicon';
import Clipplanes from '../../../assets/images/clipplanes';
import Views from '../../../assets/images/views';
import Annotations from '../../../assets/images/annotation';
import Settings from '../../../assets/images/settings';
import Notifications from '../../../assets/images/notification';
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
          icon: <BranchIcon />,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.productExplorer)),
        },
        {
          title: 'Color Maps',
          icon: <StackIcon />,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.colormaps)),
        },
        {
          title: 'Clip Planes',
          icon: <Clipplanes />,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.clipsPlanes)),
        },
        {
          title: 'Views',
          icon: <Views />,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.views)),
        },
        {
          title: 'Annotations',
          icon: <Annotations />,
          disabled : false,
          onClick: () =>dispatch(setSidebarActiveContent(sideBarContentTypes.annotations)),
        },
        {
          title: 'Settings',
          icon: <Settings />,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.settings)),
        },
        {
          title: 'Notifications',
          icon: <Notifications />,
          disabled : false,
          onClick: () => dispatch(setSidebarActiveContent(sideBarContentTypes.notifications)),
        },
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
             menuItem.map((item, index) => (
            <ListItem
            disabled = {item.disabled === true}
            onClick={item.onClick}
            className={classes.listItem}
            button
            key={item.title}
          >
            <ListItemIcon style={{minWidth:'40px'}}>
              <div>{item.icon}</div>
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
      </>
      );
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      body ={ getBody() }
      />)
}