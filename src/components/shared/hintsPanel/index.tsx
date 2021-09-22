import MuiTypography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Clear';
import React, { useRef } from 'react'

//@ts-ignore
import ResizePanel from 'react-resize-panel'
import AutoSizer from '../autoSize'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    root: {
         overflowY: "hidden",
         overflowX:"hidden",
        // width: "100%",
        // height:"100%",
        // scrollbarColor: "rgba(0,0,0,.3) rgba(0,0,0,0.00) ",
        // scrollbarWidth: 'thin',
        // '&::-webkit-scrollbar': {
        //   width: '0.4em'
        // },
        // '&::-webkit-scrollbar-track': {
        //   boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        //   webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        // },
        // '&::-webkit-scrollbar-thumb': {
        //   backgroundColor: 'rgba(0,0,0,.3)',
        //   outline: '1px solid slategrey'
        // },
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
    const classes = useStyles();
    return(
        <List style={props.style} component='div' aria-label="search hints list" >
            {
                props.data.map((item) => {
                    return(
                        <ListItem onClick={() => props.onClick(item)} button classes={{root:classes.listItem}}>
                        <ListItemText >{item}</ListItemText>
                        {
                            props.showDelete ?
                            <ListItemSecondaryAction>
                            <IconButton onClick={() => props.onDelete(item)} size='small' edge="end" aria-label="delete">
                            <DeleteIcon ></DeleteIcon>
                            </IconButton>
                            </ListItemSecondaryAction>
                            :null
                        }
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

type SearchHintsProps = {
    style?:any,
    data: string[],
    showDelete?: boolean,
    onClick: (s:string) => void
    onDelete: (s:string) => void
}
function SearchHints(props:SearchHintsProps) {
    const classes = useStyles();
    return (
        <div>
        <ResizePanel direction='s' handleClass= {classes.customHandle} style={{height:100,maxHeight:window.innerHeight*0.3}}>
            <Body style={{height:"100%", overflow:'hidden'}} data={props.data} onClick={props.onClick} onDelete={props.onDelete}></Body> 
        </ResizePanel>
        <Footer/>
        </div>
    )
}

export default SearchHints
