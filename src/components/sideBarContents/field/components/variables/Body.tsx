import React, { useEffect } from 'react'
import TreeSearch from '../../shared/Tree'
import AutoSizer from '../../../../shared/autoSize'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks'
import { getDependantVariableIds, setVisibleVariable, selectVariables, expandVariable, setSelectVariable, setVisibleDerivedTypes, selectDerivedTypes, setVisibleStepsAndSubcase, selectSteps, getSelectedStepIds } from '../../../../../store/sideBar/fieldSlice'
import useSingleSelect from '../../shared/hooks/useSingleSelect'
import useVisibility from '../../shared/hooks/useVisibility'
import { useState } from 'react'


function Body() {
    const dispatch = useAppDispatch();
    const variables = useAppSelector(selectVariables);
    const step = useAppSelector(selectSteps);
    const [depVariableIds, setDepVariableIds] = useState<string[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selected, handleSelect] = useSingleSelect({
        treeData: variables,
        selectReducer: setSelectVariable
    })
    const selectedStepIds = useAppSelector(getSelectedStepIds);
    const visibleIds = useVisibility({
        source: step,
        target: variables,
        targetIds: depVariableIds
    })
    useEffect(() => {
        setDepVariableIds(getDependantVariableIds(step,selectedStepIds));
    },[])
    const handleExpand = (toOpen:boolean,nodeId:string) => {
        dispatch(expandVariable({toOpen,nodeId}));
    }
    
    return (
        <AutoSizer>
            {
                (size:any) => 
                    <div id="some_wrapper" style={{width:size.width, height:size.height}}>
                        <TreeSearch
                            data = {variables}
                            height = {size.height}
                            onChangeSearch = {(s:string,r:any) => {setSearchText(s);} }
                            searchAttribKeys = {["title"]}
                            searchText = {searchText}
                            width = {300}
                            searchPlaceholder = "Search Variables"
                            onExpand = {handleExpand}
                            onRowClick = {handleSelect}
                            selected = {selected}
                            visibleIds = {visibleIds}
                        />
                    </div>   
            }
        </AutoSizer>
    )
}

export default Body
