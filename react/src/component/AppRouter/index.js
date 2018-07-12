// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router, Route, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import type {RouterHistory} from 'react-router-dom';
import type {Dispatch, State} from 'src/_core/redux/types';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import action_NavigationPathChange
  from 'src/_redux/action/action_Nav/action_Nav_PathChange';
import action_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';

/**
 * Create the history for use in router
 * It is being initialized outside of the component so that a new history is not being created each render
 */
export const history: RouterHistory = createBrowserHistory();

type Props = {};

class AppRouter extends Component<Props> {
  constructor(props) {
    super(props);

    /**
     * Add a listener to the history so that we can
     * tell Redux when the user has changed pages
     *
     * !Potential bug here as there may exist circumstances where constructor is called twice
     * If this occurs there will be two action_PathChanges() disptached at the same time
     * This can be observed in console using Redux Logger.!
     *
     */
    const {action_NavigationPathChange} = props;
    history.listen((location) => {
      const {pathname} = location;
      action_NavigationPathChange(pathname);
    });
  }

  static defaultProps: Props;

  render() {
    return (
        <Router history={history}>
          <div>
            <ul>
              <li>
                <Link to="/">Menu</Link>
              </li>
              <li>
                <Link to="/suite">Suite</Link>
              </li>
              <li>
                <Link to="/select">Select</Link>
              </li>
              <li>
                <Link to="/editor">Editor</Link>
              </li>
            </ul>

            <hr/>

            <Route exact path="/"/>
            <Route path="/suite"/>
            <Route path="/select"/>
            <Route path="/editor"/>
          </div>
        </Router>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_NavigationPathChange,
    action_RedirectUser,
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    archiveStore: state.archiveStore,
    navigationStore: state.navigationStore,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
