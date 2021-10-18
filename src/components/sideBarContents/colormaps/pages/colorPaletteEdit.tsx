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

import {useState} from 'react';

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import MuiButton from '@material-ui/core/Button';

import Slider from "react-slick";

import styles from './style';

export default function ColorPalleteEdit(){

  const dispatch = useAppDispatch();
  const classes = styles();
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }
  
  const [colorSet,setColorSet] = useState( [
    {
       id : 0, 
       color:{r:160, g:160, b:252, a:1}
    }, 
    {
      id : 1, 
      color:{r:255, g:255, b:255, a:1}
    }
  ]
  )

  const [selectedColor, setSelectedColor] = useState<any>();
  const [openDelete, setOpenDelete] = useState(false);

  const handleAddColor = () => {
    const newColor = {
      id: colorSet.length ,
      color: {r:255, g:255, b:255, a:1} ,
    }

    const newColorSet = [...colorSet, newColor]

    setColorSet(newColorSet)
    setSelectedColor(newColor)
  }


  const handleColorSelector = (color : any) => {
    if(color !== selectedColor)
      setSelectedColor(color);
    else
      setSelectedColor(null);
    setOpenDelete(false);
  }

  const handleChangeComplete = (color : {r : number , g:number, b:number, a:number}) => {
    const index = colorSet.findIndex((item) => item.id === selectedColor.id);
    const newArray=[...colorSet];
    newArray[index].color= color;
    setColorSet(newArray);
  }

  const onHandlDownButton = () => {
    const indexOfSelected = colorSet.findIndex( item => item.id === selectedColor.id)
    const newArray = [...colorSet];
    newArray.splice(indexOfSelected, 1)
    newArray.splice(indexOfSelected + 1, 0,selectedColor)

    setColorSet(newArray)
  }

  const onHandleUpButton = () => {
    const indexOfSelected = colorSet.findIndex( item => item.id === selectedColor.id)
    const newArray = [...colorSet];
    newArray.splice(indexOfSelected, 1)
    newArray.splice(indexOfSelected - 1, 0,selectedColor)

    setColorSet(newArray)
  }

  const onHandleDeleteButton = () => {
    setOpenDelete(true);
  }

  const onHandleDelete = () => {
    const newArray = colorSet.filter(item => item.id !== selectedColor.id);
    setColorSet(newArray);
    setSelectedColor(null);
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
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
    }

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
                   onClick={handleAddColor}
                /></MuiIconButton>             
              </MuiGrid>
            </MuiGrid>
          </div>
          
          <MuiGrid container spacing={2} style={{marginLeft:"10px",marginTop:"10px"}}>
            <MuiGrid item xs={2}>
              {/* <Slider {...settings}
      > */}
              { colorSet.map((item : any, index : number) => 
              <div>
                <div 
                  key={ 'divParent_' + index } 
                  className={selectedColor ? item.id !== selectedColor.id ? classes.colorPicker : classes.active : classes.colorPicker} 
                  style={{height:"30px", 
                    marginTop:"10px",
                    width:"30px",
                    backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                  }}
                  onClick={() => handleColorSelector(item)}
                >
                </div>
                </div>
              )}

              {/* </Slider> */}
            </MuiGrid>
                          
            <MuiGrid item xs={4} style={{marginLeft:"5px"}}>
              <ColorPicker
                color={{r:255, g:255, b:255, a:1}}
                onChangeComplete={selectedColor && handleChangeComplete }
              />                 
            </MuiGrid>
          </MuiGrid>                     
        </div>

        <div style={{marginTop:"20px", marginLeft:"10px"}}>
          <MuiTypography variant="h2" align="left">
              Preview
          </MuiTypography>
          <div style={{marginTop:"10px"}}>
            <MuiTypography variant="h3" align="left">
              Discrete
            </MuiTypography>
            <MuiGrid container style={{marginTop:"5px"}}>
            {colorSet.map((item : any, index : number) => 
                                    <MuiGrid item 
                                        key={ 'divParent_' + index }  
                                        style={{width:280/colorSet.length, 
                                            height:"30px",
                                            backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                                        }}
                                    >
                                    </MuiGrid>
                                )}
                            </MuiGrid>
          </div>

          <div style={{marginTop:"10px"}}>
            <MuiTypography variant="h3" align="left">
              Continous
            </MuiTypography>

            <div style={{width:280, 
              marginTop:"5px",
              height:"30px",
              backgroundImage: `linear-gradient(to right, ${colorSet.map(item => `rgb(${item.color.r},${item.color.g},${item.color.b})`)})`}}>
            </div>
          </div>
        </div>
      </div>
    )
  }


  const getFooter = () => {

    let disableDown = true;
    let disableUp = true;

    if(selectedColor){
      const indexOfSelected = colorSet.findIndex( item => item.id === selectedColor.id);
      if(indexOfSelected !== colorSet.length -1)
        disableDown = false;
    }

    if(selectedColor) {
      const indexOfSelected = colorSet.findIndex( item => item.id === selectedColor.id);
      if(indexOfSelected !== 0)
        disableUp = false;
    }

    return(
      <div>
      { !openDelete
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
                  disabled={disableDown}
                   onClick={onHandlDownButton}
                  >
                    <FIleMoveDownIcon/>
                  </MuiIconButton>
                } 
              />
              <Option label="Up" 
                icon={ <MuiIconButton 
                  disabled={disableUp}
                   onClick={onHandleUpButton}
                  > 
                    <FileMoveUpIcon/>
                  </MuiIconButton>
                }
              />
              <Option label="Delete" 
                icon={ <MuiIconButton 
                 disabled={!selectedColor}
                  onClick={onHandleDeleteButton}
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
                  onClick={onHandleDelete} 
                  // color="primary"
                >
                  Confirm
                </MuiButton>
                <MuiButton style={{width:"20%", fontSize:"9px"}}
                  onClick={() => setOpenDelete(false)} 
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
