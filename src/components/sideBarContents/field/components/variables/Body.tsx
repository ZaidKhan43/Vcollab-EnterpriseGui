import React from 'react'
import TreeSearch from '../../shared/Tree'
import AutoSizer from '../../../../shared/autoSize'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks'
import { selectVariables, setVariableNodeState,  } from '../../../../../store/sideBar/fieldSlice'
import { useState } from 'react'


function Body() {
    const dispatch = useAppDispatch();
    const variables = useAppSelector(selectVariables);
    const [searchText, setSearchText] = useState("");

    return (
        <AutoSizer>
            {
                (size:any) => 
                    <div id="some_wrapper" style={{width:size.width, height:size.height}}>
                        <TreeSearch
                            data = {variables}
                            height = {size.height}
                            rowKey = "id"
                            onChangeSearch = {(s:string,r:any) => {setSearchText(s);} }
                            searchAttribKeys = {["name"]}
                            searchText = {searchText}
                            setNodeStateReducer = {setVariableNodeState}
                            width = {300}
                            searchPlaceholder = "Search Variables"
                        />
                    </div>   
            }
        </AutoSizer>
    )
}

export default Body
