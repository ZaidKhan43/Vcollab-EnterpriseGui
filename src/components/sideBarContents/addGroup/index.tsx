import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import {goBack, push} from 'connected-react-router/immutable';
import nextId from 'react-id-generator';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import { Routes } from '../../../routes';
import SearchBox from '../../shared/searchBox';
import Body from './Body'
import { useState } from 'react';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import { SearchItem, selectList, selectPrevSearches} from '../../../store/moreSlice'
import OptionContainer from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer';
import Option from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PublishIcon from '@material-ui/icons/Publish';
import { Input } from '@material-ui/core';
import { addMenuItem, addTab, getItem, MainMenuItem, MainMenuItems, selectMainMenuItems, setActiveTab } from 'store/mainMenuSlice';
import { Edit } from '@material-ui/icons';

type AddGroupProps = {
    disabled: boolean,
    onClickEdit: () => void,
    selectedGroup: MainMenuItem
}

export default function AddGroup(props:AddGroupProps){
    
    const dispatch = useAppDispatch();  
    const [groupName, setGroupName] = useState(props.selectedGroup.name);
    const [showSearch ,setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SearchItem[]>([])
    const mainMenuPages = useAppSelector(selectList);
    const mainMenuItems = useAppSelector(selectMainMenuItems);

    const getHeaderLeftIcon= () => {
      return null
    }

    const getHeaderContent = () => {
      return(
      showSearch? 
      <SearchBox 
        text={searchText} 
        onChange={(e:any,r:any[]) => {
          setSearchText(e);
          setSearchResults(r.map(e => e.item));
        }} 
        onClear={() => {}} 
        searchPool={mainMenuPages}
        placeholder='type here'
        textBoxWidth={240}
        getAttribKeys={(data: SearchItem) => {return ["name"]}}
        />
        :
        <Input style={
          {
            margin:5,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 5,
            height:40,
            width: 240
          }
        }
        value={groupName}
        onChange={e => setGroupName(e.target.value)} 
        defaultValue={groupName} inputProps={{ 'aria-label': 'description' }}/>
        )
    }
    

    const getHeaderRightIcon = () => {
      return(
    <>
    {
      !showSearch ?
    <IconButton aria-label="search" onClick={() => {setShowSearch(true)}}>
          <SearchIcon/>
        </IconButton>
      :
      <IconButton aria-label="go back to more options" onClick={() => {setShowSearch(false)}}>
      <ClearIcon />
    </IconButton>
    }
    <IconButton aria-label='toggle edit' onClick={() => props.onClickEdit()}>
      <Edit/>
    </IconButton>
    </>
    )
    }

    const getBody = () => {
      return (
            <Body 
            showSearch={showSearch}
            searchItems={mainMenuPages}
            searchText={searchText}
            selectedList={selectedItems}
            setSelectedList={setSelectedItems}
            searchResults={ showSearch ? searchResults : mainMenuPages}
            onClickSearchHints={(s:string) => {
              setShowSearch(true);
              setTimeout(() => setSearchText(s),10)
            }}
            />
      )
    }      

    const getFooter = () => {
        return  <OptionContainer>
        <Option label="Save" icon = {
        <IconButton disabled={props.disabled} >
            <SaveAltIcon/>
        </IconButton>  
       }/>
       <Option label="Change" icon = {
        <IconButton disabled={props.disabled} onClick={() => {}}>
            <PublishIcon/>
        </IconButton>  
       }/>
        <Option 
        label = "Delete"
        icon = {<IconButton disabled={props.disabled} onClick={() => {}}>
        <DeleteForeverIcon/>
        </IconButton>  }
        />
    </OptionContainer>
    }

    return (<SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}