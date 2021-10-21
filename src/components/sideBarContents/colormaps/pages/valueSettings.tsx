import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack} from 'connected-react-router/immutable';


import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { useRef, useState } from 'react';

import { colormapElements, selectcolormapData, selectColorPaletteData } from '../../../../store/sideBar/colormapSlice';

import MuiGrid from '@material-ui/core/Grid'

import styles from '../style'

import {useEffect} from 'react'

import MuiInput from '@material-ui/core/Input';

export default function Variable(){

  const dispatch = useAppDispatch();  

  const classes = styles();
  const containerRef = useRef(null);

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData)

  const colorSetList = useAppSelector(selectColorPaletteData);
  const appliedColorPaletteId = colormapsData[activeColormapId].colorPalette

  const appliedColorPalette = colorSetList[appliedColorPaletteId].colorSet;

  const colormapNameList = useAppSelector(colormapElements)

  const valueSettings = () => {
    const length = appliedColorPalette.length + 1;

    let value : any[] = [];

    for( let i = 0; i < length ; i++){
      value.push("Auto")
    }
    return(value)
  }

  const [valueSet, setValueSet] = useState(valueSettings)

  useEffect(() => {
    setValueSet(valueSettings)
  },[appliedColorPalette]);

  // const classes = styles();
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }


  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  
  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getAction = () => {
    return(
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeColormapId}
      onChange={(e : any) => onHandleSelect(e.target.value)}
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
            colormapNameList.map((item : any) => 
              <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem>  
          )}
      </SelectAction>
    )
  }

  const getHeaderRightIcon = () => {
    return (
        <div>
        </div>
    )
  }



  const getBody = () => {
    console.log(appliedColorPalette)
    
    return (
      <div className={classes.scrollBar} >
        <MuiGrid container style={{marginTop:"50px", marginLeft:"20px"}}>
          <MuiGrid item xs={1} >
            <MuiGrid container direction="column">
              {
                appliedColorPalette.map(item =>
                  <MuiGrid>
                    <div style={{marginBottom:"20px",height:"60px", 
                                            width:"30px",
                                            backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                                        }}>
                                        </div>
                  </MuiGrid>
              )}
            </MuiGrid>
          </MuiGrid>
          
          <MuiGrid item xs={6}>
            <MuiGrid container direction="column" style={{marginTop:"-40px"}}>
              {
                valueSet.map(item => 
                  <MuiGrid item style={{marginBottom:"45px"}} >
                    <MuiInput inputProps={{style: { textAlign: 'center' },}}
                  value={item}
                />
                  </MuiGrid>
                )}
            </MuiGrid>

          </MuiGrid>
        </MuiGrid>

    </div> 
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={"Value Settings" } group="Color Maps"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
