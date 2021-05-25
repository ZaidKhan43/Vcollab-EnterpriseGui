import React, {useState, useEffect, useRef} from 'react'
import useContainer from '../../../../customHooks/useContainer';
import { Table, Column,HeaderCell,Cell } from 'rsuite-table';
import { getSearchInput} from "../../../utils/search";
import {useAppSelector , useAppDispatch} from '../../../../store/storeHooks'
import SearchItem from './SearchItem'
import SearchHints from './SearchHints'
import {selectSearchHints,selectPrevSearches,saveSearchQuery,setCheckedNodesAsync,selectProductTreeData, updatePrevSearches, TreeNode as ITreeNode} from "../../../../store/sideBar/productTreeSlice"
import Checkbox from "@material-ui/core/Checkbox"
import TextField from '@material-ui/core/TextField';
import IconButtom from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
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
    const searchHints = useAppSelector(selectSearchHints);
    const dispatch = useAppDispatch();
    const [fuse, setFuse] = useState(null);
    const [result, setResult] = useState([] as any);
    const [searchString, setSearchString] = useState("");
    // eslint-disable-next-line
    const [isOpen, setisOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const headerRef = useRef(null);
    // eslint-disable-next-line
    const [headerWidth, headerHeight] = useContainer(headerRef,[]);
    const containerRef = useRef(null);
    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(containerRef,[]);

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
        searchHints.forEach((e:string) => {
            options[e] = Object.keys(options).length;
        })
        return Object.keys(options) as string[]
    }
    useEffect(() => {
      let options = {
            includeScore: false,
            keys: getAttrbKeys([...Object.values(treeDataRef.current)]),
            ignoreLocation: true,
            includeMatches:false,
            threshold: 0.2,
            useExtendedSearch: true,
            minMatchCharLength: 2
        }
        let fuse:any = new Fuse([...Object.values(treeDataRef.current)],options);
        setFuse(fuse);
    }, [dispatch])

    useEffect(() => {
        let searchInput = getSearchInput(searchString);
        let r:any[] = (fuse as any)?.search(searchInput);
        if(r)
        setResult(r.filter(e => e.item.children.length === 0));
        setSelectAll(false)
    },[searchString,fuse])

    const handleSearch = (e:any) => {
       if (!e) {
         return
       } 
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
        <div ref = {containerRef} style={{height:'100%', overflow:'hidden'}} >
          <div ref = {headerRef} >
            <Grid container alignItems='center' justify='center' spacing={1}>
              <Grid item xs={11}>
              <Autocomplete
                style={{marginTop:-10}}
                size = 'small'
                color = 'inherit'
                disableClearable
                clearOnBlur = {false}
                open = {false}
                forcePopupIcon = {false}
                fullWidth = {true}
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
                    label="Search"
                    margin="normal"
                    InputProps={{ ...params.InputProps, type: 'search', endAdornment:  <IconButtom size='small' onClick={() => dispatch(updatePrevSearches())}> <AddIcon/></IconButtom> }}
                    
                />
                )}
            />
              </Grid>
              <Grid item>
             
              </Grid>
            </Grid>

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
