import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({

}));

function SelectAction(props:any) {
    let [age, setAge] = useState(10);
    let [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("mounting selectAction")
    },[])
    return (
        <FormControl style={{width:'100%', margin:'auto'}}>
            <InputLabel>Apply To</InputLabel>
            <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={age}
            open={open}
            onOpen={() => {setOpen(true)}}
            onClose={() => {setOpen(false)}}
            onChange={(e) => {setAge(e.target.value as number)}}
            MenuProps={{
                disablePortal: true,
                anchorOrigin: {
                vertical:"bottom",
                horizontal:"left",
            },
            getContentAnchorEl: null
            }}
            >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>

    )
}

export default SelectAction
