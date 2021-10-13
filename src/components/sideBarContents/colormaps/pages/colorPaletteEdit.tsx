import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';


import MuiPlusIcon from '@material-ui/icons/Add';
import MuiMinusIcon from '@material-ui/icons/Remove';
import MuiGrid from '@material-ui/core/Grid';
import ColorPicker from '../../../shared/colorPicker';
import MuiTypography from '@material-ui/core/Typography';

import FileMoveUpIcon from '../../../icons/fileMoveUp';
import FIleMoveDownIcon from '../../../icons/fileMoveDown';

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import MuiButton from '@material-ui/core/Button';

export default function ColorPalleteEdit(){

  const dispatch = useAppDispatch();
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }
  
  const colorSet = [
    {
       id:1, 
       color:{r:160, g:160, b:252, a:1}
    }, 
    {
      id:2, 
      color:{r:255, g:255, b:255, a:1}
    }
  ]

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
        <div style={{marginTop:"20px"}}>
          <div>
            <MuiGrid container>
              <MuiGrid item xs={4}>
                <MuiTypography>
                  Add Color
                </MuiTypography>
              </MuiGrid>
              <MuiGrid item xs={6}></MuiGrid>
              <MuiGrid item xs={2}>
                <MuiIconButton size="small"><MuiPlusIcon
                  //  onClick={handleAddColor} className={classes.buttonComponent }
                /></MuiIconButton>             
              </MuiGrid>
            </MuiGrid>
          </div>
          
          <MuiGrid container spacing={2} style={{marginLeft:"10px",marginTop:"10px"}}>
            <MuiGrid item xs={2}>
              { colorSet.map((item : any, index : number) => 
                <div 
                  key={ 'divParent_' + index } 
                  // className={selectedColor ? item.id !== selectedColor.id ? classes.colorPicker : classes.active : classes.colorPicker} 
                  style={{height:"30px", 
                    marginTop:"10px",
                    width:"30px",
                    backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                  }}
                  // onClick={() => handleColorSelector(item)}
                >
                </div>
              )}
            </MuiGrid>
                          
            <MuiGrid item xs={4} style={{marginLeft:"5px"}}>
              <ColorPicker
                color={{r:255, g:255, b:255, a:1}}
                // onChangeComplete={selectedColor && handleChangeComplete }
              />                 
            </MuiGrid>
          </MuiGrid>                     
        </div>
      </div>
    )
  }


  const getFooter = () => {

    return(
      <div>
      { true
        // !openDelete
        ?
          <div>
            { true
              // selectedColorPalette !== "-1" && selectedColorPalette !== appliedColorPalette 
              ?
                <div style={{marginTop:"20px", marginBottom:"20px"}}>
                  <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                      autoFocus 
                      // onClick={onHandleApply} 
                      // color="primary"
                  >
                    Save
                  </MuiButton>
                </div>
              :
                null
            }   
    
            <OptionContainer>
              <Option label="Down" 
                icon={<MuiIconButton 
                  // disabled={selectedColorPalette === "-1" || treeDataRedux[selectedColorPalette].pid === "0"}
                  //  onClick={onHandleEdit}
                  >
                    <FIleMoveDownIcon/>
                  </MuiIconButton>
                } 
              />
              <Option label="Up" 
                icon={ <MuiIconButton 
                  // disabled={selectedColorPalette === "-1"}
                  //  onClick={() => setCopied(true)}
                  > 
                    <FileMoveUpIcon/>
                  </MuiIconButton>
                }
              />
              <Option label="Delete" 
                icon={ <MuiIconButton 
                  // disabled={selectedColorPalette === "-1" || treeDataRedux[selectedColorPalette].pid === "0" || selectedColorPalette === appliedColorPalette}
                  // onClick={onHandleDeleteButton}
                  > 
                    <MuiDeleteForeverOutlinedIcon/>
                  </MuiIconButton>
                }
              />              
            </OptionContainer>
          </div>
        :
          <div>
             <div style={{marginBottom:"5px", marginTop:"5px"}}>
              <MuiTypography style={{marginBottom:"5px", fontSize:"14px"}}>
                Are you sure want to delete ?
              </MuiTypography>
              <div style={{alignContent:"center",}}>
                <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                  autoFocus 
                  // onClick={onHandleDelete} 
                  // color="primary"
                >
                  Confirm
                </MuiButton>
                <MuiButton style={{width:"20%", fontSize:"9px"}}
                  // onClick={() => setOpenDelete(false)} 
                  // color="primary"
                >
                  Cancel
                </MuiButton>
              </div>
            </div>
          </div>
      }  
    </div>
  ) 
}

  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={"Color palette - Edit" } group="Color Maps"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
