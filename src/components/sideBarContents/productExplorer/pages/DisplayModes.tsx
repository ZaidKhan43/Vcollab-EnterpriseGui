import {goBack} from 'connected-react-router/immutable';
import BackIcon from '../shared/BackIcon';
import Title from '../shared/Title';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';

import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import {selectCheckedLeafNodes} from "../../../../store/sideBar/productTreeSlice";
import DisplayModeBody from '../DisplayModes/DisplayModesBody'


export default function DisplayModes(props:any){
    const checkedNodes = useAppSelector(selectCheckedLeafNodes)
    const dispatch = useAppDispatch();  
    

    const onClickBackIcon = () =>{
      dispatch(goBack());
    }

    const getHeaderLeftIcon= () => {
      return (
        <BackIcon onClick={onClickBackIcon}/>
      );
    }

    const getHeaderContent = () => {
      return (<Title text={`${checkedNodes.length } selected` }/>)
    }
    

    const getHeaderRightIcon = () => {
        return null
    }

    const getBody = () => {
      return (
        <DisplayModeBody/>
      )
    }      

    const getFooter = () => {
      return null    
    }

    return (<SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}