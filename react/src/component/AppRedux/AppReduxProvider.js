// @flow
import * as React from 'react';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import App from './App';
import allReducers from 'src/_redux/reducer';

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

type Props = {
  children?: React.Node,
};

class AppReduxProvider extends React.Component<Props> {
  render() {
    return (
        <Provider store={store}>
          <App/>
        </Provider>
    );
  }
}

export default AppReduxProvider;
