import React ,{useState} from 'react'
import EyeIcon from '../../../icons/eyeIcon';
import EyeSlashIcon from '../../../icons/eyeSlashIcon';
import EyeInvert from '../../../icons/eyeInvert';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {setCheckedVisibilityAsync, invertVisibilityAsync} from "../../../../store/sideBar/productTreeSlice"
import { useAppDispatch } from '../../../../store/storeHooks';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(createStyles({
    item: {
        maxWidth: 150
    },
    icon: {
        minWidth: 40
    }
}))
function VisibilityOptions(props:any) {
    const dispatch = useAppDispatch();
    const [options] = useState([
        {
            id: 'Show',
            icon: <EyeIcon/>,
            event: () => dispatch(setCheckedVisibilityAsync({toShow:true}))
        },
        {
            id: 'Hide',
            icon: <EyeSlashIcon/>,
            event: () => dispatch(setCheckedVisibilityAsync({toShow:false}))
        },
        {
            id: 'Invert',
            icon: <EyeInvert viewBox = '0 0 19 20'></EyeInvert>,
            event: () => dispatch(invertVisibilityAsync())
        }
    ]);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen((prevOpen) => !prevOpen);
      };
    
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
          }
      
          setOpen(false);
    };
    const handleIconClick = (e:React.MouseEvent<EventTarget>,item:any) => {
            item.event();
            handleClose(e);
    }
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
    const classes = useStyles();
    return (
        <>
        <ToolTip title='Change selected visibility'>
            <span>
            <IconButton ref={anchorRef} aria-label="changle visibility" {...props} onClick={handleClick}>
               <EyeIcon/>
            </IconButton>
            </span>

        </ToolTip>
       <Popper
        role={undefined}
        transition
        open={open}
        anchorEl={anchorRef.current}
        disablePortal
      >
          { (props:any) => (
              <Grow {...props.TransitionProps}
              style={{ transformOrigin: props.placement === 'bottom' ? 'center top' : 'center bottom' }}>
              <Paper elevation={10}>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                    {
                        options.map((item:any) => {
                            return (
                            <MenuItem className={classes.item} key={item.id} alignItems='center' onClick={(e) => handleIconClick(e,item)}>
                            <ListItemIcon classes={{root: classes.icon}}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.id}>
                            </ListItemText>
                            </MenuItem>
                            )
                        })
                    }
                    </MenuList>
               </ClickAwayListener>
              </Paper>
              </Grow>
          )
          }
        
      </Popper>
        </>
    )
}

export default VisibilityOptions
