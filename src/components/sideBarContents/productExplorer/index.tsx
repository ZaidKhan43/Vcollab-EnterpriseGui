import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackIcon from '@material-ui/icons/ArrowBack'
import Search from '@material-ui/icons/Search';

import styles from './style';
import RTree from './RTree';
import TreeSearch from './search';
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import {sideBarContentTypes} from "../../../config";
import {setSidebarActiveContent} from "../../../store/appSlice";
import {selectCheckedLeafNodes,selectCurrentState,ProductTreeStates,setProductTreeState} from "../../../store/sideBar/productTreeSlice";
import DisplayModeBody from './DisplayModes/DisplayModesBody'
import Footer from './Footer'

export default function ProductExplorer(props:any){
    
    const classes = styles();
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
    const currentState = useAppSelector(selectCurrentState);
    const dispatch = useAppDispatch();  

    const onClickBackIcon = () =>{
      switch (currentState) {
        case ProductTreeStates.Search:
          dispatch(setProductTreeState({data:ProductTreeStates.Tree}));
          break;
        case ProductTreeStates.Tree:
          dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu));
          break;
        case ProductTreeStates.DisplayModes:
          dispatch(setProductTreeState({data:ProductTreeStates.Tree}));
          break;
        default:
          break;
      }
    }

    const onClickSearchIcon = () => {
       dispatch(setProductTreeState({data:ProductTreeStates.Search}));
    }

    const handleNext = () => {
       switch (currentState) {
         case ProductTreeStates.Tree:
          dispatch(setProductTreeState({data:ProductTreeStates.DisplayModes}));
           break;
         case ProductTreeStates.Search:
          dispatch(setProductTreeState({data:ProductTreeStates.DisplayModes}));
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
      onClick={() => onClickBackIcon()}><BackIcon/></IconButton>
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
                onClick={() => onClickSearchIcon()}><Search/>
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
          return checkedNodes.length > 0 ? (<Footer selectedCount={checkedNodes.length}
            handleNext = {handleNext}
          ></Footer>) : null
        case ProductTreeStates.Search:
          return checkedNodes.length > 0 ? (<Footer selectedCount={checkedNodes.length}
            handleNext = {handleNext}
          ></Footer>) : null
        default:
          return null
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