import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './globalStyles'
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import store from './store';
import { Provider } from 'react-redux';

import CustomThemeProvider from './components/shared/customThemeProvider';

ReactDOM.render(
  <React.StrictMode>  
    <Provider store={store}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
