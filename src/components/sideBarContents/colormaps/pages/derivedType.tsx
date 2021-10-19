import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack} from 'connected-react-router/immutable';


import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';


import { useRef, useState } from 'react';

import RsTreeSearch from '../../../shared/RsTreeWithSearch'
import AutoSizer from '../../../shared/autoSize'

import {  selectDerivedTypes, expandDerivedTypes, } from '../../../../store/sideBar/fieldSlice'

import { colormapElements, selectcolormapData, setSelectedDerivedType} from '../../../../store/sideBar/colormapSlice';

import {useStyles} from '../../../shared/RsTreeTable/styles/TreeNodeStyle'
import Grid from '@material-ui/core/Grid'
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import TitleOne from '../../../shared/RsTreeWithSearch/utilComponents/TitleNode'

export default function Variable(){

  const dispatch = useAppDispatch();  
  const classes = useStyles();

  const derivedTypes = useAppSelector(selectDerivedTypes);
  const [searchText, setSearchText] = useState("");

  const containerRef = useRef(null); 

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData)
  const appliedDerivedType = colormapsData[activeColormapId].derivedType;
  const colormapNameList = useAppSelector(colormapElements)

  // const classes = styles();
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandDerivedTypes({toOpen,nodeId}));
}

  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  const onVariableClick = (node :any) => {
    console.log(node)
    if(node.children.length === 0)
      dispatch(setSelectedDerivedType({colorMapId :activeColormapId, variableId : node.id}))
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
    
    return (
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
      <AutoSizer>
            {
                (size:any) => 
                    <div id="some_wrapper" style={{width:size.width, height:size.height}}>
                        <RsTreeSearch
                            data = {derivedTypes}
                            height = {size.height}
                            hover
                            selectable
                            selected={[appliedDerivedType]}
                            onChangeSearch = {(s:string,r:any) => {setSearchText(s);} }
                            searchAttribKeys = {["title"]}
                            searchText = {searchText}
                            width = {300}
                            searchPlaceholder = "Search Variables"
                            onExpand = {handleExpand}
                            onRowClick = {onVariableClick}
                            treeNode={
                              rowData =>
                              <Grid container alignItems='center' className={rowData.state.visibility ?classes.actionShow:classes.actionHide}>
                                  <Grid item>
                                  <div style={{width:10}}></div>
                                  </Grid>
                                  <Grid item>
                                  <TitleOne rowData = {rowData}></TitleOne>
                                  </Grid>
                              </Grid>
                          }
                          renderTreeToggle = {(icon,rowData) => {
                                      if (rowData.children && rowData.children.length === 0) {
                                      return null;
                                      }
                                      let state = derivedTypes[rowData.id]?.state;
                                      return state.expanded? <TreeExpandedIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>:<TreeCollapseIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>
                                  }
                          }
                              
                          />

                    </div>   
            }
        </AutoSizer>
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
            headerContent={ <Title text={"Derived Type" } group="Color Maps"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
