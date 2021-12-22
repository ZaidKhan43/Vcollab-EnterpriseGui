import MuiIconButton from "@material-ui/core/IconButton";
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";
import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import BackButton from "../../../icons/back";
import FormControl from "@material-ui/core/FormControl";
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks";
import { goBack, push } from "connected-react-router/immutable";
import { InputLabel, ListItemIcon, SvgIcon, Typography } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
import SelectAction from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";
import MuiMenuItem from "@material-ui/core/MenuItem";
import { selectcolormapData, colormapElements, setColorMapSelection, paletteTypeDataList, directionDataList, ticPositionDataList, titlePlacementDataList, valuePlacementDataList, setLegendSettings,ColormapType ,LegendDirection,LegendTitlePlacement,LegendValuePlacement, LegendType } from "../../../../store/sideBar/colormapSlice";

import MuiListSubHeader from '@material-ui/core/ListSubheader';
import styles from "./style";

import MuiGrid from '@material-ui/core/Grid'

import { useEffect, useState } from "react";

export default function LegendSettings() {

  const classes = styles();
  const dispatch = useAppDispatch();

  const list = useAppSelector(colormapElements);
  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const colormapsData = useAppSelector(selectcolormapData);
  const paletteTypeList = useAppSelector(paletteTypeDataList);
  const directionList = useAppSelector(directionDataList);
  const ticPositionList = useAppSelector(ticPositionDataList);
  const titlePlacementList = useAppSelector(titlePlacementDataList);
  const valuePlacementList = useAppSelector(valuePlacementDataList);

  const [paletteType, setPaletteType] = useState<string>(colormapsData[selectedColorMapId].paletteType);
  const [direction, setDirection] = useState<string>(colormapsData[selectedColorMapId].direction);
  const [ticPosition, setTicPosition] = useState<string>(colormapsData[selectedColorMapId].ticPosition);
  const [titlePlacement, setTitlePlacement] = useState<string>(colormapsData[selectedColorMapId].titlePlacement);
  const [valuePlacement, setValuePlacament] = useState<string>(colormapsData[selectedColorMapId].valuePlacement);
  const [gapValue, setGapValue] = useState<number>(colormapsData[selectedColorMapId].gap);

  const [isTitleOptionsError , setTitleOptionsError] = useState<boolean>(false);
  const [isValueOptionsError , setValueOptionsError] = useState<boolean>(false);
  const [isLegendSettingsError , setLegendSettingsError] = useState<boolean>(false);
  const ErrorMsg:string = "please select correct option"; 




  const readOnly = useAppSelector(state => state.colormap.colormapTree.data[selectedColorMapId].colormapType === ColormapType.SYSTEM ? true : false)

  useEffect(() => {
    setPaletteType(colormapsData[selectedColorMapId].paletteType);
    setDirection(colormapsData[selectedColorMapId].direction);
    setTicPosition(colormapsData[selectedColorMapId].ticPosition);
    setTitlePlacement(colormapsData[selectedColorMapId].titlePlacement);
    setValuePlacament(colormapsData[selectedColorMapId].valuePlacement);
    setGapValue(colormapsData[selectedColorMapId].gap)
  },[selectedColorMapId]);
  
  const onClickBackIcon = () => {
    dispatch(goBack());
  };

  const onHandleSelect = (id : string) => {
    dispatch(setColorMapSelection(id));
  }

  const handleSelectChange = (newValue : string, valueType: string) => {
    switch(valueType){
      case "paletteType" :
        setPaletteType(newValue);
      break;

      case "direction" :
        setDirection(newValue);
      break;

      case "ticPosition" :
        setTicPosition(newValue);
      break;

      case "titlePlacement" :
        setTitlePlacement(newValue);
      break;

      case "valuePlacement" :
        setValuePlacament(newValue);
      break;
    }
    
  }

  const handleGap = (e : any) => {
    setGapValue(Number(e.currentTarget.value));
  }

  const onHandleReset = () => {
    setPaletteType(colormapsData[selectedColorMapId].paletteType);
    setDirection(colormapsData[selectedColorMapId].direction);
    setTicPosition(colormapsData[selectedColorMapId].ticPosition);
    setTitlePlacement(colormapsData[selectedColorMapId].titlePlacement);
    setValuePlacament(colormapsData[selectedColorMapId].valuePlacement);
    setGapValue(colormapsData[selectedColorMapId].gap);
  }

  const onHandleApply = () => {
    dispatch(setLegendSettings({colorMapId: selectedColorMapId, newPaletteType: paletteType, newDirection: direction, newTicPosition: ticPosition, newTitlePlacement: titlePlacement, newValuePlacement: valuePlacement, newGap: gapValue}))
  }

  const getHeaderLeftIcon = () => {
    return (
      <MuiIconButton onClick={() => onClickBackIcon()}>
        <BackButton />
      </MuiIconButton>
    );
  };

  const getmenuItems = (listmenu: any, column: boolean) => {
    if (column === false) {
      return listmenu.map((menu: any) => {
        return (
          <MuiMenuItem value={menu.id} style={{height:"40px"}}>
            <MuiGrid container>
              <MuiGrid item>
              <ListItemIcon style={{verticalAlign: "middle", marginLeft:"10px", height:"30px"}}>
                <img height="40px" width="50px" src={menu.image}></img>
            </ListItemIcon>
              </MuiGrid>
              <MuiGrid item style={{marginTop:"10px"}}>
              {menu.name}
              </MuiGrid>
            </MuiGrid>
            
            
          </MuiMenuItem>
        );
      });
    } 
    else {
      return listmenu.map((menu: any) => {
        return (
          <MuiMenuItem value={menu.id} style={{height:"55px"}}>
            <div>
              <span>{menu.name}</span>
              <div>
                <ListItemIcon style={{verticalAlign: "middle", marginLeft:"10px"}}>
                  <img src={menu.image}></img>
                </ListItemIcon>
              </div>
            </div>
          </MuiMenuItem>
        );
      });
    }
  };

  const getHeaderRightIcon = () => {
    return <div></div>;
  };
  
  const getAction = () => {
    
    const parentNodes = list.filter(item => item.children?.length !== 0)

    return(
      <SelectAction
      id="grouped-select" label="Grouping"
      value={selectedColorMapId}
      onChange={(e : any) => {if(e.target.value) onHandleSelect(e.target.value)}}
      MenuProps={{
        disablePortal: true,
        anchorOrigin: {
          vertical:"bottom",
          horizontal:"left",
       },
       getContentAnchorEl: null
      }}
      >
        <MuiListSubHeader key={parentNodes[0].id}>{parentNodes[0].name}</MuiListSubHeader>
        {
          list.map((element : any) => {
            return(
              element.pid === parentNodes[0].id 
                ?
                  <MuiMenuItem key={element.id} value={element.id}>{element.name}</MuiMenuItem>
                :
                  null
            )
          }) 
        }

        <MuiListSubHeader key={parentNodes[1].id}>{parentNodes[1].name}</MuiListSubHeader>
        {
          list.map((element : any) => {
            return(
              element.pid === parentNodes[1].id 
                ?
                  <MuiMenuItem key={element.id} value={element.id}>{element.name}</MuiMenuItem>
                :
                  null
            )
          })        
        }
      </SelectAction>
    )
  };

  
  const getBody = () => {

    return (
      <div className={classes.scrollBar}>
        <div className={classes.legendSelection}>
         <SelectAction
            style={{ textAlign: "left"}}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Palette Type"}
            value={paletteType}
            error={false}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "paletteType") }
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {getmenuItems(paletteTypeList, false)}
          </SelectAction>
          </div>

          <div className={classes.legendSelection}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Direction"}
            value={direction}
            error={false}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "direction")}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {getmenuItems(directionList, false)}
          </SelectAction>
          </div>

          <div className={classes.legendSelection}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Tic Position"}
            value={ticPosition}
            error={false}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "ticPosition")}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {getmenuItems(ticPositionList, true)}
          </SelectAction>
          </div>

          <div className={classes.legendSelection}>

            
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            label = {"Title Placement"}
            value={titlePlacement}
            error={isTitleOptionsError}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "titlePlacement")}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
            getContentAnchorEl: null,
            }}
          >
            {getmenuItems(titlePlacementList, false)}

          </SelectAction>

          </div>

          <div className={classes.legendSelection}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Value Placement"}
            value={valuePlacement}
            error={isValueOptionsError}
            disabled = {readOnly}
            onChange={(e : any) => handleSelectChange(e.target.value, "valuePlacement")}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {getmenuItems(valuePlacementList, false)}
          </SelectAction>
          </div>

        <div style={{ textAlign: "left", marginTop: "30px", marginLeft:"10px",marginBottom:"5px" }}>
        <MuiGrid container>
            <MuiGrid item style={{ marginRight: "5%", marginTop:"10px" }}>
              <span >Gap</span>
            </MuiGrid>
            <MuiGrid item>
              <MuiTextField
                type="number"
                variant="outlined"
                style={{ width: "30%" }}
                size="small"
                value={gapValue}
                onChange={handleGap}
              />
            </MuiGrid>
          </MuiGrid>
        </div>
      </div>
    );
  };


