// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Router, Route, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import type {RouterHistory} from 'react-router-dom';

import LegalPanel from '../legal_panel';
import type {Dispatch} from 'src/_core/redux/types';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import action_NavigationPathChange
  from 'src/_redux/action/action_Nav/action_Nav_PathChange';
import action_RedirectUser
  from 'src/_redux/action/action_Nav/action_Nav_RedirectUser';
import PageMenuMain from './component/pageMenuMain';
import PageSuite from './component/pageSuite';
import PageEditor from './component/pageEditor';
import PageAddForm from './component/pageAddForm';

/**
 * Create the history for use in router
 * It is being initialized outside of the component so that a new history is not being created each render
 */
export const history: RouterHistory = createBrowserHistory();

type Props = {
  redirectTarget: null | string,
  suiteSelectedUUID: null | string,
};

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

  render() {
    const {
      suiteSelectedUUID,
      redirectTarget,
    } = this.props;
    return (
        <Router history={history}>
          <div>
            {redirectTarget && <Redirect to={redirectTarget}/>}
            <LegalPanel/>
            <ul>
              <li>
                <Link to="/">Menu</Link>
              </li>
              <li>
                <Link to="/suite">Suite</Link>
              </li>
              <li>
                <Link to="/addForm">Add Form</Link>
              </li>
              <li>
                <Link to="/editor">Editor</Link>
              </li>
            </ul>

            <hr/>

            <Route exact path="/" component={PageMenuMain}/>
            <Route path="/suite" component={PageSuite}/>
            <Route path="/addForm" component={PageAddForm}/>
            <Route path='/editor' render={() => {

              if (!suiteSelectedUUID)
                return <Redirect to={'/'}/>;
              else
                return <PageEditor/>;

            }}/>
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
    suiteSelectedUUID: state.archiveStore.suiteSelectedUUID,
    redirectTarget: state.navStore.redirectTarget,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
