import React from 'react'
import TreeSearch from '../../shared/Tree'
import AutoSizer from '../../../../shared/autoSize'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks'
import { selectDerivedTypes, setDerivedNodeState,  } from '../../../../../store/sideBar/fieldSlice'
import { useState } from 'react'


function Body() {
    const dispatch = useAppDispatch();
    const derived = useAppSelector(selectDerivedTypes);
    
    const [searchText, setSearchText] = useState("");

    return (
        <AutoSizer>
            {
                (size:any) => 
                    <div id="some_wrapper" style={{width:size.width, height:size.height}}>
                        <TreeSearch
                            data = {derived}
                            height = {size.height}
                            rowKey = "id"
                            onChangeSearch = {(s:string,r:any) => {setSearchText(s);console.log("r",r)} }
                            searchAttribKeys = {["name"]}
                            searchText = {searchText}
                            width = {300}
                            setNodeStateReducer = {setDerivedNodeState}
                            searchPlaceholder = "Search DerivedTypes"
                        />
                    </div>   
            }
        </AutoSizer>
    )
}

export default Body
