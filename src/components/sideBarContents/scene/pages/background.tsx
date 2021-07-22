import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../icons/back';
import {goBack, push} from 'connected-react-router/immutable';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import  {useEffect, useState} from "react";

import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import MuiGrid from '@material-ui/core/Grid';
import MuiButton from '@material-ui/core/Button';
import MuiPlusIcon from '@material-ui/icons/Add';
import { SketchPicker } from 'react-color';
import MuiMinusIcon from '@material-ui/icons/Remove';
import Dropzone from 'react-dropzone';
import MuiTypography from '@material-ui/core/Typography';

import { updateBackgroundColor , updateBackgroundImage } from "../../../../store/sideBar/sceneSlice";

import styles from '../style';

export default function Background (){

    const classes = styles();

    const [backgroundMenu, setBackgroundMenu] = useState<number | null>(0);
    const colourList = useAppSelector((state) => state.scene.colorList); 
    const [colourSet, setColourSet] = useState( colourList.map(object => ({...object})));
    const fileRedux = useAppSelector((state) => state.scene.file );
    const [file, setFile] = useState<any>(fileRedux);
    // const [snackbarContent, setSnackbarContent] = useState<null | string>(null);
    // const [snackbarBoolean, setSnackbarBoolean] = useState(false)
        
    useEffect(() => {setColourSet(colourList.map(object => ({...object})))},[colourList]);
    useEffect(() => {setFile(fileRedux)},[fileRedux])

    const [selectedColor, setSelectedColor] = useState<any>();
    const dispatch = useAppDispatch();

    const handleChangeTab= (e : any, value : any) => {
        setBackgroundMenu(value)
    }

    const handleAddColor = () => {
        if(colourSet.length < 3){
            const idNew = colourSet.length + 1;
            const newArray : any = [...colourSet, {id: idNew , color:"#ffffff"}];
            setColourSet(newArray);
            setSelectedColor(newArray[newArray.length - 1])
        }
    }

    const handleColorSelector : (item : any) => any = (item) => {
        if( selectedColor === item)
            setSelectedColor(null)
        else
            setSelectedColor(item)
    }

    const handleChangeComplete = (color : any) => {
        const index = colourSet.findIndex((item) => item.id === selectedColor.id);
        const newArray=[...colourSet];
        newArray[index].color= color.hex;
        setColourSet(newArray);
    }

    const handleRemoveColor = () => {
        if ( colourSet.length > 1){
            const newArray = colourSet.filter((item) => item.id !== colourSet.length)
            setColourSet(newArray)
            setSelectedColor(newArray[newArray.length - 1])
        }
        
    }

    const handleSave = () => {    
       if (backgroundMenu === 0) {
            dispatch(updateBackgroundColor(colourSet));
            // setSnackbarContent("Background Colour Applied");
            // setSnackbarBoolean(true);
            setSelectedColor(null);
       }

       if (backgroundMenu === 1) {{
           dispatch(updateBackgroundImage(file));
       }}
    }

        const handleReset = () => { 
            const resetValue = colourList.map(object => ({...object}));
            setColourSet(resetValue)
            setSelectedColor(null);
            
        if(file !== fileRedux){
            setFile(fileRedux)
        }
    }

    const onDrop = (acceptedFiles : any , rejected : any) => {
        
        if (Object.keys(rejected).length !== 0) {
            return;
        }
        
        else{
            setFile(URL.createObjectURL(acceptedFiles[0]));
        }
    }
    

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return(
            null
        )
    }

    const getAction = () => {
        return(
            <div>
            <MuiTabs  
            value={backgroundMenu}
            aria-label="simple tabs example"
             onChange={handleChangeTab}
            TabIndicatorProps={{style:{backgroundColor:"currentColor"}}}
        >
            <MuiTab style={{textTransform:"none",}} label="Colour"/>
            <MuiTab style={{textTransform:"none"}} label="Image"/>
        </MuiTabs>
        </div>
        )
    }

    const getBody = () => {
        let backgroundChange = false;
        if ( colourSet.length !== colourList.length )
            backgroundChange = true;
        else {
            for (let i = 0; i < colourSet.length; i++) {
               if(colourList[i].color !== colourSet[i].color){
                    backgroundChange = true;
                    break;
                }
            }
        }
        
        if(fileRedux !== file)
            backgroundChange = true;

        return(
            <div className={classes.scrollBar}>
                {   backgroundMenu === 0 &&
                    <div style={{marginTop:"20px"}}>
                        <div className={classes.buttonContainer}>
                            <MuiPlusIcon onClick={handleAddColor} className={classes.buttonComponent }/>
                        </div>
                        <MuiGrid container spacing={3} style={{marginLeft:"10px",marginTop:"10px"}}>
                            <MuiGrid item xs={12} sm={1}>
                                {colourSet.map((item : any, index : number) => 
                                    <div 
                                        key={ 'divParent_' + index } 
                                        className={selectedColor ? item.id !== selectedColor.id ? classes.colorPicker : classes.active : classes.colorPicker} 
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
                                    color={selectedColor ? selectedColor.color : "#ffffff"}
                                    onChangeComplete={selectedColor && handleChangeComplete }
                                    presetColors={[]}
                                    disableAlpha ={true}
                                />
                            </MuiGrid>
                        </MuiGrid> 
                        <div className={classes.buttonContainer}>
                            <MuiMinusIcon  onClick={handleRemoveColor} className={classes.buttonComponent}/>
                        </div>                      
                    </div>
                }

                {   backgroundMenu === 1 &&
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
                                                            src={file} alt="profile" 
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
                        </div>
                } 
                
                <div className={classes.saveResetButtonContainer} >
                    <MuiGrid container spacing={3} >
                        <MuiGrid item xs={12} sm={6}>
                            <MuiButton disabled={ backgroundChange=== false} style={{backgroundColor:"#8C8BFF", zIndex:10}} variant="contained" color="primary" onClick={handleSave}>
                                Save
                            </MuiButton>            
                        </MuiGrid>
                        <MuiGrid item xs={12} sm={6} >
                            <MuiButton disabled={backgroundChange === false}  style={{color:"#8C8BFF", zIndex:10}} color="primary" onClick={handleReset}>Reset</MuiButton>                                                          
                        </MuiGrid>
                    </MuiGrid>
                </div>
            </div>
        )
    }

    const getFooter = () => {
        return(
            null
        )
    }

    return(
        <SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ <Title text="Backgound" group="Scene"/> }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
      />
       
    )
}