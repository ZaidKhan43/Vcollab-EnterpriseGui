import React from 'react'
import TreeSearch from '../../shared/Tree'
import AutoSizer from '../../../../shared/autoSize'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks'
import { selectVariables, expandVariable, selectVariable } from '../../../../../store/sideBar/fieldSlice'
import { useState } from 'react'


function Body() {
    const dispatch = useAppDispatch();
    const variables = useAppSelector(selectVariables);
    const [searchText, setSearchText] = useState("");

    const handleExpand = (toOpen:boolean,nodeId:string) => {
        dispatch(expandVariable({toOpen,nodeId}));
    }
    const handleSelect = (rowData:any) => {
        dispatch(selectVariable({nodeId:rowData.id,leafOnly:true}))
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
                        />
                    </div>   
            }
        </AutoSizer>
    )
}

export default Body
