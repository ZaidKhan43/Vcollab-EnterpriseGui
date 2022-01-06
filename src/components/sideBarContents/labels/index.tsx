import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'

import EditNotes2D from './pages/editNotes2D';
import EditLabels3D from './pages/editLabels3D';
import EditMeasurements from './pages/editMeasurements'
import LabelList from './pages/labelList';

function Labels() {
    
    return (
        <Switch>
            <Route path={Routes.LABELS_LIST}>
                <LabelList/>
            </Route> 
            <Route path={Routes.LABEL_2D_EDITS}>
                <EditNotes2D/>
            </Route>
            
            <Route path={Routes.LABELS_3D_EDITS}>
                {/* <EditLabels3D/> */}
            </Route>
            
            <Route path={Routes.LABELS_MEASUREMENTS_EDITS}>
                {/* <EditMeasurements/> */}
            </Route>
        </Switch>
    )
}

export default Labels