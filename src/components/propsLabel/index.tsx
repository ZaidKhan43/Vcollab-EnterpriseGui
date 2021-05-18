import {useAppSelector,useAppDispatch } from '../../store/storeHooks';
import { positionUpdate } from '../../store/propsSlice';

import MuiTypography from '@material-ui/core/Typography';

import MuiSnackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';

export default function PropsLabel (){
    const position = useAppSelector((state) => state.props.position)
   
    const text = useAppSelector((state) => state.props.text);

    const dispatch = useAppDispatch(); 

    const getPostion = (e : any) => {
        const positions = {x : e.screenX, y : e.screenY}
        console.log(positions)
        dispatch(positionUpdate(positions));
    }
  

    return (
    <div  onClick={getPostion}>
      { position.x < 1032
        ?
        <MuiSnackbar style={{position:"absolute",left: `${position.x + 120}px`, top: `${position.y - 10}px`}}
        anchorOrigin={{vertical:"top", horizontal:'center'}}
        autoHideDuration={3000}
        open={true}
      >
          <MuiAlert icon={false}>
        <div style={{margin:"-10px",}}
        >
          <MuiTypography color="inherit" style={{fontSize:"13px"}}>{`(${position.x},${position.y}) ${text}`}</MuiTypography>
        </div>
        </MuiAlert>
      </MuiSnackbar>
        :

        <MuiSnackbar style={{position:"absolute",left: `${position.x - 120}px`, top: `${position.y - 10}px`}}
          anchorOrigin={{vertical:"top", horizontal:'center'}}
          autoHideDuration={3000}
          open={true}
        >
            <MuiAlert icon={false}>
        <div style={{margin:"-10px",}}
        >
          <MuiTypography color="inherit" style={{fontSize:"13px"}}>{`(${position.x},${position.y}) ${text}`}</MuiTypography>
        </div>
        </MuiAlert>
      </MuiSnackbar>
      }
      
  </div>  
)
}