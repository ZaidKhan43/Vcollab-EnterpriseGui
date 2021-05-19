import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';


import BackButton from '../../../components/icons/back';
import { sideBarContentTypes } from '../../../config';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import { setSidebarActiveContent } from '../../../store/appSlice';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {useAppDispatch } from '../../../store/storeHooks';
import React, { useState} from "react";

import NumericInput from 'react-numeric-input';

import styles from './style';

import MuiGrid from '@material-ui/core/Grid';

import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import MuiToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function Views(){

    const dispatch = useAppDispatch(); 
    const list = [{name:"Std View",}, {name: "Camera",}, {name:"Background"}]
    const [selectedView, setSelectedView] = useState<null | string>(null);
    const [openViewAlert, setOpenViewAlert] = useState(false)

    const [projection, setProjection] = useState<null | string>(null)

    const [cameraValue, setCameraValue] = useState([
                                                    {id:1, name:"Y-Field of View", value:100},
                                                    {id:2, name:"Aspect Ratio", value:1000},
                                                    {id:3, name:"Far Plane", value:100},
                                                    {id:4, name:"Near Plane", value:1000},
                                                ])

    const classes = styles();

    const stdView = [
        "Front",
        "Back",
        "Left",
        "Right",
        "Top",
        "Bottom",
        "Isomaniac",
    ]

    const onHadleView = (item : string) => {
        setSelectedView(item);
        setOpenViewAlert(true);
    };

    const onHandleTextBox = (value : number,name : string) => {
       const newArray=[...cameraValue]
        const index : any = newArray.findIndex((item) => item.name === name);
        if ( index >= 0) {
            let changeItem : any = newArray[index];
            changeItem.value = value;
            setCameraValue(newArray);
        }      
    }
   
    const handleProjection = (event: React.MouseEvent<HTMLElement>, newProjection: string) => {
            setProjection(newProjection);
    }

    const onClickBackIcon = () =>{
        dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
      }

    const getHeaderLeftIcon= () => {
        return (
            <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
        );
    }

    const getHeaderContent = () => {
        return <MuiTypography variant='h1' noWrap>Scene</MuiTypography>;
    }

    const getHeaderRightIcon = () => {
        return (
            null
            )
    }

    const getBody = () => {

        console.log(cameraValue)

        return (
        <div>
            <MuiAccordion>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <MuiTypography>{list[0].name}</MuiTypography>
        </MuiAccordionSummary >
        <MuiAccordionDetails>
            <div className={classes.listClick}>
            { stdView.map((item : any, index : number) =>
                <div key={ 'divChild_' + index } className={item == selectedView ?classes.listItemClicked :classes.listItem} onClick={() => onHadleView(item)}>
                     <MuiTypography>
                        {item}
                     </MuiTypography>
                    <br/>
                </div>
            )}
            </div>
            
        </MuiAccordionDetails>
      </MuiAccordion>

      <MuiAccordion>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <MuiTypography>{list[1].name}</MuiTypography>
        </MuiAccordionSummary >
        <MuiAccordionDetails>
            <form>
            <MuiTypography className={classes.listHead} noWrap>
                Projection
            </MuiTypography>
            <MuiToggleButtonGroup
                style={{marginBottom:"20px",}}
                size="small" 
                value={projection}
                exclusive
                onChange={handleProjection}
                aria-label="text alignment"
            >
            <MuiToggleButton value="perspective" aria-label="left aligned">
                <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Perspective</MuiTypography>
            </MuiToggleButton>
            <MuiToggleButton value="orthographic" aria-label="left aligned">
                <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Orthographic</MuiTypography>
            </MuiToggleButton>
            </MuiToggleButtonGroup>
            
            <MuiTypography className={classes.listHead} noWrap>
                View Frustum
            </MuiTypography>

            <MuiGrid container spacing={3}>
                {cameraValue.map((item) => 
                    <MuiGrid item xs={12} sm={6}>
                        <MuiTypography className={classes.listSubHead}> 
                            {item.name}
                        </MuiTypography>
                        <NumericInput
                            className={classes.inputEquation}
                            value={item.value}
                            button={"no"}
                            margin="dense"
                            noStyle
                            onChange={(value : any) => onHandleTextBox(value,item.name)} 
                        />
                    </MuiGrid>
                )}
            </MuiGrid>        
        </form>
    </MuiAccordionDetails>
</MuiAccordion>
</div>
)
}

    const getFooter = () => {
        return null
    }
    
    return ( 
        <div>
        <SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ getHeaderContent() }
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
      />
       <MuiSnackbar
        // className={props.snackBar}
            anchorOrigin={{vertical:"top", horizontal:'center'}}
            autoHideDuration={1000}
            open={openViewAlert}
            onClose={() => setOpenViewAlert(false)}
            >
              <MuiAlert icon={false}>
              <div style={{display: "flex",
                alignItems: "center",
                justifyContent: "space-between",}}
              >
                <MuiTypography color="inherit">{selectedView}</MuiTypography>
              </div>
              </MuiAlert>
            </MuiSnackbar> 
    </div>
    )
}