const compareLegendOptions =()=> {

  let isSelectedOption ;
  let horizontalTitlePlacement ;
  let verticalTitlePlacement ;

  let selectedLegendType = parseInt(paletteType);
  let selectedLegendDirection = parseInt(direction) ;
  let selectedTitlePlacement = parseInt(titlePlacement);
  let selectedValuePlacement = parseInt(valuePlacement);



  if(selectedLegendDirection === LegendDirection.HORIZONTAL || selectedLegendDirection === LegendDirection.AUTO) {

        if(selectedValuePlacement === LegendValuePlacement.TOP || selectedValuePlacement === LegendValuePlacement.BOTTOM || selectedValuePlacement === LegendValuePlacement.ALTERNATING) {

          isSelectedOption = true ;

          horizontalTitlePlacement = compareHorizontalTitlePlacementOptions(selectedLegendDirection ,selectedTitlePlacement);

           setValueOptionsError(false);

        }
        else {

            isSelectedOption = false ;
            horizontalTitlePlacement = compareHorizontalTitlePlacementOptions(selectedLegendDirection ,selectedTitlePlacement);

            setValueOptionsError(true);
        
        }
  }

  else if (selectedLegendDirection === LegendDirection.VERTICAL) {


        if(selectedValuePlacement === LegendValuePlacement.LEFT || selectedValuePlacement === LegendValuePlacement.RIGHT || selectedValuePlacement === LegendValuePlacement.ALTERNATING) {

          isSelectedOption = true ;

          verticalTitlePlacement = compareVerticalTitlePlacementOptions(selectedLegendDirection ,selectedTitlePlacement);

          setValueOptionsError(false);

        }
        else {

          isSelectedOption = false ;
          verticalTitlePlacement = compareVerticalTitlePlacementOptions(selectedLegendDirection ,selectedTitlePlacement);

          setValueOptionsError(true);

        }

  }


  if(selectedLegendDirection === LegendDirection.HORIZONTAL ||selectedLegendDirection === LegendDirection.AUTO) {

      if(horizontalTitlePlacement === true && horizontalTitlePlacement !== undefined && isSelectedOption === true) {

          isSelectedOption = true ;
          return isSelectedOption ;
      }
      else {

          isSelectedOption = false ;
          return isSelectedOption ;
      }

  }
  else if(selectedLegendDirection === LegendDirection.VERTICAL) {

    if(verticalTitlePlacement === true && verticalTitlePlacement !== undefined && isSelectedOption === true && isSelectedOption !== undefined) {

        isSelectedOption = true ;

        return isSelectedOption ;
    }
    else {

        isSelectedOption = false ;

        return isSelectedOption ;

    }

  }

  // if(selectedLegendType === LegendType.AUTO || selectedLegendDirection === LegendDirection.AUTO) {

  //   isSelectedOption = false ;
  //   return isSelectedOption ;

  // }

} 

