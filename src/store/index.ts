import { configureStore,combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import appSlice from './appSlice';
import toastSlice from "./toastSlice";
import productTreeSlice from './sideBar/productTreeSlice';
import displayModesSlice from './sideBar/displayModesSlice';
import clipSlice from './sideBar/clipSlice';
import colormapSlice from './colormapSlice';
import probeSlice from './probeSlice';
import mainMenuSlice  from './mainMenuSlice';
import sceneSlice from './sideBar/sceneSlice';
import materialColorSlice from './sideBar/materialColorSlice';
import messageSlice from './sideBar/messageSlice';

export const history = createBrowserHistory();
const store = configureStore({
    reducer: combineReducers({
        router: connectRouter(history),
        app: appSlice,
        mainMenu: mainMenuSlice,
        clipPlane: clipSlice,
        productTree: productTreeSlice,
        probe: probeSlice,
        displayModes: displayModesSlice,
        toast: toastSlice,
        colormaps: colormapSlice,
        scene: sceneSlice,
        materialColor: materialColorSlice,
        message: messageSlice,
      }),
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['router']
      }
    }).concat(routerMiddleware(history))
});


export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


