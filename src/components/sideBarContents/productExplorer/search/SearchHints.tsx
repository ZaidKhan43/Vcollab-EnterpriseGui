import MuiTypography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Remove';
import React, { useRef } from 'react'
import {useAppDispatch} from '../../../../store/storeHooks'
import {removeSearchHint, setSearchString} from '../../../../store/sideBar/productTreeSlice'

//@ts-expect-error
import ResizePanel from 'react-resize-panel'
import useContainer from '../../../../customHooks/useContainer'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    root: {
        overflowY: "scroll",
        overflowX:"hidden",
        width:"100%",
        height:"100%",
        scrollbarColor: "rgba(0,0,0,.3) rgba(0,0,0,0.00) ",
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.3)',
          outline: '1px solid slategrey'
        },
    },
    customHandle: {
        height:2
    },
    dragIcon: {
        width:'20%',
        height:5,
        backgroundColor:theme.palette.grey[500],
        alignSelf: 'center'
    },
    footer: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0
    }
}))

function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
         <span className={clsx(classes.dragIcon,classes.customHandle)}></span>
         <Divider ></Divider>
        </div>
    )
}

function Body(props:SearchHintsProps) {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const handleClick = (s:string) => {
        props.setInput(s);
        dispatch(setSearchString(s));
    }
    const handleDelete = (s:string) => {
        dispatch(removeSearchHint({data:s}));
    }
    return(
        <List component='div' aria-label="search hints list" classes={{root:classes.root}}>
            {
                props.data.length === 0 ? (
                    <MuiTypography>No data</MuiTypography>
                ):
                props.data.map((item) => {
                    return(
                        <ListItem onClick={() => handleClick(item)} button classes={{root:classes.listItem}}>
                        <ListItemText >{item}</ListItemText>
                        <ListItemSecondaryAction>
                        <IconButton onClick={() => handleDelete(item)} size='small' edge="end" aria-label="delete">
                        <DeleteIcon ></DeleteIcon>
                        </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

type SearchHintsProps = {
    data: string[],
    setInput: (s:string) => void
}
function SearchHints(props:SearchHintsProps) {
    const containerRef = useRef(null);
    /* eslint-disable-next-line */
    const [containerWidth,containerHeight] = useContainer(containerRef,[]);
    const classes = useStyles();
    return (
        <div>
        <ResizePanel  direction='s' handleClass= {classes.customHandle} style={{height:100,maxHeight:window.innerHeight*0.3}}>
            <div ref={containerRef} style={{height:'100%',maxHeight:window.innerHeight*0.3}}>
                <div style={{marginBottom:-5,height: (containerHeight ? containerHeight : 0), overflow:'auto'}}>
                <Body data={props.data} setInput={props.setInput}></Body>
                </div>
            </div>
        </ResizePanel>
        <Footer/>
        </div>
    )
}

export default SearchHints
