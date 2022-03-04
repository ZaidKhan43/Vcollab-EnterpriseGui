import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack} from 'connected-react-router/immutable';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiListSubHeader from '@material-ui/core/ListSubheader';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { useRef, useState , useEffect } from 'react';

import AutoSizer from '../../../shared/autoSize'

import {selectSteps, expandStepsAndSubcase, selectVariables, getDependantStepIds,} from '../../../../store/sideBar/fieldSlice'

import { colormapElements, selectcolormapData, setSelectedStep, ColormapType} from '../../../../store/sideBar/colormapSlice';

import useVisibility from '../../../sideBarContents/field/shared/hooks/useVisibility'
import TreeSearchRelated from '../shared/treeSearchRelated';

export default function Variable(){

  const dispatch = useAppDispatch();  

  const steps = useAppSelector(selectSteps);
  const variables = useAppSelector(selectVariables);

  const [depStepIds, setDepStepIds] = useState<string[]>([]);

  const [searchText, setSearchText] = useState("");

  const containerRef = useRef(null); 

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData)
  const appliedStep = colormapsData[activeColormapId].step;
  const colormapNameList = useAppSelector(colormapElements)

  const selectedVariableIds = colormapsData[activeColormapId].variable;

  const readOnly = colormapsData[activeColormapId].colormapType === ColormapType.SYSTEM ? true : false;

  const stepVisibleIds = useVisibility({
    source: variables,
    target: steps,
    targetIds: depStepIds,
    // targetSetVisibilityReducer: setVisibleStepsAndSubcase
})
useEffect(() => {
    setDepStepIds(getDependantStepIds(steps,[selectedVariableIds]));
},[activeColormapId])

  // const classes = styles();
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandStepsAndSubcase({toOpen,nodeId}));
}

  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  const onHandleRowClick = (node :any) => {
    console.log(node)
    if(node.children.length === 0)
      dispatch(setSelectedStep({colorMapId :activeColormapId, stepId : node.id}))
  }
  
  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getAction = () => {
    const parentNodes = colormapNameList.filter(item => item.children?.length !== 0)

    return(
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeColormapId}
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
          colormapNameList.map((element : any) => {
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
          colormapNameList.map((element : any) => {
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
  }

  const getHeaderRightIcon = () => {
    return (
        <div>
        </div>
    )
  }

  const getBody = () => {

    console.log("depStepIds",depStepIds)
    console.log(selectedVariableIds)

    console.log("stepVisibleIds",stepVisibleIds)
    return (
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
      <AutoSizer>
            {
                (size:any) => 
                    <div id="some_wrapper" style={{width:size.width, height:size.height}}>
                        <TreeSearchRelated
                            data = {steps}
                            height = {size.height}
                            hover
                            selectable
                            selected={[appliedStep]}
                            onChangeSearch = {(s:string,r:any) => {setSearchText(s);} }
                            searchAttribKeys = {["title"]}
                            searchText = {searchText}
                            width = {300}
                            searchPlaceholder = "Search Variables"
                            onExpand = {handleExpand}
                            onRowClick = {!readOnly ? onHandleRowClick : () => null}
                            visibleIds = {stepVisibleIds}
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
            headerContent={ <Title text={"Steps & subcase" } group="Color Maps"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
