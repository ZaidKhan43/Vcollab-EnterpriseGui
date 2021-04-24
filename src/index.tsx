import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import store from './store';
import { Provider } from 'react-redux';



//import appTheme from './theme';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider} from '@material-ui/core/styles';

//Custom theme 

import darkMode from './theme/dark';
import lightMode from  './theme/light';


// Redux Selector

import {  selectDarkModeEnable } from './store/appSlice';
import { useAppSelector } from './store/storeHooks';


//Enabling darkmode and light mode

function CustomThemeProvider() {

  const isDarkModeEnable = useAppSelector(selectDarkModeEnable);

  const appliedTheme = createMuiTheme(isDarkModeEnable ? darkMode : lightMode);

  return (
       <ThemeProvider theme={appliedTheme}> 
        <App />
      </ThemeProvider>
  )
}


ReactDOM.render(
  <React.StrictMode>  
    <Provider store={store}>
      <CustomThemeProvider/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
