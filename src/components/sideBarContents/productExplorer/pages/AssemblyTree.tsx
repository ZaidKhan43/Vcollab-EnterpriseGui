import {goBack, push} from 'connected-react-router/immutable';
import BackIcon from '../shared/BackIcon';
import SearchIcon from '../shared/SearchIcon';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import {Routes} from "../../../../routes"
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import RTree from '../RTree';
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import {selectCheckedLeafNodes} from "../../../../store/sideBar/productTreeSlice";
import Footer from '../Footer'


function AssemblyTree(props:any) {
    
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
    const dispatch = useAppDispatch();  
    

    const onClickBackIcon = () =>{
      dispatch(goBack());
    }

    const onClickSearchIcon = () => {
      dispatch(push(Routes.GEOMETRY_SEARCH)); 
    }

    const handleNext = () => {
      dispatch(push(Routes.GEOMETRY_DISPLAY_MODES))
    }

    const getHeaderLeftIcon= () => {
        return (
        <BackIcon onClick={onClickBackIcon}/>
        )
    }

    const getHeaderContent = () => {

          return (<Title text="Product Tree" group="Geometry"/>)
    }
    

    const getHeaderRightIcon = () => {
        return (
          <SearchIcon onClick={onClickSearchIcon} />
        )
    }

    const getBody = () => {
      return(
          <RTree/>
      )
    }      

    const getFooter = () => {
          return checkedNodes.length > 0 ? (<Footer selectedCount={checkedNodes.length}
            handleNext = {handleNext}
          ></Footer>) : null
    }

    return (<SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}

export default AssemblyTree;