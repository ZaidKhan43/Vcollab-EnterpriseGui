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

import MuiButton from '@material-ui/core/Button';

import { SketchPicker } from 'react-color';

import Dropzone from 'react-dropzone'

export default function Views(){

    const dispatch = useAppDispatch(); 
    const list = [{name:"Std View",}, {name: "Camera",}, {name:"Background"}]
    const [selectedView, setSelectedView] = useState<null | string>(null);
    const [openViewAlert, setOpenViewAlert] = useState(false)

    const [valueOne, setValueOne] = useState<number | null>(0);

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
    
    const colourList = { id:1, color:"#ffffff"};                                      
    const [colourSet, setColourSet] = useState([
                                            colourList,
                                        ]);
                                        
    const [selectedColor, setSelectedColor] = useState(colourSet[0])

    const [file, setFile] = useState<any>();
                                                        
    const classes = styles();

    const stdView = [
        "Front",
        "Back",
        "Left",
        "Right",
        "Top",
        "Bottom",
        "Isometric",
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
        const index = colourSet.findIndex((item) => item.id === selectedColor.id);
        const newArray=[...colourSet];
        newArray[index].color= color.hex;
        setColourSet(newArray);
    }

    const handleAddColor = () => {
            if(colourSet.length < 3){
                const idNew = colourSet.length + 1;
                const newArray : any = [...colourSet, {id: idNew , color:"#ffffff"}];
                setColourSet(newArray);
                setSelectedColor(newArray[newArray.length - 1])
            }
           
    }

    const handleRemoveColor = () => {
        if ( colourSet.length > 1){
            const newArray = colourSet.filter((item) => item.id !== colourSet.length)
            setColourSet(newArray)
            setSelectedColor(newArray[newArray.length - 1])
        }
        
    }

    const handleColorSelector : (item : any) => any = (item) => {
        setSelectedColor(item)
    }

    const handleReset = () => {
        if(valueOne === 0){
            if (colourSet.length > 1){
                setColourSet([colourList]);
                setSelectedColor(colourList);
            }            
            if(colourSet[0] !== colourList){
                setColourSet([colourList]);
                setSelectedColor(colourList);
            }       
        }
        
        if(valueOne === 1)
            setFile(null);
    }

    const onDrop = (acceptedFiles : any , rejected : any) => {
        
        if (Object.keys(rejected).length !== 0) {
            setOpenViewAlert(true)
            setSelectedView("Please select an image file")
          }
        
        else{
            setFile(Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0])
              }));
        }
    }

    const handleSave = () => {
        
        if(valueOne === 1 && file === null){
            setOpenViewAlert(true);
            setSelectedView("No background image selected.");
        }

        if( valueOne === 0 || file !== null){
            setSelectedView("Background Applied");
            setOpenViewAlert(true);
        }
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
        console.log(file)
        return (
            <div className={classes.scene}>
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
                            <div key={ 'divParent_' + index } className={item === selectedView ?classes.listItemClicked :classes.listItem} onClick={() => onHadleView(item)}>
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
                                <div ><MuiPlusIcon onClick={handleAddColor} style={{marginLeft:"-240px", marginBottom:"-20px"}} className={classes.circularSliderButton }/></div>
                                <MuiGrid container spacing={3} style={{marginLeft:"10px",marginTop:"10px"}}>
                                    <MuiGrid item xs={12} sm={1}>
                                        {   colourSet.map((item : any, index : number) => 
                                                <div 
                                                    key={ 'divParent_' + index } 
                                                    className={item.id !== selectedColor.id ? classes.colorPicker : classes.active} 
                                                    style={{height:226/colourSet.length, 
                                                        width:"30px",
                                                        backgroundColor:item.color ,
                                                    }}
                                                    onClick={() => handleColorSelector(item)}
                                                >
                                                </div>
                                        )}
                                    </MuiGrid>

                                    <MuiGrid item xs={12} sm={2} style={{marginLeft:"5px"}}>
                                        <SketchPicker  
                                            color={selectedColor.color}
                                            onChangeComplete={ handleChangeComplete }
                                            presetColors={[]}
                                            disableAlpha ={true}
                                        />
                                    </MuiGrid>
                                </MuiGrid> 
                                <div ><MuiMinusIcon onClick={handleRemoveColor} style={{marginLeft:"-240px", marginTop:"5px"}} className={classes.circularSliderButton}/></div>
                                <div style={{marginBottom:"5px", marginTop:"5px",}} >
                                    <MuiGrid container spacing={3} >
                                        <MuiGrid item xs={12} sm={2} style={{marginLeft:"60px"}}>
                                            <MuiButton  style={{backgroundColor:"#8C8BFF", zIndex:10}} variant="contained" color="primary" onClick={handleSave}>
                                                Save
                                            </MuiButton>
                                        </MuiGrid>
                                        <MuiGrid item xs={12} sm={6} >
                                            <MuiButton  style={{color:"#8C8BFF", zIndex:10}} color="primary" onClick={handleReset}>Reset</MuiButton>
                                        </MuiGrid>
                                    </MuiGrid>
                                </div>  
                            </div>
                        }
                        {   valueOne === 1 &&
                                <div style={{marginTop:"40px", marginLeft:"25px"}}>
                                    <Dropzone onDrop={(acceptedFiles, rejected )=> onDrop(acceptedFiles,rejected)}
                                        multiple={false}
                                        accept="image/*"
                                     >
                                        {({getRootProps, getInputProps}) => (
                                            <section>
                                                <div {...getRootProps()}  style={{
                                                    width: "250px",
                                                    height: "150px",
                                                    borderRadius: "5%",
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                    border: " 1px dashed"
                                                }}>
                                                <input {...getInputProps()} />
                                                    {   file 
                                                        ?
                                                            <div>
                                                                <img 
                                                                    style={{
                                                                        width: "250px",
                                                                        height: "150px",
                                                                        borderRadius: "5%",
                                                                        objectFit: "cover",
                                                                        objectPosition: "center"
                                                                        }} 
                                                                    src={file.preview} alt="profile" 
                                                                />
                                                            </div>
                                                        :
                                                            <div>
                                                                <MuiTypography style={{marginTop:"85px"}}>Drop your image here or</MuiTypography>
                                                                <MuiTypography style={{marginTop:"3px", color:"#8C8BFF"}}>Browse</MuiTypography>
                                                            </div>
                                                        }
                                                   
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    <div style={{marginBottom:"5px", marginTop:"45px",}} >
                                    <MuiGrid container spacing={3} >
                                        <MuiGrid item xs={12} sm={2} style={{marginLeft:"60px"}}>
                                            <MuiButton  style={{backgroundColor:"#8C8BFF", zIndex:10}} variant="contained" color="primary" onClick={handleSave}>
                                                Save
                                            </MuiButton>
                                        </MuiGrid>
                                        <MuiGrid item xs={12} sm={6} >
                                            <MuiButton  style={{color:"#8C8BFF", zIndex:10}} color="primary" onClick={handleReset}>Reset</MuiButton>
                                        </MuiGrid>
                                    </MuiGrid>
                                </div>  
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
                    </form>      
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