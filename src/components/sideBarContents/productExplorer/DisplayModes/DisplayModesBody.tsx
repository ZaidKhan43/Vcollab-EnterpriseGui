import {useEffect} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

//icons import
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BoundingBoxIcon from "../../../common/svgIcons/boundingBox";
import HiddenLineIcon from "../../../common/svgIcons/hiddenLine";
import PointIcon from "../../../common/svgIcons/point";
import ShadedIcon from "../../../common/svgIcons/shaded";
import ShadedMeshIcon from "../../../common/svgIcons/shadedMesh";
import TransparentIcon from "../../../common/svgIcons/transparent";
import WireframeIcon from "../../../common/svgIcons/wireframe";
import DownloadStatusIcon from "./DownloadStatusIcon";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import {DownloadStates, expandPanel,fetchDisplayModes,setDisplayModeAsync, selectDisplayModesData,setSelectedMenu,setDownloadStatus} from "../../../../store/sideBar/DisplayModesSlice";
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import useStyles from './styles';
import {BytesToStructuredString} from "../../../utils/networkUtils"


const getIcon = (name:String) => {
  switch (name) {
    case "Bounding Box":
      return <BoundingBoxIcon/>
    case "Point":
      return <PointIcon/>
    case "Hidden Line":
      return <HiddenLineIcon/>
    case "Shaded":
      return <ShadedIcon/>
    case "Shaded Mesh":
      return <ShadedMeshIcon/>
    case "Transparent":
      return <TransparentIcon/>
    case "Wireframe":
      return <WireframeIcon/>
    default:
      break;
  }
}


function DisplayModesBody() {
    const dispatch = useAppDispatch();
    const panelsData = useAppSelector(selectDisplayModesData);

    const handlePanelClick = (panelIndex:number) => {
        const selectedPanel = panelsData[panelIndex];
        panelsData.forEach((panel:any,index:number) => {
          if (panel.id === selectedPanel.id) dispatch(expandPanel({panelId:panelIndex,value:!selectedPanel.expanded}));
          else dispatch(expandPanel({panelId:index,value:false}));
        });
      };
  
    const onSelectMenu = (menuIndex:number, panelIndex:number) => {
        const selectedPanel = panelsData[panelIndex];
        if(panelIndex === 0){
          selectedPanel.menuData.forEach((menu:any,index:number) => {
            if (index === menuIndex) {
              dispatch(setSelectedMenu({menuId:index,panelId:panelIndex,value:true}));
              if(menu.status === DownloadStates.DOWNLOADED)
              {
                handleDownload(menuIndex,panelIndex);
              }
            } else {
              dispatch(setSelectedMenu({menuId:index,panelId:panelIndex,value:false}));
            }
          });
        }
      // console.log(panelsData);
    };
    const handleDownload = (menuIndex:number, pannelIndex:number) => {
        
        dispatch(setDownloadStatus({panelId:pannelIndex,menuId:menuIndex,status:DownloadStates.IN_PROGRESS}));
        dispatch(setDisplayModeAsync({menuId:menuIndex}));
    }

    
    useEffect(() => {
      dispatch(fetchDisplayModes());
      
    },[dispatch])

    const renderSelectedMenu = (panel:any,panelIndex:number) => {
      return(panel?.menuData?.map((item:any, menuIndex:number) => (
        item.selected && item.status === DownloadStates.NOT_DOWNLOADED ? (
            <Button
              key = {menuIndex}
              variant="contained"
              color="primary"
              startIcon={<ArrowDownwardIcon />}
              onClick={() => handleDownload(menuIndex,panelIndex)}
            >
              {BytesToStructuredString(item.size)}
            </Button>
        ) : null
    )))
    }
    const classes = useStyles();
    return (
        <div >
        {panelsData.map((panel:any, panelIndex:number) => (
         
          <Accordion
            key={`${panel.id}index`}
            square
            className = {classes.accordian}
            expanded={panel.expanded}
            onChange={() => handlePanelClick(panelIndex)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>{panel.id}</Typography>
            </AccordionSummary>
            <AccordionDetails classes = {{root: classes.accordianDetails }}>
              <List className={classes.displayModeList}>
              {panel?.menuData?.map((item:any, menuIndex:number) => (
                <ListItem  key={menuIndex} dense button  role={undefined}
                selected = {item.selected}
                onClick={() => onSelectMenu(menuIndex, panelIndex)}>
                  <ListItemIcon>
                    {getIcon(item.title)}
                  </ListItemIcon>
                  <ListItemText id={item.title} primary={item.title}>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <DownloadStatusIcon status = {item.status} />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              </List>
              <Box flex>
                {
                  renderSelectedMenu(panel,panelIndex)
                }
              </Box>
            </AccordionDetails>
          </Accordion>

        ))}
      </div>
    )
}

export default DisplayModesBody
