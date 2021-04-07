import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackIcon from '../../../assets/images/back.svg';
import styles from './style';
import { sideBarContentTypes } from '../../../config';
import { setSidebarActiveContent } from '../../../store/appSlice';
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';

import Checkbox from '@material-ui/core/Checkbox';

import AddIcon from "../../../assets/images/plus.svg";
import Edit from "../../../assets/images/edit.svg";
import Copy from "../../../assets/images/copy.svg";
import ClipPlates from "../../../assets/images/clipboard.svg";
import Delete from "../../../assets/images/trash.svg";

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

    const getHeaderRightIcon = () => {
      return  <IconButton><img src={AddIcon} alt={'Add'}/></IconButton>;
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
        return (
        <div>
            <IconButton> <img src={Edit} alt={'Edit'}/></IconButton>
            <IconButton> <img src={Copy} alt={'Copy'}/></IconButton>
            <IconButton> <img src={ClipPlates} alt={'Paste'}/></IconButton> 
            <IconButton> <img src={Delete} alt={'Delete'}/></IconButton> 
        </div>)          
    }

    return (
    <SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}