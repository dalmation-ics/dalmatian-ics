// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppContainer} from 'react-hot-loader';
import AppReduxProvider from './component/App/AppReduxProvider';
import registerServiceWorker from './registerServiceWorker';

const root: ?Element = document.getElementById('root');

if (root != null) {
  ReactDOM.render(<AppContainer>
    <AppReduxProvider/>
  </AppContainer>, root);
  registerServiceWorker();
}
