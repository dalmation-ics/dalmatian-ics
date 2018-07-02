import React, {Component} from 'react';
import {applyMiddleware} from 'redux/index';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import App from './App';

//redux middleware
const middleware = applyMiddleware(
    thunk,
    createLogger({
      collapsed: true, // Collapse the log in the console by default
      diff: true, // Log the differences between the previous and the new state
      predicate: (getState, action) => action.type.substr(0, 12) !==
          '@@redux-form', // Don't log actions dispatched by redux-form (too many).
    }),
);

const store = createStore(allReducers, {}, middleware);

class AppReduxProvider extends Component {

  render() {
    return (
        <Provider store={store}>
          <App/>
        </Provider>
    );
  }
}

export default AppReduxProvider;
