import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack} from 'connected-react-router/immutable';


import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';


import { useRef, useState } from 'react';

import AutoSizer from '../../../shared/autoSize'

import {  selectDerivedTypes, expandDerivedTypes, selectVariables, getDependantDerivedTypeIds } from '../../../../store/sideBar/fieldSlice'

import { colormapElements, selectcolormapData, setSelectedDerivedType, ColormapType} from '../../../../store/sideBar/colormapSlice';

import useVisibility from '../../../sideBarContents/field/shared/hooks/useVisibility'

import {useEffect} from 'react';
import TreeSearchRelated from '../shared/treeSearchRelated';

export default function Variable(){

  const dispatch = useAppDispatch();  

  const derivedTypes = useAppSelector(selectDerivedTypes); 
  const [searchText, setSearchText] = useState("");

  const containerRef = useRef(null); 

  const variables = useAppSelector(selectVariables);

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData)
  const appliedDerivedType = colormapsData[activeColormapId].derivedType;
  const colormapNameList = useAppSelector(colormapElements)

  const [depDerivedIds, setDepDerivedIds] = useState<string[]>([]);
  const selectedVariableIds = useAppSelector(state => state.colormap.colormapTree.data[activeColormapId].variable);

  const readOnly = useAppSelector(state => state.colormap.colormapTree.data[activeColormapId].colormapType === ColormapType.SYSTEM ? true : false)

  const derivedVisibleIds = useVisibility({
    source: variables,
    target: derivedTypes,
    targetIds: depDerivedIds,
    // targetSetVisibilityReducer: setVisibleDerivedTypes
})
  useEffect(() => {
    setDepDerivedIds(getDependantDerivedTypeIds(variables,[selectedVariableIds]));
  },[activeColormapId])
  
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

  const onHandleRowClick = (node :any) => {
    console.log(node)
    if(node.children.length === 0)
      dispatch(setSelectedDerivedType({colorMapId :activeColormapId, derivedTypeId : node.id}))
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
                        <TreeSearchRelated
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
                            onRowClick = {!readOnly ? onHandleRowClick : () => null}
                           visibleIds ={derivedVisibleIds}
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
