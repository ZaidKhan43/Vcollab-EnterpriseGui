import React, {useState, useEffect, useRef} from 'react'
import useLoadCss from '../../../../customHooks/useLoadCss';
import useContainer from '../../../../customHooks/useContainer';
import { Table, Column,HeaderCell,Cell } from 'rsuite-table';
import {useAppSelector , useAppDispatch} from '../../../../store/storeHooks'
import SearchItem from './SearchItem'
import {fetchSearchHints,selectSearchHints,selectPrevSearches,saveSearchQuery,setCheckedNodesAsync,selectProductTreeData, updatePrevSearches, TreeNode as ITreeNode} from "../../../../store/sideBar/ProductTreeSlice"
import Checkbox from "@material-ui/core/Checkbox"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Fuse from 'fuse.js';
import {makeStyles} from '@material-ui/core/styles'

const useRTreeOverrideStyles = makeStyles((theme) => ({
  tree: {
      '& .rs-table-scrollbar': {
        background: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.05)':'rgba(25, 25, 25, 0.05)',
        position: 'absolute'
      },
      '& .rs-table-scrollbar-active': {
        background: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.1)':'rgba(25, 25, 25, 0.1)'
      },
      '& .rs-table-scrollbar-handle': {
        position: 'absolute',
        background: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.5)':'rgba(25, 25, 25, 0.5)',
        borderRadius: '4px'
      },
      '':{

      }
  }
})) 

function Search(props:any) {

    const treeData = useAppSelector(selectProductTreeData);
    const treeDataRef = useRef(treeData);
    const prevSearches = useAppSelector(selectPrevSearches);
    const searchHints:any[] = useAppSelector(selectSearchHints);
    const dispatch = useAppDispatch();
    const [fuse, setFuse] = useState(null);
    const [result, setResult] = useState([] as any);
    const [searchString, setSearchString] = useState("");
    const [isOpen, setisOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const containerRef = useRef(null);
    const [containerWidth, containerHeight] = useContainer(containerRef,[]);
    const headerHeight = 111;

    const getAttrbKeys = (treeArray:any[]) => {
        let keys = new Set();
        for (let i=0; i< treeArray.length; i++){
          if(treeArray[i].pid){
            let attr = treeArray[i].attributes;
            Object.keys(attr).forEach(key => {
              keys.add("attributes."+key);
            })
          }
        }
        return ['title',...keys] as string[];
    
    }
    const generateOptions = () => {
        let options:any = {};
        prevSearches.forEach((e:string) => {
            options[e] = Object.keys(options).length;
        })
        searchHints.forEach((e:any) => {
            options[e['code']] = Object.keys(options).length;
        })
        return Object.keys(options) as string[]
    }

    useEffect(() => {
        let options = {
            includeScore: true,
            keys: getAttrbKeys([...Object.values(treeDataRef.current)]),
            ignoreLocation: true,
            includeMatches:true,
            useExtendedSearch: true
        }
        let fuse:any = new Fuse([...Object.values(treeDataRef.current)],options);
        dispatch(fetchSearchHints());
        setFuse(fuse);
        return () => {
            dispatch(updatePrevSearches())
        }
    }, [dispatch])

    useEffect(() => {
        let r = (fuse as any)?.search(searchString);
        if(r)
        setResult(r);
        setSelectAll(false)
    },[searchString,fuse])

    const handleSearch = (e:any) => {
       const query = e? e.target.value : "";
        setSearchString(query);
        dispatch(saveSearchQuery({data:query}));
    }
    const handleAutoComplete = (e:any) => {
        if(e.key === "Enter")
        return;
        setSearchString(e.target.outerText);
        dispatch(saveSearchQuery({data:e.target.outerText}));
    }
    const handleAutoCompleteOpenState = (v:boolean) => {
      setisOpen(v);
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
        <div ref = {containerRef} style={{height:'100%'}} >
          <div style={{height:headerHeight}}>
          <Autocomplete
                style={{paddingLeft: 10, paddingRight: 10}}
                size = 'small'
                color = 'inherit'
                disableClearable
                clearOnBlur = {false}
                open = {isOpen}
                onOpen = {(e:any) => {handleAutoCompleteOpenState(true)}}
                onClose = {(e:any) => {handleAutoCompleteOpenState(false)}}
                onKeyPress = {(e:any) => {
                  if(e.code === 'Enter' || e.code === 'NumpadEnter'){
                    setisOpen(false);
                  }
                }}
                id="free-solo-search"
                value={searchString}
                options={generateOptions()}
                onChange={handleAutoComplete}
                onInputChange={handleSearch}
                renderOption={(option, { inputValue }) => {
                    const matches = match(option, inputValue);
                    const parts = parse(option, matches);
            
                    return (
                      <div>
                        {parts.map((part:any, index:any) => (
                          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                            {part.text}
                          </span>
                        ))}
                      </div>
                    );
                  }}
                renderInput={(params:any) => (
                <TextField
                    {...params}
                    label="Search input"
                    margin="normal"
                    variant='outlined'
                    InputProps={{ ...params.InputProps, type: 'search' }}
                    
                />
                )}
            />
            {
            result.length !== 0 ?
            <span>
            <Checkbox color="primary" onChange = {(e:any) => {handleSelectAll(e.target.checked)}} checked = {selectAll} ></Checkbox>
                Select All
            </span>
            : null
            }
          </div>


            {/*
 // @ts-ignore */}
            <Table height={containerHeight? containerHeight - headerHeight : 0}
                   className={overrideStyles.tree}
                   data={result}
                   id="searchList"
                   showHeader={false}
                   width={300}
                   rowHeight = {(rowData:any) => {
                        let attr = rowData?.item?.attributes;
                        if(attr && Object.keys(attr).length > 0)
                        {
                            return 30 * (Object.keys(attr).length+1);
                        }
                        else{
                            return 45;
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
