import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackIcon from '../../../assets/images/back.svg';
import Search from '../../../assets/images/search.svg';
import styles from './style';
import { sideBarContentTypes } from '../../../config';
import { setSidebarActiveContent } from '../../../store/appSlice';
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';
import { useSelector} from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox';

export default function ClipPlanes(){
    
    const dispatch = useAppDispatch();  
    const classes = styles();
    const plates = useAppSelector((state) => state.clip)
    //const dispatch = useAppDispatch();  

    const onClickBackIcon = () =>{
        dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
    }

    const getHeaderLeftIcon= () => {
      return (<IconButton
    //   className={classes.backIcon}
      onClick={() => onClickBackIcon()}><img src={ BackIcon } alt={'BackIcon'} /> </IconButton>);
    }

    const getHeaderContent = () => {
    return <Typography 
    // className={classes.heading} variant='h1'
     noWrap>
            Clip Planes
          </Typography>;
    }
    
    const getBody = () => {
      return (
        <div>
            {
                plates.map((item) =>
                    <Typography>
                        <Checkbox  checked={item.checkbox} />
                            {`Plate ${item.name}`}
                    </Typography>
                )}
          </div>)
    }

    const getFooter = () => {
        return (<div>Footer<br />Footer<br />Footer</div>)          
    }

    return (
    <SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}