// @flow
import React, {Component} from 'react';
import thunkBindActionCreators from 'src/_core/redux/thunkBindActionCreators';
import {connect} from 'react-redux';
import {Button, FormGroup} from 'reactstrap';
import action_SelectTheme
  from 'src/_redux/action/action_UI/action_UI_SelectTheme';
import type {ActionBound, Dispatch} from 'src/_core/redux/types';

class SettingTheme extends Component<{
  action_SelectTheme: ActionBound
}> {

  makeThemeButton = (themeName) => {
    return <Button className={'themeButton_' + themeName}
                   onClick={() => {
                     this.props.action_SelectTheme(themeName);
                   }}>
      {themeName}
    </Button>;
  };

  render() {

    return (
        <div className={'panel panel-primary'}>
          <h3 className={'panel-heading'}>Theme selector</h3>
          <p>
            Select one of the below themes (updates automatically)
          </p>
          <FormGroup>
            {this.makeThemeButton('standard')}
            {this.makeThemeButton('dark')}
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

export default connect(mapDispatchToProps)(SettingTheme);
