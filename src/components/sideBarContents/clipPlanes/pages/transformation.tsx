import {useState, useEffect} from "react";
import styles from './style';

import {goBack, push} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../../components/icons/back';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';

import MuiGrid from '@material-ui/core/Grid';

import FlipDirectionLeft from "../../../../components/icons/flipDirectionLeft";
import FlipDirectionRight from "../../../../components/icons/flipDirectionRight";

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';

import MuiInput from '@material-ui/core/Input';

import {Routes} from "../../../../routes"

import { setSectionPlaneData, editNormalInverted,editTranslate, editRotate, editAxisX, editAxisY, updateMinMaxGUI, selectActivePlane, selectedPlane , setActive} from '../../../../store/sideBar/clipSlice';
import RotateSlider from '../shared/rotateSlider';
import TranslateSlider from '../shared/translateSlider';

import MuiFormControl from '@material-ui/core/FormControl'
import MuiInputLabel from '@material-ui/core/InputLabel'
import MuiSelect from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';

import MuiEditIcon from '@material-ui/icons/EditOutlined';

import MuiTooltip from '@material-ui/core/Tooltip'

export default function ClipPlanes(props : any){

  const classes = styles();
  const dispatch = useAppDispatch();  

  const planes = useAppSelector((state) => state.clipPlane.planes);

  const enabledPlanes = planes.filter(item => item.enabled === true);
  const selected = useAppSelector(selectActivePlane);
  
  const IndexofSelected = planes.findIndex(item => item.id === selected)
  const enabledSelectedPlanes = useAppSelector(selectedPlane).filter(item => item.enabled === true);
  const [activeId,setActiveId] = useState(planes.length === 0 || enabledPlanes.length === 0 ? -3 : enabledSelectedPlanes.length > 1  ? enabledSelectedPlanes[0].id : selected >= 0 && planes[IndexofSelected].enabled === true ? selected : enabledPlanes[0].id );

  const indexofActive = planes.findIndex(item => item.id === activeId)
  const clipNormalInverted = planes[indexofActive].clipNormalInverted;
  const name = planes[indexofActive].name;
  const translate = planes[indexofActive].translate;
  const translateMin = planes[indexofActive].translateMin;
  const translateMax = planes[indexofActive].translateMax;
  const rotate = planes[indexofActive].rotate;
  const axisX = planes[indexofActive].axisX;
  const axisY = planes[indexofActive].axisY;

  const clipCordX = planes[indexofActive].clipCordX;
  const clipCordY = planes[indexofActive].clipCordY;
  const clipCordZ = planes[indexofActive].clipCordZ;
  const clipConstD = planes[indexofActive].clipConstD;
  
  const stepValue = (translateMax - translateMin) / 100;

  const onHandleDirection = () => {
    const id= planes[indexofActive].id
    dispatch(editNormalInverted(id))
    dispatch(setSectionPlaneData({id}));
   
  }

  const onHandleTranslateCommitted= (newValue:any , stepValue : any) => {
    console.log("stepValue",stepValue)
 
    console.log("hwllo" ,translateMax)

    if( (newValue - stepValue) <= translateMin ){
      const update= {id : planes[indexofActive].id, translate : newValue - stepValue};
      dispatch(editTranslate(update))
      dispatch(updateMinMaxGUI({id:planes[indexofActive].id}));
    }

       
    if( (newValue + stepValue) >= translateMax ){
      const update= {id : planes[indexofActive].id, translate : newValue + stepValue};
      dispatch(editTranslate(update))
      dispatch(updateMinMaxGUI({id:planes[indexofActive].id}));
    }


  }

  const onHandleBack = () => {
    dispatch(goBack());
  }

  const onHandleSelect = (id : number) => {

    const click : any  = planes.find(item => item.id === id);
    dispatch(setActive({clicked: click}))
    setActiveId(id)
  }

  const onHandleTranslate= ( newValue : any) => {
    console.log(newValue)
    const update= {id : planes[indexofActive].id, translate : Number(newValue)};
    dispatch(editTranslate(update))
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))
  }

  const onHandleTranslateTextbox= (newValue : number ) => {
    const update= {id : planes[indexofActive].id, translate : newValue};
    dispatch(editTranslate(update))
    if(update.translate >= translateMax || update.translate <= translateMin) {
      dispatch(updateMinMaxGUI({id:planes[indexofActive].id}));
    }
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))
  }

  const onHandleRotate = (value : any) => {
    const update= {id : planes[indexofActive].id, rotate : value};
    dispatch(editRotate(update))
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))
  }
  
  const onHandleRotateX = (value : any) => {
    const update= {id : planes[indexofActive].id, axisX : value };
    dispatch(editAxisX(update));
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))
  }

  const onHandleRotateY = (value : any) => {
    const update= {id : planes[indexofActive].id, axisY : value};
    dispatch(editAxisY(update));
    dispatch(setSectionPlaneData({id:planes[indexofActive].id}))
  }

  const onHandleTransform = () => {
    dispatch(push(Routes.CLIPPLANES_SETTINGS));
  }

  const getHeaderLeftIcon= () => {
    return (
      <MuiIconButton onClick={() => onHandleBack()}><BackButton/></MuiIconButton>
    );
  }

  const getHeaderRightIcon = () => {
    return(
      <div>
      <MuiGrid container item direction='column' justify='flex-start'>
                <MuiGrid item>
                  <MuiTooltip title="Settings">
                <MuiIconButton   onClick={() => onHandleTransform()}> 
                <MuiEditIcon/>
            </MuiIconButton>
            </MuiTooltip>
                </MuiGrid>
                {/* <MuiGrid item>
                        <MuiTypography  variant='h5'>Transform</MuiTypography>    
                    </MuiGrid> */}
              </MuiGrid>
            </div>
    )
  }

  const getAction = () => {
    return(
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeId}
      onChange={(e : any) => onHandleSelect(Number(e.target.value) )}
      MenuProps={{
        disablePortal: true,
        anchorOrigin: {
          vertical:"bottom",
          horizontal:"left",
       },
       getContentAnchorEl: null
      }}
      >
        {
            planes.map((item) => 
              <MuiMenuItem disabled={item.enabled ? false : true} value={item.id}>{item.name}</MuiMenuItem>  
          )}
      </SelectAction>
    )
  }
    
  const getBody = () => {
    //console.log("getBody",rotate)
    return (
      <div className={classes.scrollBar}> 

      <div className={classes.translatePageContainer}>

        <div className={classes.settingItemContainer}>
          <MuiTypography variant="h2" className={classes.settingPageCaption} noWrap>
            Plane Equation
          </MuiTypography>
          <div style={{width:"90%", margin:"auto"}}>
            <MuiInput disabled inputProps={{style: { textAlign: 'center' ,},}} className={classes.disabledTextBox} value={`${Math.round(clipCordX*1000)/1000}X ${Math.sign(clipCordY)===1 || Math.sign(clipCordY) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipCordY*1000)/1000)}Y ${Math.sign(clipCordZ) === 1 || Math.sign(clipCordZ) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipCordZ*1000)/1000)}Z = ${Math.round(clipConstD*1000)/1000}`}/>
          </div>
        </div>

        <div className={classes.settingItemContainer}>
          <MuiTypography variant="h2" className={classes.settingPageCaption} noWrap>
            Coordinate System
          </MuiTypography>
          <MuiGrid container spacing={3}>
            <MuiGrid item xs={12} sm={6}>
              <MuiGrid container spacing={1} direction='column' >
                <MuiGrid item>
                  <MuiIconButton style={{width:"60px",height: "90px", }}   onClick={() => onHandleDirection()}>
                    { clipNormalInverted === false 
                      ? 
                        <FlipDirectionLeft/>
                      :
                        <FlipDirectionRight/>
                    }
                </MuiIconButton>
              </MuiGrid>
              <MuiGrid item>
                <MuiTypography className={classes.caption} variant="caption" noWrap>Flip Direction</MuiTypography>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiGrid item xs={12} sm={6}>
            <RotateSlider value={rotate} handleChange={onHandleRotate} label={"Rotate"}/>
          </MuiGrid>
        </MuiGrid>
      </div>

      <div className={classes.settingItemContainer}>
      <MuiTypography className={classes.settingPageCaption}>
          Translate
        </MuiTypography>
          <TranslateSlider  
            value={translate} valueMin={translateMin} 
            valueMax={translateMax} onHandleChange={onHandleTranslate}
            stepValue= {stepValue}
            onHandleTextbox={onHandleTranslateTextbox} onHandleCommited={onHandleTranslateCommitted}
          />
      </div>
      
      <div className={classes.settingItemContainer}>
      <MuiTypography variant="h2" className={classes.settingPageCaption} noWrap>Rotate</MuiTypography>
          <MuiGrid container spacing={3}>
            <MuiGrid item xs={12} sm={6}>
            <RotateSlider value={axisX} handleChange={onHandleRotateX}  label={"X-Axis"}/>
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
            <RotateSlider value={axisY} handleChange={onHandleRotateY}  label={"Y-Axis"}/>
            </MuiGrid>
          </MuiGrid>  
      </div>
      </div>
          </div>

    )
  } 

    return(
        <SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ <Title text={"Transformation" } group="Clip Planes"/> }
      headerAction = {getAction()}
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
    />
    )
}