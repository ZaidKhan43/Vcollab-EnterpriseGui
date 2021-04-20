import {useState} from 'react';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackIcon from '../../../assets/images/back.svg';
import Search from '../../../assets/images/search.svg';

import styles from './style';
import RTree from './RTree';
import TreeSearch from './search';
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import {sideBarContentTypes} from "../../../config";
import {setSidebarActiveContent} from "../../../store/appSlice";
import {selectCheckedLeafNodes} from "../../../store/sideBar/ProductTreeSlice"
import {ProductTreeStates} from './TreeStates' 
import DisplayModeBody from './DisplayModes/DisplayModesBody'
import Footer from './Footer'

export default function ProductExplorer(props:any){
    
    const classes = styles();
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
    const [currentState, setCurrentState] = useState(ProductTreeStates.Tree);
    const dispatch = useAppDispatch();  

    const onClickBackIcon = () =>{
      switch (currentState) {
        case ProductTreeStates.Search:
          setCurrentState(ProductTreeStates.Tree);
          break;
        case ProductTreeStates.Tree:
          dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu));
          break;
        case ProductTreeStates.DisplayModes:
          setCurrentState(ProductTreeStates.Tree);
          break;
        default:
          break;
      }
    }

    const onClickSearchIcon = () => {
       setCurrentState(ProductTreeStates.Search);
    }

    const handleNext = () => {
       switch (currentState) {
         case ProductTreeStates.Tree:
           setCurrentState(ProductTreeStates.DisplayModes);
           break;
         case ProductTreeStates.Search:
           setCurrentState(ProductTreeStates.DisplayModes);
           break;
         default:
           break;
       }
    }
    const getHeaderLeftIcon= () => {
      return (
      <ToolTip title='Back'>
      <IconButton
      className={classes.backIcon}
      onClick={() => onClickBackIcon()}><img src={ BackIcon } alt={'BackIcon'} /> </IconButton>
      </ToolTip>
      );
    }

    const getHeaderContent = () => {
      switch (currentState) {
        case ProductTreeStates.Tree:
          return (<Typography className={classes.heading} variant='h1' noWrap>
          Product Tree
        </Typography>)
        case ProductTreeStates.Search:
          return (<Typography className={classes.heading} variant='h1' noWrap>
          Search
        </Typography>)
        case ProductTreeStates.DisplayModes:
          return (<Typography className={classes.heading} variant='h1' noWrap>
          {checkedNodes.length} Selected
        </Typography>)
        default:
          return null;
      }
    }

    const getHeaderRightIcon = () => {
        switch (currentState) {
          case ProductTreeStates.Tree:
            return (
              <ToolTip title='Search'>
                <IconButton
                className={classes.backIcon}
                onClick={() => onClickSearchIcon()}><img src={ Search } alt={'Search'} /> 
                </IconButton>
              </ToolTip>
            )

        
          default:
            return null;
        }
    }

    const getBody = () => {
      switch (currentState) {
        case ProductTreeStates.Search:
          return <TreeSearch ></TreeSearch> 
        case ProductTreeStates.Tree:
          return <RTree ></RTree> 
        case ProductTreeStates.DisplayModes:
          return <DisplayModeBody/>
        default:
          return null
      }      
    }

    const getFooter = () => {
      switch (currentState) {
        case ProductTreeStates.Tree:
          return (<Footer selectedCount={checkedNodes.length}
            handleNext = {handleNext}
          ></Footer>)
        case ProductTreeStates.Search:
          return (<Footer selectedCount={checkedNodes.length}
            handleNext = {handleNext}
          ></Footer>)
        case ProductTreeStates.DisplayModes:
          return null
      
        default:
          break;
      }     
    }

    return (<SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}