const compareHorizontalTitlePlacementOptions = (selectedLegendDirection:number ,selectedTitlePlacement:number)=> {

let horizontalTitlePlacement;


      if(selectedTitlePlacement === LegendTitlePlacement.TOP_LEFT ||selectedTitlePlacement === LegendTitlePlacement.TOP_MIDDLE || selectedTitlePlacement === LegendTitlePlacement.TOP_RIGHT ||selectedTitlePlacement === LegendTitlePlacement.BOTTOM_LEFT || selectedTitlePlacement === LegendTitlePlacement.BOTTOM_MIDDLE || selectedTitlePlacement === LegendTitlePlacement.BOTTOM_RIGHT) {

          horizontalTitlePlacement = true ;

          setTitleOptionsError(false);

      }
      else {

        horizontalTitlePlacement = false ;

        setTitleOptionsError(true);
      }


  return horizontalTitlePlacement;


}

const compareVerticalTitlePlacementOptions = (selectedLegendDirection:number ,selectedTitlePlacement:number) => {

let verticalTitlePlacement ;


        if(selectedTitlePlacement === LegendTitlePlacement.TOP || selectedTitlePlacement === LegendTitlePlacement.BOTTOM) {

          verticalTitlePlacement = true ;

          setTitleOptionsError(false);

        }

        else {

          verticalTitlePlacement = false ;

          setTitleOptionsError(true);

        }

    return verticalTitlePlacement ;


}


