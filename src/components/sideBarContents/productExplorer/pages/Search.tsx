import {goBack, push} from 'connected-react-router/immutable';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackIcon from '../shared/BackIcon';
import Search from '../search';
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import {selectCheckedLeafNodes} from "../../../../store/sideBar/productTreeSlice";
import Footer from '../Footer'
import { Routes } from '../../../../routes';
import Title from '../shared/Title';


export default function TreeSearch(props:any){
    
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
    const dispatch = useAppDispatch();  
    

    const onClickBackIcon = () =>{
      dispatch(goBack());
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
      return(<Title text="Search"/>)
    }
    

    const getHeaderRightIcon = () => {
      return null
    }

    const getBody = () => {
      return (
            <Search/>
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