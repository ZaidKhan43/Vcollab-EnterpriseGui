import React from 'react'
import TreeSearch from '../../shared/Tree'
import AutoSizer from '../../../../shared/autoSize'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks'
import { selectSections, expandSection, setSelectSection } from '../../../../../store/sideBar/fieldSlice'
import { useState } from 'react'

function Body() {
    const dispatch = useAppDispatch();
    const sections = useAppSelector(selectSections);
    const handleExpand = (toOpen:boolean,nodeId:string) => {
        dispatch(expandSection({toOpen,nodeId}));
    }
    const handleSelect = (rowData:any) => {
        dispatch(setSelectSection({nodeId:rowData.id,leafOnly:true}))
    }
    const [searchText, setSearchText] = useState("");

    return (
        <AutoSizer>
            {
                (size:any) => 
                    <div id="some_wrapper" style={{width:size.width, height:size.height}}>
                        <TreeSearch
                            data = {sections}
                            height = {size.height}
                            onChangeSearch = {(s:string,r:any) => {setSearchText(s);} }
                            searchAttribKeys = {["title"]}
                            searchText = {searchText}
                            width = {300}
                            searchPlaceholder = "Search Sections & Layers"
                            onExpand = {handleExpand}
                            onRowClick = {handleSelect}
                        />
                    </div>   
            }
        </AutoSizer>
    )
}

export default Body
