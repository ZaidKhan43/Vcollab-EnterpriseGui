import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'

import Notes2D from './pages/notes2D' 
import Labels3D from './pages/labels3D'
import Measurements from './pages/measurements'
import EditNotes2D from './pages/editNotes2D';
import EditLabels3D from './pages/editLabels3D';
import EditMeasurements from './pages/editMeasurements'

function ClipPlanes() {
    
    return (
        <Switch>
            <Route path={Routes.LABELS_2D_NOTES}>
                <Notes2D/>
            </Route>
            <Route path={Routes.LABEL_2D_EDITS}>
                <EditNotes2D/>
            </Route>
            <Route path={Routes.LABELS_3D_LABELS}>
                <Labels3D/>
            </Route>
            <Route path={Routes.LABELS_3D_EDITS}>
                <EditLabels3D/>
            </Route>
            <Route path={Routes.LABELS_MEASUREMENTS}>
                <Measurements/>
            </Route>
            <Route path={Routes.LABELS_MEASUREMENTS_EDITS}>
                <EditMeasurements/>
            </Route>
        </Switch>
    )
}

export default ClipPlanes