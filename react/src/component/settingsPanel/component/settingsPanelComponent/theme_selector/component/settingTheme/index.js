// @flow
import React, {Component} from 'react';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import {Button, FormGroup} from 'reactstrap';
import action_SelectTheme
  from 'src/_redux/action/action_UI/action_UI_SelectTheme';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';
import ThemeList from '../../res/themeList';
import type {Theme} from '../../types';

class SettingTheme extends Component<{
  action_SelectTheme: ActionBound
}> {

  makeThemeButton = (theme: Theme, index) => {
    return <Button color={'secondary'} className={'themeButton_' + theme.name}
                   key={'themeButton_' + index}
                   onClick={() => {
                     this.props.action_SelectTheme(theme);
                   }}>
      {theme.name}
    </Button>;
  };

  makeThemeButtonList = () => {
    return ThemeList.map(
        (w, i) => {
          return this.makeThemeButton(w, i);
        },
    );
  };

  render() {

    return (
        <div className={'panel panel-primary'}>
          <h3 className={'panel-heading'}>Theme selector</h3>
          <p>
            Select one of the below themes (updates automatically)
          </p>
          <FormGroup>
            {this.makeThemeButtonList()}
          </FormGroup>
        </div>
    );
  }

}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return thunkBindActionCreators({
    action_SelectTheme,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(SettingTheme);
