import {Switch,Route} from 'react-router'
import {Routes} from'../../../routes'
import AxisTriad from'./pages/AxisTriad'

export default function Scene() {

  return (

    <Switch>

          <Route path={Routes.SCENE_AXIS_TRAID}>
            <AxisTriad/>
          </Route>

    </Switch>

  )
}