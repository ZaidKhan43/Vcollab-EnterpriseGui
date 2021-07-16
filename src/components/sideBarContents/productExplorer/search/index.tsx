import React, {useState, useEffect, useRef} from 'react'
import useContainer from '../../../../customHooks/useContainer';
import Table,{ Column,HeaderCell,Cell } from '../../../shared/RsTable';
import {useAppSelector , useAppDispatch} from '../../../../store/storeHooks'
import SearchItem from './SearchItem'
import SearchHints from './SearchHints'
import {selectSearchHints,selectPrevSearches,setCheckedNodesAsync,selectProductTreeData, setSearchString, TreeNode as ITreeNode, selectSearchResults} from "../../../../store/sideBar/productTreeSlice"
import Checkbox from "@material-ui/core/Checkbox"
import {makeStyles} from '@material-ui/core/styles'

const useRTreeOverrideStyles = makeStyles((theme) => ({
  tree: {
      
  }
})) 

function Search(props:any) {
    const treeData = useAppSelector(selectProductTreeData);
    const prevSearches = useAppSelector(selectPrevSearches);
    const searchHints = useAppSelector(selectSearchHints);
    const result = useAppSelector(selectSearchResults);
    const dispatch = useAppDispatch();
    // eslint-disable-next-line
    const [selectAll, setSelectAll] = useState(false);

    const headerRef = useRef(null);
    // eslint-disable-next-line
    const [headerWidth, headerHeight] = useContainer(headerRef,[]);
    const containerRef = useRef(null);
    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(containerRef,[]);

    const generateOptions = () => {
        let options:any = {};
        prevSearches.forEach((e:string) => {
            options[e] = Object.keys(options).length;
        })
        searchHints.forEach((e:string) => {
            options[e] = Object.keys(options).length;
        })
        return Object.keys(options) as string[]
    }

    const handleCheck = (toCheck:boolean,node:ITreeNode) => {
        dispatch(setCheckedNodesAsync({toCheck,nodeId:node.id}));
    }

    const handleSelectAll = (state:boolean) => {
        result.forEach((data:any) => {
            dispatch(setCheckedNodesAsync({toCheck: state, nodeId: data.item.id}));
        })
        setSelectAll(state);
    }
    const overrideStyles = useRTreeOverrideStyles();
    return (
        <div ref = {containerRef} style={{height:'100%', overflow:'hidden'}} >
          <div ref = {headerRef} >

            <SearchHints data = {generateOptions()} setInput={setSearchString}></SearchHints>
            {
            result.length !== 0 ?
            <div>
            <Checkbox color="primary" size='small' onChange = {(e:any) => {handleSelectAll(e.target.checked)}} checked = {selectAll} ></Checkbox>
                Select All
            </div>
            : null
            }
          </div>


            {/*
 // @ts-ignore */}
            <Table height={containerHeight? containerHeight - headerHeight : 0}
                   data={result}
                   id="searchList"
                   showHeader={false}
                   width={300}
                   rowHeight = {(rowData:any) => {
                        let attr = rowData?.item?.id? treeData[rowData.item.id].attributes : null;
                        if(attr && Object.keys(attr).length > 0)
                        {
                            let height = 30 * (Object.keys(attr).length+1);
                            console.log("height",height)
                            return height;
                        }
                        else{
                            let height = 45;
                            console.log("height",height)
                            return height;
                        }
                        
                   }}
                   virtualized={true}
            >
                <Column width={700} align="left">
                    {/*
 // @ts-ignore */}
                    <HeaderCell> Results </HeaderCell>
                    {/*
 // @ts-ignore */}
                    <Cell >
                        {
                            rowData => {
                                let node = treeData[rowData.item.id];
                                return(<SearchItem item = {node} onChange = {handleCheck}/>)
                            }
                        }
                    </Cell>
                </Column>
            </Table>
        </div>
    )
}

export default Search;
