// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppContainer} from 'react-hot-loader';
import AppReduxProvider from './component/appReduxProvider';
import AppRouter from './component/appRouter';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const root: ?Element = document.getElementById('root');

if (root != null) {
  ReactDOM.render(
      <AppContainer>
        <AppReduxProvider>
          <AppRouter/>
        </AppReduxProvider>
      </AppContainer>, root);
  registerServiceWorker();
}
