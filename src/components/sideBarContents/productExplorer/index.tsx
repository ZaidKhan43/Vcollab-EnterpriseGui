import React from 'react'
import {Switch,Route} from 'react-router'
import { Routes } from '../../../routes'
import AssemblyTree from './pages/AssemblyTree' 
import Search from './pages/Search'
import DisplayModes from './pages/DisplayModes'
function ProductExplorer() {
    
    return (
        <Switch>
            <Route path={Routes.GEOMETRY_ASSEMBLY_TREE}>
                <AssemblyTree/>
            </Route>
            <Route path={Routes.GEOMETRY_SEARCH}>
                <Search/>
            </Route>
            <Route path={Routes.GEOMETRY_DISPLAY_MODES}>
                <DisplayModes/>
            </Route>
        </Switch>
    )
}

export default ProductExplorer
