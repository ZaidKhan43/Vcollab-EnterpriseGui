import React, { useEffect } from 'react'
import TreeSearch from '../../shared/Tree'
import AutoSizer from '../../../../shared/autoSize'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks'
import { selectVariables, expandVariable, setSelectVariable, setVisibleDerivedTypes, selectDerivedTypes } from '../../../../../store/sideBar/fieldSlice'
import { useState } from 'react'


function Body() {
    const dispatch = useAppDispatch();
    const variables = useAppSelector(selectVariables);
    const derived = useAppSelector(selectDerivedTypes);
    const [searchText, setSearchText] = useState("");
    const [selected, setSelected] = useState([]);

    const handleExpand = (toOpen:boolean,nodeId:string) => {
        dispatch(expandVariable({toOpen,nodeId}));
    }
    const handleSelect = (rowData:any) => {
        let cur = variables[rowData.id];
        Object.values(derived).forEach(d => {
            dispatch(setVisibleDerivedTypes({nodeId:d.id,toShow:false}))
        })
        if(cur.state.selected === false) {
            cur.derivedIds.forEach(id => {
                dispatch(setVisibleDerivedTypes({nodeId:id,toShow:true}))
            })
        }
        dispatch(setSelectVariable({nodeId:rowData.id,leafOnly:true}))
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
