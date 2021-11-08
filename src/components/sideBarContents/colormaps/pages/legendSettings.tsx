import MuiIconButton from "@material-ui/core/IconButton";
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";
import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import BackButton from "../../../icons/back";
import FormControl from "@material-ui/core/FormControl";
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks";
import { goBack, push } from "connected-react-router/immutable";
import { InputLabel, ListItemIcon, Typography } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { Button } from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import MuiGrid from '@material-ui/core/Grid'


import {useState} from 'react';
// import { styles } from "@material-ui/core";
import SelectAction from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";
import MuiMenuItem from "@material-ui/core/MenuItem";
import { selectcolormapData, colormapElements, setColorMapSelection, paletteTypeDataList, directionDataList, ticPositionDataList, titlePlacementDataList, valuePlacementDataList } from "../../../../store/sideBar/colormapSlice";

import MuiListSubHeader from '@material-ui/core/ListSubheader';
// import style from "../../../layout/sideBar/sideBarContainer/style";

export default function LegendSettings() {

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


  const dispatch = useAppDispatch();
  
  const onClickBackIcon = () => {
    dispatch(goBack());
  };

  const onHandleSelect = (id : string) => {
    console.log(id)
    dispatch(setColorMapSelection(id));
  }

  const handleSelectChange = (newValue : string, valueType: string) => {
    switch(valueType){
      case "paletteType" :
        setPaletteType(newValue);
      break;
    }
    
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
          <MuiMenuItem value={menu.id}>
            <ListItemIcon>
              <img src={menu.image}></img>
            </ListItemIcon>
            {menu.name}
          </MuiMenuItem>
        );
      });
    } else {
      return listmenu.map((menu: any) => {
        return (
          <MuiMenuItem value={menu.id}>
            <div>
              <span>{menu.name}</span>
              <div>
                <ListItemIcon>
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
      <div style={{ padding: "10px" }}>
        <div style={{marginTop:"10px"}}>
         <SelectAction
            style={{ textAlign: "left" ,}}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Palette Type"}
            value={paletteType}
            onChange={(e : any) => handleSelectChange(e.target.value, "paletteType")}
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

          <div style={{marginTop:"20px"}}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Direction"}
            value={direction}
            // onChange={handleSelectChange}
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

          <div style={{marginTop:"20px"}}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Tic Position"}
            value={ticPosition}
            // onChange={handleSelectChange}
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

          <div style={{marginTop:"20px"}}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Title Placement"}
            value={titlePlacement}
            // onChange={handleSelectChange}
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

          <div style={{marginTop:"20px"}}>
          <SelectAction
            style={{ textAlign: "left" }}
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            label = {"Value Placement"}
            value={valuePlacement}
            // onChange={handleSelectChange}
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

        <div style={{ textAlign: "left", marginTop: "5%" }}>
          <span style={{ marginRight: "5%" }}>Gap</span>

          <MuiTextField
            type="number"
            variant="outlined"
            style={{ width: "30%" }}
            size="small"
          />
        </div>
      </div>
    );
  };
  const getFooter = () => {
    return (
      <Button
        variant="contained"
        style={{
          backgroundColor: "#5958FF",
          width: "30%",
          fontSize: "11px",
          marginRight: "10px",
          marginLeft: "10px",
          marginBottom: "10px",
        }}
      >
        Next
      </Button>
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
