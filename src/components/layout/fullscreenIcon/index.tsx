import MuiFab from '@material-ui/core/Fab';
import Fullscreen from '../../../assets/images/fullscreen';
import FullscreenClose from '../../../assets/images/fullscreen_exit';
import styles from './style';
import { selectFullscreenStatus, setFullscreenState } from '../../../store/appSlice';

import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';

export default function FullscreenIcon(props : any) {

    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const dispatch = useAppDispatch();  

    const OnClickFullscreen = function(){
        dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    return (
        <MuiFab size = 'small' className = {classes.iconPosition} {...props} onClick={ OnClickFullscreen }>
            {(isFullscreenEnabled ?
                <FullscreenClose/>:
                <Fullscreen />
            )}
        </MuiFab>
    );
}
