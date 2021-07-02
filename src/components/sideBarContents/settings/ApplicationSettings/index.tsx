import MuiGrid from'@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';



import AddIcon from '@material-ui/icons/Add';

import Input from '../ApplicationSettings/ControlsList/Controls_Actions'; 

import {
  selectmouseControllist,
  addItemToMouseControlsList

} from '../../../../store/sideBar/settings';

import { useAppSelector,useAppDispatch } from '../../../../store/storeHooks';


export default function ApplicationSettings() {

const dispatch = useAppDispatch();

const onhandleAddItemToMouseControlsList= ()=>{

  dispatch(addItemToMouseControlsList());

}  


  const mouseControllist = useAppSelector(selectmouseControllist);

  return (

    <div>

    <MuiGrid container spacing={2}>

        <MuiGrid item xs={6} style={{marginTop:10}}>

        <MuiTypography>List Of Controls</MuiTypography>

        </MuiGrid>

        <MuiGrid item xs={6} style={{paddingLeft:60}}>

        <MuiIconButton onClick={onhandleAddItemToMouseControlsList}><AddIcon></AddIcon></MuiIconButton>

        </MuiGrid>

        <MuiGrid item xs={6}>

            <div style={{textAlign:'left',marginLeft:'18px'}}>Controls</div> 

        </MuiGrid>

            <MuiGrid item xs={6}>

            <div  style={{textAlign:'center',marginLeft:'-60px'}}>Actions</div> 

        </MuiGrid>

    </MuiGrid>
                {mouseControllist.map((item) => {

                  return (

                    <Input column1={item.column1} column2={item.column2} id={item.id}/> 
                    
                  )
               })}

    </div>


  )

}