import React from 'react'
import TreeSearch from '../../shared/Tree'
import AutoSizer from '../../../../shared/autoSize'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks'
import { selectSteps, setStepAndSubCaseNodeState,  } from '../../../../../store/sideBar/fieldSlice'
import { useState } from 'react'


function Body() {
    const dispatch = useAppDispatch();
    const steps = useAppSelector(selectSteps);
    
    const [searchText, setSearchText] = useState("");

    return (
        <AutoSizer>
            {
                (size:any) => 
                    <div id="some_wrapper" style={{width:size.width, height:size.height}}>
                        <TreeSearch
                            data = {steps}
                            height = {size.height}
                            rowKey = "id"
                            onChangeSearch = {(s:string,r:any) => {setSearchText(s);} }
                            searchAttribKeys = {["name"]}
                            searchText = {searchText}
                            width = {300}
                            setNodeStateReducer = {setStepAndSubCaseNodeState}
                            searchPlaceholder = "Search Steps & Subcases"
                        />
                    </div>   
            }
        </AutoSizer>
    )
}

export default Body
