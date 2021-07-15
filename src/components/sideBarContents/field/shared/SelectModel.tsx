import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';

enum Selection {
    NONE,
    ALL,
    SELECTED
}

function SelectModel() {

    const handleSelectChange = (e:React.ChangeEvent<{ value: Selection }>) => {
        setApplyTo(e.target.value);
    }

    const [applyTo, setApplyTo] = useState<Selection>(Selection.NONE)
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
            <MenuItem value={Selection.SELECTED}>Selected Parts</MenuItem>
            <MenuItem value={Selection.ALL}>All Parts</MenuItem>
            <MenuItem value={Selection.NONE}>Unselected Parts</MenuItem>
          </SelectAction>
        )
}

export default SelectModel