useEffect(() => {

  let isSelectedOptions = compareLegendOptions();

  if(isSelectedOptions === true) {

    setLegendSettingsError(false);
  }
  else {

    setLegendSettingsError(true);
  }

},[paletteType ,direction , titlePlacement ,valuePlacement]);

//Automatically change legend option

useEffect(()=> {

  let selectedLegendDirection = parseInt(direction) ;

  if(selectedLegendDirection === LegendDirection.VERTICAL) {

    titlePlacementList.map((menu:any)=> {

      let id = parseInt(menu.id);

      if(id === LegendTitlePlacement.TOP) {

        setTitlePlacement(id.toString());
      }


    })

    valuePlacementList.map((menu:any)=> {

      let id = parseInt(menu.id);

      if(id === LegendValuePlacement.RIGHT) {

        setValuePlacament(id.toString());
      }


    })

  }
  else if(selectedLegendDirection === LegendDirection.HORIZONTAL || selectedLegendDirection === LegendDirection.AUTO ) {

    titlePlacementList.map((menu:any)=> {

      let id = parseInt(menu.id);

      if(id === LegendTitlePlacement.TOP_LEFT) {

        setTitlePlacement(id.toString());
      }


    })

    valuePlacementList.map((menu:any)=> {

      let id = parseInt(menu.id);

      if(id === LegendValuePlacement.TOP) {

        setValuePlacament(id.toString());
      }


    })


  }


},[direction])


  const getFooter = () => {

    const selectedData = colormapsData[selectedColorMapId];
    let disabled = true;

    if(paletteType !== selectedData.paletteType || direction !== selectedData.direction || ticPosition !== selectedData.ticPosition || titlePlacement !== selectedData.titlePlacement || valuePlacement !== selectedData.valuePlacement || gapValue !== selectedData.gap)

    isLegendSettingsError? disabled = true: disabled = false ;
      
    return (
      <div>
       {isTitleOptionsError ? <div className={classes.invalid}>{ErrorMsg}</div>:isValueOptionsError ?<div className={classes.invalid}>{ErrorMsg}</div>:null}
        { readOnly 
          ?
          null
          :
<div style={{marginTop:"20px", marginBottom:"20px"}}>

        <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
          autoFocus 
          onClick={onHandleApply} 
          // color="primary"
          disabled= {disabled}
        >
          Save
        </MuiButton>

        <MuiButton style={{width:"20%", fontSize:"9px" , marginRight:"5px"}} 
          autoFocus 
          onClick={onHandleReset} 
          // color="primary"
          disabled= {disabled}
        >
          Reset
        </MuiButton>
     
      </div>
      
        }
        
      </div>
      
    );
  };
  return (
    <SideBarContainer
      headerLeftIcon={getHeaderLeftIcon()}
      headerContent={<Title text={"Legend Settings"} group="Color Maps" />}
      headerRightIcon={getHeaderRightIcon()}
      headerAction={getAction()}
      body={getBody()}
      footer={getFooter()}
    />
  );
}
