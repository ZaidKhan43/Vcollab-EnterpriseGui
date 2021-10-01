import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';

export default function Variable(){

  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }
  

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return (
        <div>
        </div>
    )
  }

  const getBody = () => {
    return (
      <div>
          Color maps Variable Soon
      </div>
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={"Variable" } group="Color Maps"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
