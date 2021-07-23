import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../icons/back';
import {goBack, push} from 'connected-react-router/immutable';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';

import {selectApplyTo,Selection,setApplyTo } from '../../../../store/sideBar/displayModesSlice';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';
import ColorPicker from '../../../shared/colorPicker';

import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';

import TranslateSlider from '../translateSlider/trasnslateSlider';

import {useState} from "react"

export default function MaterialColor() {

    type colorList = {
        id: number,
        name: string,
        color:{
            r:number,
            g:number,
            b:number,
            a?:number,
        },
    }

    const applyTo = useAppSelector(selectApplyTo);

    const dispatch = useAppDispatch();

    const [shininess, setShininess] = useState(10);
    const [opacity, setOpacity] = useState(20);

    const [colorList, setColorList] = useState<colorList[]>(
        [
            {
                id:0,
                name:"Ambient", 
                color:{r:255,g:255,b:255, a:1}
            },

            {
                id:1,
                name:"Diffuse", 
                color:{r:255,g:255,b:255, a:1}
            },
            {
                id:2,
                name:"Emissive", 
                color:{r:255,g:255,b:255, a:1}
            },

            {
                id:3,
                name:"Specular", 
                color:{r:255,g:255,b:255, a:1}
            }
        ])

    const [selectedColor, setSelectedColor] = useState<any>();

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const handleChangeComplete = (color : {r : number , g:number, b:number, a?:number}) => {
        const index = colorList.findIndex((item) => item.id === selectedColor.id);
        const newArray=[...colorList];
        newArray[index].color= color;
        setColorList(newArray);
    }

    const handleColorSelector : (item : any) => any = (item) => {
        if( selectedColor === item)
            setSelectedColor(null)
        else
            setSelectedColor(item)
    }
    
    const onHandleShininess = (newValue : number) => {
        setShininess(newValue)
    }

    const onHandleOpacity = (newValue : number) => {
        setOpacity(newValue)
    }

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return(null)
    }

    const getAction = () => {
        return(
            <SelectAction
            labelId="display-modes-selection-label-id"
            id="display-modes-selection-id"
            value={applyTo}
            onChange={handleSelectChange}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: {
                vertical:"bottom",
                horizontal:"left",
             },
             getContentAnchorEl: null
            }}
            >
              <MuiMenuItem value={Selection.SELECTED_PARTS}>Selected Parts</MuiMenuItem>
              <MuiMenuItem value={Selection.ALL_PARTS}>All Parts</MuiMenuItem>
              <MuiMenuItem value={Selection.UNSELECTED_PARTS}>Unselected Parts</MuiMenuItem>
            </SelectAction>
        )
    }

    const handleSelectChange = (e:React.ChangeEvent<{ value: Selection }>) => {
        dispatch(setApplyTo(e.target.value));
      }

    const getBody = () => {
        return(
            <div style={{marginLeft:"10px"}}>

                <div style = {{marginTop:"20px" , marginBottom:"30px"}}>
                    <MuiGrid container spacing={1}>
                        {
                            colorList.map(item => 
                                <MuiGrid item xs={12} sm={3}>
                        <MuiTypography variant="caption"> 
                                {item.name}
                            </MuiTypography>
                            <div style={{backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` , width:"60px" , height:"19px", borderRadius:"4px"}}
                            onClick={() => handleColorSelector(item)}></div>
                        </MuiGrid>
                            )
                        }
                        
                        
                    </MuiGrid>
                </div>

                <div style={{marginLeft:"10%"}}>
                    <ColorPicker color={selectedColor ? selectedColor.color : {r:255, g:255, b:255, a:1}} onChangeComplete={handleChangeComplete}/>
                </div>

                <div style={{marginTop:"40px", marginBottom:"20px"}}>
                    <MuiTypography style={{textAlign:"left"}}>Shininess</MuiTypography>
                    <TranslateSlider 
                    value={shininess} 
                    stepValue={1}
                    valueMax={20}
                    valueMin={0}
                    onHandleChange={onHandleShininess}
                    onHandleTextbox={onHandleShininess} 
                    onHandleCommited={onHandleShininess}
                    />
                </div>
                
                <div>
                    <MuiTypography style={{textAlign:"left"}}>Transperancy</MuiTypography>
                    <TranslateSlider 
                    value={opacity} 
                    stepValue={1}
                    valueMax={100}
                    valueMin={0}
                    onHandleChange={onHandleOpacity}
                    onHandleTextbox={onHandleOpacity} 
                    onHandleCommited={onHandleOpacity}
                    />
                </div>


            </div>
        )
    }

    const getFooter = () => {
        return(null)
    }


    return(
        <SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ <Title text="Geometry" group="Material Color"/> }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
      />
    )
}