import React ,{useState} from 'react'
import EyeIcon from '../../../../components/common/svgIcons/eyeIcon';
import EyeSlashIcon from '../../../../components/common/svgIcons/eyeSlashIcon';
import EyeInvert from '../../../../components/common/svgIcons/eyeInvert';
import Popover from '@material-ui/core/Popover';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {setCheckedVisibilityAsync, invertVisibilityAsync} from "../../../../store/sideBar/ProductTreeSlice"
import { useAppDispatch } from '../../../../store/storeHooks';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
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
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
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
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };
    const handleIconClick = (item:any) => {
            item.event();
            setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const classes = useStyles();
    return (
        <>
        <ToolTip title='Change selected visibility'>
            <span>
            <IconButton aria-label="delete" {...props} onClick={handleClick}>
               <EyeIcon/>
            </IconButton>
            </span>

        </ToolTip>
       <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
          {
              options.map((item:any) => {
                return (
                <MenuItem className={classes.item} key={item.id} alignItems='center' onClick={() => handleIconClick(item)}>
                <ListItemIcon classes={{root: classes.icon}}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.id}>
                </ListItemText>
                </MenuItem>
                )
              })
          }
        
      </Popover>
        </>
    )
}

export default VisibilityOptions
