import Fab from '@material-ui/core/Fab';
import Fullscreen from '../../../assets/images/fullscreen.svg';
import FullscreenClose from '../../../assets/images/fullscreen_exit.svg';
import styles from './style';
import { selectFullscreen, setFullscreenState } from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';

export default function FullscreenIcon(props : any) {

    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreen);
    const dispatch = useAppDispatch();  

    const OnClickFullscreen = function(){
        dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    return (
        <Fab size = 'small' className = {classes.iconPosition} {...props} onClick={ OnClickFullscreen }>
            {(isFullscreenEnabled ?
                <img src={ FullscreenClose  } alt='fullscreen' />:
                <img src={ Fullscreen } alt='fullscreen' />
            )}
        </Fab>
    );
}
