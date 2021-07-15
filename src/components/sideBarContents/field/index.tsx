import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'
import Variable from './pages/Variable'

function ClipPlanes() {
    
    return (
        <Switch>
            <Route path={Routes.FIELD_VARIABLES}>
                <Variable/>
            </Route>
        </Switch>
    )
}

export default ClipPlanes
