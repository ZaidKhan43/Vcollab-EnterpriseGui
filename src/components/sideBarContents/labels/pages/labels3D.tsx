import MuiIconButton from '@material-ui/core/IconButton';
import {goBack} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import styles from './style'

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch} from '../../../../store/storeHooks';

import {useState} from 'react';

import MuiCollapse from '@material-ui/core/Collapse';
import MuiTypography from '@material-ui/core/Typography';

export default function Labels3D(){

  const classes = styles();
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }
  
  enum LabelType{
    POINT = 0,
    FACE =  1,
  };

  const [heading, setHeading] = useState(
    [
      {
        id:0,
        name:"Point",
        collapsed: true,
      },
      {
        id:1,
        name:"Face",
        collapsed: false,
      },
  ]
  )

  const [label3D, setLabel3d] = useState(
    [
      {
        id:0,
        name: "Point Label 1",
        type: LabelType.POINT,
        selected : true,
        show : true,
      },
      { id:2,
        name: "Point Label 2",
        type: LabelType.POINT,
        selected : false,
        show : true,
      },
      {
        id:3,
        name: "Point Label 3",
        type: LabelType.POINT,
        selected : false,
        show : false,
      },
      {
        id:4,
        name: "Face Label 1",
        type: LabelType.FACE,
        selected : false,
        show : false,
      },
      {
        id:5,
        name: "Face Label 2",
        type: LabelType.FACE,
        selected : false,
        show : false,
      },
      {
        id:6,
        name: "Face Label 3",
        type: LabelType.FACE,
        selected : false,
        show : false,
      }

    ]
  )

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

    // console.log("selected",clickedValues)
    return (
      <div className={classes.scrollBar}>
        <div style={{marginLeft:"20px"}}>
                {heading.map((item: any) => 
               <span> {   !item.collapsed
                  && 
                     <MuiTypography>
                        {item.name}
                       </MuiTypography>
              }
                        <MuiCollapse in={item.collapsed} >
                            <div>
                            {item.name}
                            </div>
                        </MuiCollapse>
                        </span>
                )}
        </div>
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
            headerContent={ <Title text={"3D Labels" } group="Labels"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
