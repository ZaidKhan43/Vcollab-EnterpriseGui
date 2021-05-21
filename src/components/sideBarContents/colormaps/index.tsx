import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiToolTip from '@material-ui/core/Tooltip';
import MuiBackIcon from '@material-ui/icons/ArrowBack'

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import styles from './style';
import Colormap from './colormap';
import { setSidebarActiveContent } from '../../../store/appSlice';
import { sideBarContentTypes } from '../../../config';
import { useAppDispatch } from '../../../store/storeHooks';

export default function ColorMaps(){
    
    const classes = styles();
    const dispatch = useAppDispatch();

    const onClickBackIcon = () =>{
      dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu));       
    }
    
    const getHeaderLeftIcon= () => {
      return (
        <MuiToolTip title='Back'>
          <MuiIconButton
          className={classes.backIcon}
          onClick={() => onClickBackIcon()}><MuiBackIcon/></MuiIconButton>
        </MuiToolTip>
      );
    }

    const getHeaderContent = () => {
      return (
      <MuiTypography className={classes.heading} variant='h1' noWrap>
          Color Maps
      </MuiTypography>)  
    }    

    const getBody = () => {
      return (
        <Colormap />
      )          
    }

    return (<SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      body ={ getBody() }/>
    )
}