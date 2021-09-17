import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'

import Notes2D from './pages/notes2D' 
import Labels3D from './pages/labels3D'
import Measurements from './pages/measurements'

function ClipPlanes() {
    
    return (
        <Switch>
            <Route path={Routes.LABELS_2D_NOTES}>
                <Notes2D/>
            </Route>
            <Route path={Routes.LABELS_3D_LABELS}>
                <Labels3D/>
            </Route>
            <Route path={Routes.LABELS_MEASUREMENTS}>
                <Measurements/>
            </Route>
        </Switch>
    )
}

export default ClipPlanes