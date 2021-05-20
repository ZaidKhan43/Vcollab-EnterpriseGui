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

import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';

import MuiPlusIcon from '@material-ui/icons/Add';
import MuiMinusIcon from '@material-ui/icons/Remove';

import { SketchPicker } from 'react-color';

export default function Views(){

    const dispatch = useAppDispatch(); 
    const list = [{name:"Std View",}, {name: "Camera",}, {name:"Background"}]
    const [selectedView, setSelectedView] = useState<null | string>(null);
    const [openViewAlert, setOpenViewAlert] = useState(false)

    const [valueOne, setValueOne] = useState<number | null>(null);

    const [projection, setProjection] = useState<string>("perspective")

    const [valuePerspective, setValuePerspective] = useState([
                                                    {id:1, name:"Y-Field of View", value:100},
                                                    {id:2, name:"Aspect Ratio", value:1000},
                                                    {id:3, name:"Far Plane", value:100},
                                                    {id:4, name:"Near Plane", value:1000},
                                                ])
    const [valueOrthographic, setValueOrthographic] = useState([
                                                    {id:1, name:"Left", value:100},
                                                    {id:2, name:"Right", value:1000},
                                                    {id:3, name:"Top", value:100},
                                                    {id:4, name:"Bottom", value:100},
                                                    {id:5, name:"Far Plane", value:100},
                                                    {id:6, name:"Near Plane", value:1000},
                                                ])
    
    const [colour, setColour] = useState("#ffffff")                                            
                                                        
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

    const onHandleTextBox = (value : number,name : string, projection : string) => {
        let newArray;
        let index : number;
        switch (projection){
            case "perspective" :
                newArray=[...valuePerspective]
                index = newArray.findIndex((item) => item.name === name);
                if ( index >= 0) {
                    let changeItem : any = newArray[index];
                    changeItem.value = value;
                    setValuePerspective(newArray);
                }     
            break;
            
            case "orthographic" :
                newArray=[...valueOrthographic]
                index = newArray.findIndex((item) => item.name === name);
                if ( index >= 0) {
                    let changeItem : any = newArray[index];
                    changeItem.value = value;
                    setValueOrthographic(newArray);
                }
            break;        
        }      
       
    }
   
    const handleProjection = (e: any) => {
            setProjection(e.currentTarget.value);
    }

    const handleChangeTab= (e : any, value : any) => {
        setValueOne(value)
    }

    const handleChangeComplete = (color : any) => {
        setColour(color.hex);
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
        return (
            <div>
                <MuiAccordion>
                    <MuiAccordionSummary
                        expandIcon={<MuiExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <MuiTypography>{list[0].name}</MuiTypography>
                </MuiAccordionSummary>
                <MuiAccordionDetails>
                    <div className={classes.listClick}>
                        { stdView.map((item : any, index : number) =>
                            <div key={ 'divChild_' + index } className={item === selectedView ?classes.listItemClicked :classes.listItem} onClick={() => onHadleView(item)}>
                                <MuiTypography>
                                    {item}
                                </MuiTypography>
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
                    <MuiTypography>{list[2].name}</MuiTypography>
                </MuiAccordionSummary >
                <MuiAccordionDetails>
                    <div className={classes.appTap}>
                        <MuiTabs  
                            value={valueOne}
                            className={classes.tab}
                            aria-label="simple tabs example" onChange={handleChangeTab}
                            TabIndicatorProps={{style:{backgroundColor:"currentColor"}}}
                        >
                            <MuiTab style={{textTransform:"none"}} label="Colour"/>
                            <MuiTab style={{textTransform:"none"}} label="Image"/>
                        </MuiTabs>
                        {   valueOne === 0 &&
                            <div >
                                <MuiGrid container spacing={3} style={{marginLeft:"10px",marginTop:"10px"}}>
                                    <MuiGrid item xs={12} sm={2}>
                                        <div ><MuiPlusIcon className={classes.circularSliderButton}/></div>
                                        <div className={classes.circularSliderButton} style={{height:250, width:"40px",backgroundColor:colour }}></div>
                                        <div ><MuiMinusIcon className={classes.circularSliderButton}/></div>
                                    </MuiGrid>
                                    <MuiGrid item xs={12} sm={2}>
                                        <SketchPicker  
                                            color={colour}
                                            onChangeComplete={ handleChangeComplete }
                                        />
                                    </MuiGrid>
                                </MuiGrid> 
                            </div>
                        }
                        {   valueOne === 1 &&
                                <div>
                                    - Add Image Component -
                                </div>
                        }
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
                        {   (projection === "perspective" 
                                ?
                                    valuePerspective 
                                : 
                                    valueOrthographic)
                            .map((item) => 
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
                                        onChange={(value : any) => onHandleTextBox(value,item.name,projection)} 
                                    />
                                </MuiGrid>
                        )}
                    </MuiGrid>        
                </MuiAccordionDetails>
            </MuiAccordion>
        </div>
    )}

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