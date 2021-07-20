import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../icons/back';
import {goBack, push} from 'connected-react-router/immutable';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';

import MuiTypography from '@material-ui/core/Typography';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import MuiToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MuiGrid from '@material-ui/core/Grid';

import  {useEffect, useState} from "react";
import NumericInput from 'react-numeric-input';
import styles from '../style';

import MuiButton from '@material-ui/core/Button';
import { cameraView, selectedCameraView } from '../../../../store/sideBar/sceneSlice';

export default function CameraEdit (){

    const dispatch = useAppDispatch();
    const classes = styles();

    const [projection, setProjection] = useState<string>("perspective");


    const cameraView : cameraView = useAppSelector(selectedCameraView)[0]

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const handleProjection = (e: any) => {
        setProjection(e.currentTarget.value);
}

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return(null)
    }

    const getBody = () => {
        return(
            <div className={classes.scrollBar}>
                <div  style={{marginTop:"20px", marginLeft:"10px"}}>

               
            <div style={{marginBottom:"30px"}}>
            <MuiTypography variant="h2" style={{textAlign:"left" , marginBottom:"15px"}} noWrap>
            Projection
        </MuiTypography>
        <MuiToggleButtonGroup
            // style={{marginBottom:"20px",}}
            size="small" 
            value={projection}
            exclusive
            onChange={handleProjection}
            aria-label="text alignment"
        >
            <MuiToggleButton value="perspective" aria-label="left aligned">
                <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Perspective</MuiTypography>
            </MuiToggleButton>
            <MuiToggleButton value="orthographic" aria-label="left aligned">
                <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Orthographic</MuiTypography>
            </MuiToggleButton>
        </MuiToggleButtonGroup>
        </div>

        <div style={{marginBottom:"30px"}}>
        <MuiTypography variant="h2" style={{textAlign:"left", marginBottom:"15px"}} noWrap>
            View Frustum
        </MuiTypography>

        <MuiGrid container spacing={3}>
            {   (projection === "perspective" 
                    ?
                    cameraView.valuePerspective 
                    : 
                    cameraView.valueOrthographic)
                .map((item) => 
                    <MuiGrid item xs={12} sm={6}>

                        <MuiGrid container direction="column" spacing={1}>
                            <MuiGrid item>
                        
                        <MuiTypography variant="caption"> 
                            {item.name}
                        </MuiTypography>
                        </MuiGrid>

                        <MuiGrid item>
                        <input
                            readOnly={!cameraView.userDefined}
                            // inputProps={{style: { textAlign: 'center', padding:"1px",  }, }} 
                            className={classes.inputEquation} 
                            // style={{width: "70px",marginLeft:"5px"}} 
                            type="number" 
                            value={item.value} 
                            // onChange={(e) => {setStepDisplay(e.target.value)}}
                            // onBlur = {onHandleBlur}
                        />
                        </MuiGrid>
                        </MuiGrid>
                    </MuiGrid>
            )}
        </MuiGrid>
        </div>

        <div style={{marginBottom:"30px"}}>
        <MuiTypography variant="h2" style={{textAlign:"left", marginBottom:"15px"}} noWrap>
           Camera Position
        </MuiTypography>
        <MuiGrid container spacing={1}>
            {cameraView.cameraPosition.map((item) => 
                    <MuiGrid item xs={12} sm={4}>
                        
                        <MuiGrid container direction="column" spacing={1}>
                            <MuiGrid item>
                        <MuiTypography variant="caption" > 
                            {item.name}
                        </MuiTypography>
                        </MuiGrid>
                        <MuiGrid item>
                        <input
                            readOnly={!cameraView.userDefined}
                            // inputProps={{style: { textAlign: 'center', padding:"1px",  }, }} 
                            className={classes.inputEquation} 
                            // style={{width: "70px",marginLeft:"5px"}} 
                            type="number" 
                            value={item.value} 
                            // onChange={(e) => {setStepDisplay(e.target.value)}}
                            // onBlur = {onHandleBlur}
                        />

                        {/* <NumericInput
                            className={classes.inputEquation}
                            value={item.value}
                            button={"no"}
                            margin="dense"
                            noStyle
                            // onChange={(value : any) => onHandleTextBox(value,item.name,projection)} 
                        /> */}
                        </MuiGrid>

                        </MuiGrid>
                    </MuiGrid>
            )}
        </MuiGrid>

        </div>

        <div style={{marginBottom:"30px"}}>
        <MuiTypography variant="h2" style={{textAlign:"left", marginBottom:"15px"}} noWrap>
           Camera Direction
        </MuiTypography>
        <MuiGrid container spacing={1}>
            {cameraView.cameraDirection.map((item) => 
                    <MuiGrid item xs={12} sm={4}>
                        
                        <MuiGrid container direction="column" spacing={1}>
                            <MuiGrid item>
                        <MuiTypography variant="caption" > 
                            {item.name}
                        </MuiTypography>
                        </MuiGrid>
                        <MuiGrid item>
                        <input
                            readOnly={!cameraView.userDefined}
                            // inputProps={{style: { textAlign: 'center', padding:"1px",  }, }} 
                            className={classes.inputEquation} 
                            // style={{width: "70px",marginLeft:"5px"}} 
                            type="number" 
                            value={item.value} 
                            // onChange={(e) => {setStepDisplay(e.target.value)}}
                            // onBlur = {onHandleBlur}
                        />

                        {/* <NumericInput
                            className={classes.inputEquation}
                            value={item.value}
                            button={"no"}
                            margin="dense"
                            noStyle
                            // onChange={(value : any) => onHandleTextBox(value,item.name,projection)} 
                        /> */}
                        </MuiGrid>

                        </MuiGrid>
                    </MuiGrid>
            )}
        </MuiGrid>

        </div>

        <div style={{marginBottom:"30px"}}>
        <MuiTypography variant="h2" style={{textAlign:"left", marginBottom:"15px"}} noWrap>
           Camera Up
        </MuiTypography>
        <MuiGrid container spacing={1}>
            {cameraView.cameraUp.map((item) => 
                    <MuiGrid item xs={12} sm={4}>
                        
                        <MuiGrid container direction="column" spacing={1}>
                            <MuiGrid item>
                        <MuiTypography variant="caption" > 
                            {item.name}
                        </MuiTypography>
                        </MuiGrid>
                        <MuiGrid item>
                        <input
                            readOnly={!cameraView.userDefined}
                            // inputProps={{style: { textAlign: 'center', padding:"1px",  }, }} 
                            className={classes.inputEquation} 
                            // style={{width: "70px",marginLeft:"5px"}} 
                            type="number" 
                            value={item.value} 
                            // onChange={(e) => {setStepDisplay(e.target.value)}}
                            // onBlur = {onHandleBlur}
                        />

                        {/* <NumericInput
                            className={classes.inputEquation}
                            value={item.value}
                            button={"no"}
                            margin="dense"
                            noStyle
                            // onChange={(value : any) => onHandleTextBox(value,item.name,projection)} 
                        /> */}
                        </MuiGrid>

                        </MuiGrid>
                    </MuiGrid>
            )}
        </MuiGrid>

        </div>

        </div>
        </div>
        )
    }

    const getFooter = () => {
        return(
            <div>
            {
                cameraView.userDefined === false
                ?
                null
                :
                <div style={{marginTop:"20px", marginBottom:"20px"}}>
                <MuiButton style={{backgroundColor:"#5958FF",width:"30%", fontSize:"11px" , marginRight:"5px"}} 
                autoFocus 
                // onClick={onHandleDelete} 
                // color="primary"
              >
                Save
              </MuiButton>
           
            <MuiButton style={{width:"30%", fontSize:"11px"}} 
                autoFocus 
                // onClick={onHandleDelete} 
                // color="primary"
              >
                Cancel
              </MuiButton>
              </div>
            }
            </div>
        )
    }

    return(
        <SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ <Title text={cameraView.name } group="Scene - Camera"/> }
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
      /> 
       
    )
}